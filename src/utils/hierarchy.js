const ENGINEERING = "engineering";
const NON_ENGINEERING = "non_engineering";

export const SCHOOL_HIERARCHY = {
  SoCSEA: {
    name: "School of Computer Science, Engineering & Applications",
    deanTrack: ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["socsea", "computer science", "school of computer science", "school of computer science engineering applications"],
  },
  SoBB: {
    name: "School of Bio-Engineering & Bio Science",
    deanTrack: ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["sobb", "bio-engineering", "bio engineering", "bio science"],
  },
  SoCE: {
    name: "School of Continual Education",
    deanTrack: ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["soce", "continual education"],
  },
  SoEMR: {
    name: "School of Engineering Management & Research",
    deanTrack: ENGINEERING,
    directorLayer: true,
    hodDepartments: [
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Semiconductor Engineering",
    ],
    aliases: ["soemr", "engineering management", "engineering management research"],
  },
  SoC: {
    name: "School of Commerce & Management",
    deanTrack: NON_ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["soc", "commerce", "commerce management", "management"],
  },
  SoMCS: {
    name: "School of Media & Communication Studies",
    deanTrack: NON_ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["somcs", "media", "communication studies"],
  },
  CioD: {
    name: "School of Design",
    deanTrack: NON_ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["ciod", "design", "school of design"],
  },
  SoAA: {
    name: "School of Applied Arts",
    deanTrack: NON_ENGINEERING,
    directorLayer: true,
    hodDepartments: [],
    aliases: ["soaa", "applied arts"],
  },
};

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const normalizeRoleForWorkflow = (role) => {
  const value = normalizeText(role);
  if (value === "vice chancellor" || value === "vice chancelor" || value === "vc") return "vc";
  if (value.includes("dean")) return "dean";
  if (value.includes("director")) return "director";
  if (value === "hod" || value.includes("head of department")) return "hod";
  return "faculty";
};

export const getSchoolKey = (school) => {
  const normalized = normalizeText(school);
  if (!normalized) return "";

  const found = Object.entries(SCHOOL_HIERARCHY).find(([key, config]) => {
    const names = [key, config.name, ...(config.aliases || [])].map(normalizeText);
    return names.some((name) => normalized === name || normalized.includes(name) || name.includes(normalized));
  });

  return found?.[0] || "";
};

export const getSchoolHierarchy = (school) => SCHOOL_HIERARCHY[getSchoolKey(school)] || null;

export const getDeanTrack = (profile = {}) => {
  const schoolConfig = getSchoolHierarchy(profile.school);
  if (schoolConfig?.deanTrack) return schoolConfig.deanTrack;

  const combined = normalizeText(`${profile.school || ""} ${profile.department || ""} ${profile.designation || ""}`);
  if (combined.includes("non engineering") || combined.includes("commerce") || combined.includes("media") || combined.includes("design") || combined.includes("applied arts")) {
    return NON_ENGINEERING;
  }

  return ENGINEERING;
};

export const departmentHasHod = (school, department) => {
  const config = getSchoolHierarchy(school);
  if (!config?.hodDepartments?.length) return false;

  const normalizedDepartment = normalizeText(department);
  return config.hodDepartments.some((hodDepartment) => {
    const normalizedHodDepartment = normalizeText(hodDepartment);
    return normalizedDepartment === normalizedHodDepartment ||
      normalizedDepartment.includes(normalizedHodDepartment) ||
      normalizedHodDepartment.includes(normalizedDepartment);
  });
};

export const getReviewChain = (profile = {}) => {
  const role = normalizeRoleForWorkflow(profile.appraisal_role || profile.role);

  if (role === "vc") return [];
  if (role === "dean") return ["vc"];
  if (role === "director") return ["dean", "vc"];
  if (role === "hod") return ["director", "dean", "vc"];

  return departmentHasHod(profile.school, profile.department)
    ? ["hod", "director", "dean", "vc"]
    : ["director", "dean", "vc"];
};

export const roleLabel = (role) => ({
  hod: "HOD",
  director: "Director",
  dean: "Dean",
  vc: "VC",
  faculty: "Faculty",
}[role] || role);

export const pendingStatusFor = (role) => `Pending ${roleLabel(role)} Review`;
export const reviewedStatusFor = (role) => `${roleLabel(role)} Reviewed`;

export const canAuthorityReviewProfile = (reviewerProfile = {}, subjectProfile = {}) => {
  const reviewerRole = normalizeRoleForWorkflow(reviewerProfile.appraisal_role || reviewerProfile.role);
  const subjectRole = normalizeRoleForWorkflow(subjectProfile.appraisal_role || subjectProfile.role);

  if (reviewerRole === "vc") return subjectRole !== "vc";

  if (reviewerRole === "dean") {
    return subjectRole !== "dean" && getDeanTrack(reviewerProfile) === getDeanTrack(subjectProfile);
  }

  if (reviewerRole === "director") {
    return getSchoolKey(reviewerProfile.school) === getSchoolKey(subjectProfile.school) &&
      (subjectRole === "faculty" || subjectRole === "hod");
  }

  if (reviewerRole === "hod") {
    return subjectRole === "faculty" &&
      departmentHasHod(subjectProfile.school, subjectProfile.department) &&
      getSchoolKey(reviewerProfile.school) === getSchoolKey(subjectProfile.school) &&
      normalizeText(reviewerProfile.department) === normalizeText(subjectProfile.department);
  }

  return false;
};

export const profileFromLocalStorage = () => ({
  email: localStorage.getItem("username") || "",
  full_name: localStorage.getItem("name") || "",
  appraisal_role: localStorage.getItem("role") || "",
  school: localStorage.getItem("school") || "",
  department: localStorage.getItem("department") || "",
  designation: localStorage.getItem("designation") || "",
  employee_id: localStorage.getItem("employeeId") || "",
});
