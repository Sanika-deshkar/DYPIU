import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DIRECTOR_USER = {
  name: "Prof. Suresh Patil", employeeId: "DYPIU-DIR-0005",
  designation: "Director / Dean",
  department: "School of Engineering & Management Research",
  school: "SoEMR", ay: "2025-2026", avatar: "SP",
};

// HODs under this Director
const HOD_LIST = [
  {
    id: 101, name: "Dr. Priya Sharma", employeeId: "DYPIU-HOD-0042",
    designation: "Associate Professor & HOD", department: "Computer Science & Engineering",
    submittedOn: "2025-04-25", status: "Pending Review",
    avatar: "PS", avatarColor: "#6366f1",
    hodScore: 312, // HOD's own appraisal total (filled by HOD as faculty)
    info: { name: "Dr. Priya Sharma", qual: "Ph.D (Computer Science)", desig: "Associate Professor & HOD", ay: "2025-2026" },
    lectures: [
      { sem: "Sem I", code: "CS501 / AI & ML", planned: "48", conducted: "47", score: "20", hod: "20", director: "" },
    ],
    courseFile: { course: "CS501", title: "AI & ML", details: "Yes", score: "18", hod: "18", director: "" },
    innovScore: "9", innovHod: "9", innovDir: "",
    projects: [
      { label: "Project guided (3/batch)", score: "5", hod: "5", director: "" },
      { label: "Industrial collaboration", score: "4", hod: "4", director: "" },
      { label: "Award received", score: "3", hod: "3", director: "" },
      { label: "Project outcome", score: "4", hod: "4", director: "" },
    ],
    quals: [
      { label: "Higher Qualification achieved", score: "5", hod: "5", director: "" },
      { label: "Add-on Certification", score: "4", hod: "4", director: "" },
    ],
    feedback: [{ code: "CS501", fb1: "4.5", fb2: "4.7", score: "9.2", hod: "9.2", director: "" }],
    deptActs: [
      { activity: "Department Seminar Series", nature: "Coordinator", score: "18", hod: "18", director: "" },
    ],
    uniActs: [
      { activity: "NBA Accreditation Committee", nature: "Convener", score: "25", hod: "25", director: "" },
    ],
    society: [{ label: "Community Coding Bootcamp", details: "Organised for school students", score: "5", hod: "5", director: "" }],
    industry: [{ name: "Microsoft India", details: "MOU + Certification Program", score: "5", hod: "5", director: "" }],
    acr: [
      { label: "Leadership and Team Management", hod: "22", director: "" },
      { label: "Research Output", hod: "24", director: "" },
      { label: "Departmental Performance", hod: "23", director: "" },
      { label: "Punctuality & Commitment", hod: "20", director: "" },
      { label: "Industry / Institute Interface", hod: "19", director: "" },
    ],
    journals: [
      { title: "Federated Learning for Healthcare IoT", journal: "IEEE IoT Journal", issn: "2327-4662", index: "SCI", score: "40", hod: "40", director: "" },
    ],
    books: [{ title: "Machine Learning Fundamentals", book: "Pearson, 2024", issn: "978-93-54", pub: "National", coauth: "0", first: "Yes", score: "25", hod: "25", director: "" }],
    ict: [{ title: "AI MOOC on NPTEL", desc: "16-week course", type: "E-Content", quad: "4", score: "18", hod: "18", director: "" }],
    research: [{ degree: "PhD", name: "Aakash Tiwari", thesis: "Submitted 2025-01-15", score: "25", hod: "25", director: "" }],
    patents: [{ title: "Federated AI Privacy System", type: "International", date: "2024-10-05", status: "Published", fileNo: "PCT/IN2024/050123", score: "35", hod: "35", director: "" }],
    awards: [{ title: "Best Researcher Award", date: "2025-02-10", agency: "AICTE", level: "National", score: "10", hod: "10", director: "" }],
    confs: [{ title: "Privacy in AI Systems", type: "Keynote", org: "IEEE COMPSAC 2024", level: "International", score: "20", hod: "20", director: "" }],
    proposals: [{ title: "Federated ML for Smart Cities", duration: "3 Years", agency: "SERB", amount: "48 Lakhs", score: "18", hod: "18", director: "" }],
    fdps: [{ program: "FDP on Generative AI", duration: "2 Weeks", org: "IIT Delhi", score: "8", hod: "8", director: "" }],
    training: [{ company: "Google India", duration: "1 Week", nature: "Industry Immersion", score: "5", hod: "5", director: "" }],
    docs: {
      "lec-0": [{ name: "ai_ml_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "federated_learning.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "patent_int.pdf", url: "#", type: "application/pdf" }],
      "conf-0": [{ name: "keynote_proceedings.pdf", url: "#", type: "application/pdf" }],
      "fdp-0": [{ name: "fdp_iitd.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Excellent performance across all parameters. Strongly recommended for promotion consideration.",
  },
  {
    id: 102, name: "Prof. Rajesh Kulkarni", employeeId: "DYPIU-HOD-0038",
    designation: "Professor & HOD", department: "Mechanical Engineering",
    submittedOn: "2025-04-26", status: "Pending Review",
    avatar: "RK", avatarColor: "#f97316",
    hodScore: 285,
    info: { name: "Prof. Rajesh Kulkarni", qual: "Ph.D (Mechanical)", desig: "Professor & HOD", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "ME401 / Thermodynamics", planned: "48", conducted: "46", score: "19", hod: "19", director: "" }],
    courseFile: { course: "ME401", title: "Thermodynamics", details: "Yes", score: "17", hod: "17", director: "" },
    innovScore: "8", innovHod: "8", innovDir: "",
    projects: [
      { label: "Project guided", score: "5", hod: "5", director: "" },
      { label: "Industrial collaboration", score: "3", hod: "3", director: "" },
      { label: "Award received", score: "2", hod: "2", director: "" },
      { label: "Project outcome", score: "3", hod: "3", director: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "" }, { label: "Certification", score: "3", hod: "3", director: "" }],
    feedback: [{ code: "ME401", fb1: "4.3", fb2: "4.5", score: "8.8", hod: "8.8", director: "" }],
    deptActs: [{ activity: "Workshop on CAD/CAM", nature: "Organizer", score: "16", hod: "16", director: "" }],
    uniActs: [{ activity: "Anti-Ragging Committee", nature: "Member", score: "15", hod: "15", director: "" }],
    society: [{ label: "Water Conservation Drive", details: "Campus initiative", score: "5", hod: "5", director: "" }],
    industry: [{ name: "Cummins India", details: "Student Internship MOU", score: "4", hod: "4", director: "" }],
    acr: [
      { label: "Leadership and Team Management", hod: "20", director: "" },
      { label: "Research Output", hod: "18", director: "" },
      { label: "Departmental Performance", hod: "21", director: "" },
      { label: "Punctuality & Commitment", hod: "22", director: "" },
      { label: "Industry / Institute Interface", hod: "20", director: "" },
    ],
    journals: [{ title: "CFD Analysis of Turbine Blades", journal: "Applied Thermal Engineering", issn: "1359-4311", index: "Scopus", score: "30", hod: "30", director: "" }],
    books: [], ict: [], research: [],
    patents: [{ title: "Energy-Efficient Heat Exchanger", type: "National", date: "2024-07-20", status: "Granted", fileNo: "202421054321", score: "30", hod: "30", director: "" }],
    awards: [], confs: [{ title: "Additive Manufacturing Trends", type: "Paper", org: "ASME IMECE 2024", level: "International", score: "15", hod: "15", director: "" }],
    proposals: [], fdps: [{ program: "FDP on Industry 4.0", duration: "1 Week", org: "NIT Pune", score: "5", hod: "5", director: "" }],
    training: [], docs: {
      "lec-0": [{ name: "me401_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "cfd_paper.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Consistent performance. Active in departmental activities.",
  },
  {
    id: 103, name: "Dr. Anjali Nair", employeeId: "DYPIU-HOD-0051",
    designation: "Associate Professor & HOD", department: "Chemical Engineering",
    submittedOn: "2025-04-20", status: "Reviewed",
    avatar: "AN", avatarColor: "#10b981",
    hodScore: 330,
    info: { name: "Dr. Anjali Nair", qual: "Ph.D (Chemical)", desig: "Associate Professor & HOD", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CH301 / Process Engineering", planned: "48", conducted: "48", score: "22", hod: "22", director: "22" }],
    courseFile: { course: "CH301", title: "Process Engineering", details: "Yes", score: "19", hod: "19", director: "19" },
    innovScore: "10", innovHod: "10", innovDir: "10",
    projects: [
      { label: "Project guided", score: "5", hod: "5", director: "5" },
      { label: "Industrial collaboration", score: "5", hod: "5", director: "5" },
      { label: "Award received", score: "4", hod: "4", director: "4" },
      { label: "Project outcome", score: "4", hod: "4", director: "4" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5" }, { label: "Certification", score: "5", hod: "5", director: "5" }],
    feedback: [{ code: "CH301", fb1: "4.8", fb2: "4.9", score: "9.7", hod: "9.7", director: "9.7" }],
    deptActs: [{ activity: "Lab Upgrade Project", nature: "PI", score: "20", hod: "20", director: "20" }],
    uniActs: [{ activity: "NAAC Criterion 3 Lead", nature: "Convener", score: "28", hod: "28", director: "28" }],
    society: [{ label: "Rural Sanitation Project", details: "NGO Collaboration", score: "5", hod: "5", director: "5" }],
    industry: [{ name: "BASF India", details: "Research Collaboration", score: "5", hod: "5", director: "5" }],
    acr: [
      { label: "Leadership and Team Management", hod: "25", director: "25" },
      { label: "Research Output", hod: "25", director: "25" },
      { label: "Departmental Performance", hod: "24", director: "24" },
      { label: "Punctuality & Commitment", hod: "23", director: "23" },
      { label: "Industry / Institute Interface", hod: "22", director: "22" },
    ],
    journals: [{ title: "Green Chemistry in Polymers", journal: "Green Chemistry", issn: "1463-9262", index: "SCI", score: "40", hod: "40", director: "40" }],
    books: [{ title: "Chemical Process Design", book: "Wiley, 2024", issn: "978-11-19", pub: "International", coauth: "0", first: "Yes", score: "30", hod: "30", director: "30" }],
    ict: [], research: [{ degree: "PhD", name: "Kavya Iyer", thesis: "Awarded 2024-09-10", score: "25", hod: "25", director: "25" }],
    patents: [], awards: [{ title: "Young Scientist Award", date: "2024-11-05", agency: "DST", level: "National", score: "10", hod: "10", director: "10" }],
    confs: [{ title: "Sustainable Process Engineering", type: "Invited Talk", org: "IChemE 2024", level: "International", score: "20", hod: "20", director: "20" }],
    proposals: [{ title: "Bio-refinery Optimisation", duration: "2 Years", agency: "CSIR", amount: "22 Lakhs", score: "18", hod: "18", director: "18" }],
    fdps: [], training: [],
    docs: {
      "lec-0": [{ name: "ch301_timetable.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "green_chemistry.pdf", url: "#", type: "application/pdf" }],
      "prop-0": [{ name: "csir_proposal.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Outstanding researcher and administrator. Recommended for senior designation.",
    directorRemarks: "Fully endorsed. Exceptional contribution to research and institution building.",
    directorTotal: 330,
  },
];

// Faculty under this Director (same structure as HOD dashboard FACULTY_LIST — abbreviated for space)
const FACULTY_LIST = [
  {
    id: 201, name: "Prof. Arjun Mehta", employeeId: "DYPIU-FAC-0101",
    designation: "Assistant Professor", department: "Computer Science & Engineering",
    submittedOn: "2025-04-18", status: "HOD Reviewed",
    avatar: "AM", avatarColor: "#6366f1",
    hodTotal: 310, hodRemarks: "Good performance. Continue research.",
    info: { name: "Prof. Arjun Mehta", qual: "M.Tech (CSE)", desig: "Assistant Professor", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CS301 / Data Structures", planned: "48", conducted: "46", score: "18", hod: "18", director: "" }],
    courseFile: { course: "CS301", title: "Data Structures", details: "Yes", score: "16", hod: "16", director: "" },
    innovScore: "8", innovHod: "8", innovDir: "",
    projects: [
      { label: "Project guided", score: "5", hod: "5", director: "" },
      { label: "Industrial collaboration", score: "3", hod: "3", director: "" },
      { label: "Award received", score: "2", hod: "2", director: "" },
      { label: "Project outcome", score: "3", hod: "3", director: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "" }, { label: "Certification", score: "4", hod: "4", director: "" }],
    feedback: [{ code: "CS301", fb1: "4.2", fb2: "4.4", score: "8.8", hod: "8.8", director: "" }],
    deptActs: [{ activity: "Department Seminar", nature: "Coordinator", score: "10", hod: "10", director: "" }],
    uniActs: [{ activity: "Exam Duty", nature: "Flying Squad", score: "15", hod: "15", director: "" }],
    society: [{ label: "Induction Program", details: "FE Student induction", score: "5", hod: "5", director: "" }],
    industry: [{ name: "TCS Pune", details: "Guest Lecture + MOU", score: "4", hod: "4", director: "" }],
    acr: [
      { label: "Self-motivation and Proactiveness", hod: "18", director: "" },
      { label: "Punctuality", hod: "20", director: "" },
      { label: "Target based work", hod: "17", director: "" },
      { label: "Effectiveness", hod: "16", director: "" },
      { label: "Obedience", hod: "19", director: "" },
    ],
    journals: [{ title: "Deep Learning for Image Segmentation", journal: "Elsevier CVIU", issn: "1077-3142", index: "Scopus", score: "30", hod: "30", director: "" }],
    books: [{ title: "Data Structures with C++", book: "Oxford Press, 2024", issn: "978-01-9", pub: "National", coauth: "1", first: "Yes", score: "20", hod: "20", director: "" }],
    ict: [{ title: "Data Structures MOOC", desc: "12-week", type: "E-Content", quad: "4", score: "15", hod: "15", director: "" }],
    research: [{ degree: "PhD", name: "Rohan Pawar", thesis: "Submitted 2024-11-10", score: "20", hod: "20", director: "" }],
    patents: [{ title: "Smart Irrigation System", type: "National", date: "2024-08-15", status: "Published", fileNo: "202421012345", score: "25", hod: "25", director: "" }],
    awards: [{ title: "Best Paper Award", date: "2024-03-20", agency: "IEEE", level: "International", score: "10", hod: "10", director: "" }],
    confs: [{ title: "ML in Healthcare", type: "Paper", org: "IEEE ICCCNT 2024", level: "International", score: "15", hod: "15", director: "" }],
    proposals: [{ title: "AI-based Traffic Management", duration: "2 Years", agency: "DST", amount: "12.5 Lakhs", score: "10", hod: "10", director: "" }],
    fdps: [{ program: "FDP on Deep Learning", duration: "1 Week", org: "IIT Bombay", score: "5", hod: "5", director: "" }],
    training: [{ company: "Infosys BPM", duration: "2 Weeks", nature: "Industry Collaboration", score: "5", hod: "5", director: "" }],
    docs: {
      "lec-0": [{ name: "timetable_sem1.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "journal_paper_1.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "patent_certificate.pdf", url: "#", type: "application/pdf" }],
    },
  },
  {
    id: 202, name: "Dr. Sneha Kulkarni", employeeId: "DYPIU-FAC-0088",
    designation: "Assistant Professor", department: "Computer Science & Engineering",
    submittedOn: "2025-04-20", status: "Director Approved",
    avatar: "SK", avatarColor: "#0ea5e9",
    hodTotal: 345, hodRemarks: "Excellent researcher.",
    directorTotal: 340, directorRemarks: "Strongly approved.",
    info: { name: "Dr. Sneha Kulkarni", qual: "Ph.D (IT)", desig: "Assistant Professor", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "IT201 / Database Systems", planned: "48", conducted: "48", score: "22", hod: "22", director: "22" }],
    courseFile: { course: "IT201", title: "Database Systems", details: "Yes", score: "18", hod: "18", director: "18" },
    innovScore: "9", innovHod: "9", innovDir: "9",
    projects: [
      { label: "Project guided", score: "4", hod: "4", director: "4" },
      { label: "Industrial collaboration", score: "4", hod: "4", director: "4" },
      { label: "Award received", score: "3", hod: "3", director: "3" },
      { label: "Project outcome", score: "4", hod: "4", director: "4" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5" }, { label: "Certification", score: "5", hod: "5", director: "5" }],
    feedback: [{ code: "IT201", fb1: "4.6", fb2: "4.8", score: "9.4", hod: "9.4", director: "9.4" }],
    deptActs: [{ activity: "Departmental Seminar", nature: "Organizer", score: "15", hod: "15", director: "15" }],
    uniActs: [{ activity: "Admission Committee", nature: "Member", score: "18", hod: "18", director: "18" }],
    society: [{ label: "Blood Donation", details: "Organised camp", score: "5", hod: "5", director: "5" }],
    industry: [{ name: "Wipro Pune", details: "Internship MOU", score: "5", hod: "5", director: "5" }],
    acr: [
      { label: "Self-motivation and Proactiveness", hod: "22", director: "22" },
      { label: "Punctuality", hod: "23", director: "23" },
      { label: "Target based work", hod: "21", director: "21" },
      { label: "Effectiveness", hod: "22", director: "22" },
      { label: "Obedience", hod: "23", director: "23" },
    ],
    journals: [{ title: "Blockchain in Healthcare", journal: "Springer", issn: "1234-5678", index: "SCI", score: "40", hod: "40", director: "40" }],
    books: [], ict: [], research: [], patents: [], awards: [], confs: [], proposals: [], fdps: [], training: [],
    docs: { "jour-0": [{ name: "blockchain_paper.pdf", url: "#", type: "application/pdf" }] },
  },
];

// ─── Director's own appraisal data (they also fill a form) ───────────────────
const DIRECTOR_SELF_DATA = {
  info: { name: "Prof. Suresh Patil", qual: "Ph.D., D.Sc. (Mechanical)", desig: "Director / Dean", ay: "2025-2026" },
  lectures: [{ sem: "Sem I", code: "ME601 / Advanced Manufacturing", planned: "40", conducted: "39", score: "20" }],
  courseFile: { course: "ME601", title: "Advanced Manufacturing", details: "Yes", score: "18" },
  innovScore: "9",
  projects: [
    { label: "Project guided (3/batch)", score: "5" }, { label: "Industrial collaboration", score: "5" },
    { label: "Award received", score: "4" }, { label: "Project outcome", score: "4" },
  ],
  quals: [{ label: "Higher Qualification", score: "5" }, { label: "Certification", score: "5" }],
  feedback: [{ code: "ME601", fb1: "4.7", fb2: "4.8", score: "9.5" }],
  deptActs: [{ activity: "School Administration", nature: "Director", score: "20" }],
  uniActs: [{ activity: "University Academic Council", nature: "Member", score: "30" }],
  society: [{ label: "Industry Connect Summit", details: "Organised annual summit", score: "5" }],
  industry: [{ name: "Tata Motors", details: "Joint Research MOU", score: "5" }],
  acr: [],
  journals: [{ title: "Smart Manufacturing using AI", journal: "CIRP Annals", issn: "0007-8506", index: "SCI", score: "40" }],
  books: [{ title: "Manufacturing Systems Engineering", book: "Springer, 2024", issn: "978-3-031", pub: "International", coauth: "0", first: "Yes", score: "30" }],
  ict: [{ title: "Advanced Manufacturing MOOC", desc: "NPTEL certified", type: "E-Content", quad: "4", score: "18" }],
  research: [{ degree: "PhD", name: "Mihir Shah", thesis: "Awarded 2024-08-20", score: "25" }],
  patents: [{ title: "Self-Healing Smart Composite", type: "International", date: "2024-06-10", status: "Granted", fileNo: "PCT/IN2024/050456", score: "35" }],
  awards: [{ title: "Distinguished Educator Award", date: "2025-01-15", agency: "ISTE", level: "National", score: "10" }],
  confs: [{ title: "Future of Manufacturing", type: "Keynote", org: "AIMTDR 2024", level: "International", score: "20" }],
  proposals: [{ title: "Industry 4.0 Smart Factory", duration: "3 Years", agency: "DST-SERB", amount: "75 Lakhs", score: "18" }],
  fdps: [{ program: "Leadership Development Program", duration: "1 Week", org: "IIM Pune", score: "5" }],
  training: [],
  docs: {
    "lec-0": [{ name: "me601_schedule.pdf", url: "#", type: "application/pdf" }],
    "jour-0": [{ name: "smart_manufacturing.pdf", url: "#", type: "application/pdf" }],
    "pat-0": [{ name: "patent_int.pdf", url: "#", type: "application/pdf" }],
    "conf-0": [{ name: "keynote.pdf", url: "#", type: "application/pdf" }],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const n = (v) => parseFloat(v) || 0;
const pct = (v, m) => Math.min(100, Math.round((v / m) * 100)) || 0;
const grade = (score, max) => {
  const p = (score / max) * 100;
  if (p >= 85) return { label: "Outstanding", color: "#059669", bg: "#d1fae5" };
  if (p >= 70) return { label: "Very Good", color: "#0284c7", bg: "#dbeafe" };
  if (p >= 55) return { label: "Good", color: "#7c3aed", bg: "#ede9fe" };
  if (p >= 40) return { label: "Satisfactory", color: "#d97706", bg: "#fef3c7" };
  return { label: "Needs Improvement", color: "#dc2626", bg: "#fee2e2" };
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function Avatar({ initials, color = "#0ea5e9", size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg,${color},${color}99)`, color: "#fff", fontWeight: 800, fontSize: size * 0.32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, letterSpacing: 0.5 }}>
      {initials}
    </div>
  );
}
function ScoreBar({ score, max, color = "#0ea5e9" }) {
  return (
    <div style={{ width: "100%", background: "#f1f5f9", borderRadius: 4, height: 5, overflow: "hidden" }}>
      <div style={{ width: `${pct(score, max)}%`, height: "100%", background: color, borderRadius: 4, transition: "width .5s" }} />
    </div>
  );
}
function StatusBadge({ status }) {
  const map = {
    "Pending Review":    { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    "Reviewed":          { bg: "#dbeafe", color: "#1e40af", dot: "#3b82f6" },
    "HOD Reviewed":      { bg: "#ede9fe", color: "#5b21b6", dot: "#7c3aed" },
    "Director Approved": { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
  };
  const s = map[status] || map["Pending Review"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}
function RO({ val, center }) {
  return <span style={{ fontSize: 11, fontFamily: "Georgia, serif", color: "#1e293b", display: "block", textAlign: center ? "center" : "left" }}>{val || <span style={{ color: "#cbd5e1" }}>—</span>}</span>;
}
function DirInput({ val, onChange }) {
  return (
    <input type="number" min="0" step="0.5" value={val}
      onChange={e => onChange(e.target.value)}
      style={{ width: 58, textAlign: "center", border: "1.5px solid #0ea5e9", borderRadius: 5, padding: "3px 5px", fontSize: 11, fontFamily: "Georgia, serif", outline: "none", background: "#f0fbff" }}
    />
  );
}
function SelfInput({ val, onChange }) {
  return (
    <input type="number" min="0" step="0.5" value={val}
      onChange={e => onChange(e.target.value)}
      style={{ width: 58, textAlign: "center", border: "1.5px solid #10b981", borderRadius: 5, padding: "3px 5px", fontSize: 11, fontFamily: "Georgia, serif", outline: "none", background: "#f0fff8" }}
    />
  );
}
function ViewDocsCell({ docKey, docs }) {
  const files = docs?.[docKey] || [];
  if (!files.length) return <span style={{ color: "#cbd5e1", fontSize: 10 }}>No docs</span>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {files.map((f, i) => (
        <a key={i} href={f.url} target="_blank" rel="noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#0ea5e9", fontSize: 10, textDecoration: "none", background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 4, padding: "2px 7px", whiteSpace: "nowrap" }}
          title={f.name}>
          📄 {f.name.length > 16 ? f.name.slice(0, 16) + "…" : f.name}
        </a>
      ))}
    </div>
  );
}
function SC({ title, subtitle, accent = "#0ea5e9", children }) {
  return (
    <div style={{ background: "#fff", borderRadius: 9, boxShadow: "0 1px 3px rgba(0,0,0,.06)", marginBottom: 14, overflow: "hidden", border: "1px solid #e2e8f0", borderTop: `3px solid ${accent}` }}>
      <div style={{ padding: "10px 15px", borderBottom: "1px solid #f1f5f9" }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: accent }}>{title}</div>
        {subtitle && <div style={{ color: "#64748b", fontSize: 11, marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ padding: "13px 15px" }}>{children}</div>
    </div>
  );
}

// ─── Table style constants ────────────────────────────────────────────────────
const T = { width: "100%", borderCollapse: "collapse", fontSize: 12 };
const TH    = { border: "1px solid #cbd5e1", padding: "7px 8px", background: "#0f172a",  color: "#cbd5e1",  fontWeight: 700, textAlign: "center", fontSize: 10 };
const TH_HOD = { ...TH, background: "#312e81", color: "#c7d2fe" };
const TH_DIR = { ...TH, background: "#0c4a6e", color: "#bae6fd" };
const TD  = { border: "1px solid #e2e8f0", padding: "5px 7px", verticalAlign: "middle" };
const TDC = { ...TD, textAlign: "center" };
const TDS = { ...TD, textAlign: "center", background: "#f8fafc", minWidth: 58 };
const TDS_HOD = { ...TDS, background: "#f0f4ff" };
const TDS_DIR = { ...TDS, background: "#f0fbff" };
const TDV = { ...TD, background: "#fafbff", minWidth: 110 };

// ─── Generic Review Form (used for both Faculty and HOD review) ───────────────
function ReviewForm({ person, dirData, setDirData, showHodCol = true, accentColor = "#0ea5e9", role = "director" }) {
  const set = (section, idx, field, val) => {
    setDirData(prev => {
      const updated = { ...prev };
      if (!updated[section]) updated[section] = JSON.parse(JSON.stringify(person[section] || []));
      if (idx === null) updated[section] = { ...updated[section], [field]: val };
      else updated[section] = updated[section].map((r, i) => i === idx ? { ...r, [field]: val } : r);
      return updated;
    });
  };
  const setScalar = (key, val) => setDirData(prev => ({ ...prev, [key]: val }));
  const get = (section, idx, field) => {
    if (dirData[section]) {
      const s = dirData[section];
      return idx === null ? (s[field] ?? person[section]?.[field] ?? "") : (s[idx]?.[field] ?? person[section]?.[idx]?.[field] ?? "");
    }
    return idx === null ? (person[section]?.[field] ?? "") : (person[section]?.[idx]?.[field] ?? "");
  };
  const getS = (key) => dirData[key] ?? person[key] ?? "";
  const { docs } = person;
  const rows = (arr) => arr && arr.length > 0 ? arr : [{}];

  const DI = ({ val, onChange }) =>
    role === "self"
      ? <SelfInput val={val} onChange={onChange} />
      : <DirInput val={val} onChange={onChange} />;

  const TH_EDIT = role === "self" ? { ...TH, background: "#064e3b", color: "#6ee7b7" } : TH_DIR;
  const TDS_EDIT = role === "self" ? { ...TDS, background: "#f0fff8" } : TDS_DIR;
  const editLabel = role === "self" ? "Your Score" : "Director Score";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ background: `linear-gradient(90deg,#0c4a6e,#0369a1)`, color: "#e0f2fe", borderRadius: 8, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
        <span style={{ fontSize: 18 }}>{role === "self" ? "✏️" : "🔍"}</span>
        <div>
          {role === "self"
            ? <><strong>Self-Appraisal Mode</strong> — Fill your own scores in the <span style={{ color: "#6ee7b7", fontWeight: 700 }}>Your Score</span> column.</>
            : <><strong>Director Review Mode</strong> — Faculty &amp; HOD scores are read-only. Only the <span style={{ color: "#bae6fd", fontWeight: 700 }}>Director Score</span> column is editable. {showHodCol && "HOD scores are shown for reference."}</>
          }
        </div>
      </div>

      {/* Faculty Info */}
      <SC title="Personal Information" accent={accentColor}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <tbody>
            {Object.entries(person.info).map(([k, v]) => (
              <tr key={k}>
                <td style={{ padding: "6px 10px", background: "#f8fafc", fontWeight: 600, border: "1px solid #e2e8f0", width: "35%", textTransform: "capitalize" }}>{k}</td>
                <td style={{ padding: "5px 10px", border: "1px solid #e2e8f0", color: "#334155" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </SC>

      <div style={{ fontWeight: 800, fontSize: 13, color: "#1e293b", background: "#dbeafe", padding: "8px 14px", borderRadius: 6, marginBottom: 10 }}>PART A — Teaching & Academic Activities</div>

      {/* A1: Lectures */}
      <SC title="A1. Lectures / Tutorials / Practicals (Max 50)" accent={accentColor}>
        <div style={{ overflowX: "auto" }}>
          <table style={T}><thead><tr>
            <th style={TH}>SN</th><th style={TH}>Semester</th><th style={TH}>Course</th>
            <th style={TH}>Planned</th><th style={TH}>Conducted</th>
            <th style={TH}>Docs</th><th style={TH}>Faculty Score</th>
            {showHodCol && <th style={TH_HOD}>HOD Score</th>}
            <th style={TH_EDIT}>{editLabel}</th>
          </tr></thead>
          <tbody>{rows(person.lectures).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.sem} /></td><td style={TD}><RO val={r.code} /></td>
              <td style={TDC}><RO val={r.planned} center /></td><td style={TDC}><RO val={r.conducted} center /></td>
              <td style={TDV}><ViewDocsCell docKey={`lec-${i}`} docs={docs} /></td>
              <td style={TDS}><RO val={r.score} center /></td>
              {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
              <td style={TDS_EDIT}><DI val={get("lectures", i, "director")} onChange={v => set("lectures", i, "director", v)} /></td>
            </tr>
          ))}</tbody></table>
        </div>
      </SC>

      {/* A2 Course File */}
      <SC title="A2. Course File (Max 20)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>Course</th><th style={TH}>Title</th><th style={TH}>Details</th>
          <th style={TH}>Docs</th><th style={TH}>Faculty Score</th>
          {showHodCol && <th style={TH_HOD}>HOD Score</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody><tr>
          <td style={TD}><RO val={person.courseFile?.course} /></td>
          <td style={TD}><RO val={person.courseFile?.title} /></td>
          <td style={TDC}><RO val={person.courseFile?.details} center /></td>
          <td style={TDV}><ViewDocsCell docKey="cf-0" docs={docs} /></td>
          <td style={TDS}><RO val={person.courseFile?.score} center /></td>
          {showHodCol && <td style={TDS_HOD}><RO val={person.courseFile?.hod} center /></td>}
          <td style={TDS_EDIT}><DI val={get("courseFile", null, "director")} onChange={v => set("courseFile", null, "director", v)} /></td>
        </tr></tbody></table>
      </SC>

      {/* A3 Innovative */}
      <SC title="A3. Innovative Teaching-Learning (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>Method</th><th style={TH}>Faculty Score</th>
          {showHodCol && <th style={TH_HOD}>HOD Score</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody><tr>
          <td style={TD}>Innovative / participatory teaching methods used</td>
          <td style={TDS}><RO val={person.innovScore} center /></td>
          {showHodCol && <td style={TDS_HOD}><RO val={person.innovHod} center /></td>}
          <td style={TDS_EDIT}><DI val={getS("innovDir")} onChange={v => setScalar("innovDir", v)} /></td>
        </tr></tbody></table>
      </SC>

      {/* A4 Projects */}
      <SC title="A4. Projects (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Project Type</th><th style={TH}>Docs</th>
          <th style={TH}>Faculty Score</th>{showHodCol && <th style={TH_HOD}>HOD Score</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.projects).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.label} /></td>
            <td style={TDV}><ViewDocsCell docKey={`proj-${i}`} docs={docs} /></td>
            <td style={TDS}><RO val={r.score} center /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            <td style={TDS_EDIT}><DI val={get("projects", i, "director")} onChange={v => set("projects", i, "director", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* A5 Quals */}
      <SC title="A5. Qualification Enhancement (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Description</th><th style={TH}>Docs</th>
          <th style={TH}>Faculty Score</th>{showHodCol && <th style={TH_HOD}>HOD Score</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.quals).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.label} /></td>
            <td style={TDV}><ViewDocsCell docKey={`qual-${i}`} docs={docs} /></td>
            <td style={TDS}><RO val={r.score} center /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            <td style={TDS_EDIT}><DI val={get("quals", i, "director")} onChange={v => set("quals", i, "director", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* B Feedback */}
      <SC title="B. Student Feedback (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Course</th><th style={TH}>FB1</th><th style={TH}>FB2</th><th style={TH}>Avg</th>
          <th style={TH}>Faculty Score</th>{showHodCol && <th style={TH_HOD}>HOD Score</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.feedback).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.code} /></td>
            <td style={TDC}><RO val={r.fb1} center /></td><td style={TDC}><RO val={r.fb2} center /></td>
            <td style={{ ...TDC, fontWeight: 700, color: "#0ea5e9" }}>{r.fb1 && r.fb2 ? ((n(r.fb1) + n(r.fb2)) / 2).toFixed(2) : "—"}</td>
            <td style={TDS}><RO val={r.score} center /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            <td style={TDS_EDIT}><DI val={get("feedback", i, "director")} onChange={v => set("feedback", i, "director", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* C Dept, D Uni, E Society, F Industry — abbreviated pattern */}
      {[
        ["C. Departmental Activities (Max 20)", "deptActs", "#f59e0b", ["Activity", "Nature"], ["activity", "nature"], "dept"],
        ["D. University Activities (Max 30)", "uniActs", "#f59e0b", ["Activity", "Nature"], ["activity", "nature"], "uni"],
        ["E. Contribution to Society (Max 10)", "society", "#10b981", ["Activity", "Details"], ["label", "details"], "soc"],
        ["F. Industry Connect (Max 5)", "industry", "#10b981", ["Industry", "Details"], ["name", "details"], "ind"],
      ].map(([title, key, accent2, cols, fields, docPfx]) => (
        <SC key={key} title={title} accent={accent2}>
          <table style={T}><thead><tr>
            <th style={TH}>SN</th>
            {cols.map(c => <th key={c} style={TH}>{c}</th>)}
            <th style={TH}>Docs</th><th style={TH}>Faculty Score</th>
            {showHodCol && <th style={TH_HOD}>HOD Score</th>}
            <th style={TH_EDIT}>{editLabel}</th>
          </tr></thead>
          <tbody>{rows(person[key]).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td>
              {fields.map(f => <td key={f} style={TD}><RO val={r[f]} /></td>)}
              <td style={TDV}><ViewDocsCell docKey={`${docPfx}-${i}`} docs={docs} /></td>
              <td style={TDS}><RO val={r.score} center /></td>
              {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
              <td style={TDS_EDIT}><DI val={get(key, i, "director")} onChange={v => set(key, i, "director", v)} /></td>
            </tr>
          ))}</tbody></table>
        </SC>
      ))}

      {/* G ACR — Director fills for HODs; for faculty this is read-only showing HOD score */}
      <SC title="G. Annual Confidential Report (Max 25)" accent="#ef4444">
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Parameter</th>
          {showHodCol && <th style={TH_HOD}>HOD Score</th>}
          {role !== "self" && <th style={TH_EDIT}>{editLabel}</th>}
        </tr></thead>
        <tbody>{rows(person.acr).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td>
            <td style={TD}><RO val={r.label} /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            {role !== "self" && <td style={TDS_EDIT}><DI val={get("acr", i, "director")} onChange={v => set("acr", i, "director", v)} /></td>}
          </tr>
        ))}</tbody></table>
      </SC>

      <div style={{ fontWeight: 800, fontSize: 13, color: "#1e293b", background: "#ede9fe", padding: "8px 14px", borderRadius: 6, marginBottom: 10 }}>PART B — Research & Academic Contributions</div>

      {/* B1 Journals */}
      <SC title="B1. Research Papers / Journal Publications (Max 120)" accent="#7c3aed">
        <div style={{ overflowX: "auto" }}><table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Title</th><th style={TH}>Journal</th>
          <th style={TH}>ISSN</th><th style={TH}>Index</th><th style={TH}>Docs</th>
          <th style={TH}>Faculty Score</th>{showHodCol && <th style={TH_HOD}>HOD Score</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.journals).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.title} /></td><td style={TD}><RO val={r.journal} /></td>
            <td style={TDC}><RO val={r.issn} center /></td><td style={TDC}><RO val={r.index} center /></td>
            <td style={TDV}><ViewDocsCell docKey={`jour-${i}`} docs={docs} /></td>
            <td style={TDS}><RO val={r.score} center /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            <td style={TDS_EDIT}><DI val={get("journals", i, "director")} onChange={v => set("journals", i, "director", v)} /></td>
          </tr>
        ))}</tbody></table></div>
      </SC>

      {/* B2-B8 — same pattern, abbreviated */}
      {[
        { title: "B2. Books / Book Chapters (Max 50)", key: "books", accent: "#7c3aed", docPfx: "book",
          cols: ["SN","Title","Book & Publisher","ISBN","1st Author?","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.title,r.book,r.issn,r.first] },
        { title: "B3. ICT / E-Content (Max 20)", key: "ict", accent: "#0ea5e9", docPfx: "ict",
          cols: ["SN","Title","Type","Quadrants","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.title,r.type,r.quad] },
        { title: "B4. Research Guidance (Max 30)", key: "research", accent: "#059669", docPfx: "res",
          cols: ["SN","Degree","Student","Status","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.degree,r.name,r.thesis] },
        { title: "B5a. Patents / IPR (Max 40)", key: "patents", accent: "#f97316", docPfx: "pat",
          cols: ["SN","Title","Type","Filed","Status","File No.","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.title,r.type,r.date,r.status,r.fileNo] },
        { title: "B5b. Awards / Fellowships (Max 10)", key: "awards", accent: "#f97316", docPfx: "awd",
          cols: ["SN","Award","Date","Agency","Level","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.title,r.date,r.agency,r.level] },
        { title: "B6. Conferences (Max 30)", key: "confs", accent: "#6366f1", docPfx: "conf",
          cols: ["SN","Title","Type","Organizer","Level","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.title,r.type,r.org,r.level] },
        { title: "B7. Research Proposals (Max 20)", key: "proposals", accent: "#0ea5e9", docPfx: "prop",
          cols: ["SN","Title","Duration","Agency","Amount","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.title,r.duration,r.agency,r.amount] },
        { title: "B8. Self Development — FDP (Max 10)", key: "fdps", accent: "#10b981", docPfx: "fdp",
          cols: ["SN","Program","Duration","Organizer","Docs","Fac Score","HOD","Dir"],
          render: (r,i) => [i+1,r.program,r.duration,r.org] },
      ].map(({ title, key, accent2, docPfx, render, cols }) => (
        <SC key={key} title={title} accent={accent2 || "#7c3aed"}>
          <div style={{ overflowX: "auto" }}><table style={T}><thead>
            <tr>{cols.map((c, ci) => {
              if (c === "HOD") return showHodCol ? <th key={ci} style={TH_HOD}>HOD Score</th> : null;
              if (c === "Dir") return <th key={ci} style={TH_EDIT}>{editLabel}</th>;
              if (c === "Fac Score") return <th key={ci} style={TH}>Faculty Score</th>;
              if (c === "Docs") return <th key={ci} style={TH}>Docs</th>;
              return <th key={ci} style={TH}>{c}</th>;
            })}</tr>
          </thead>
          <tbody>{rows(person[key]).map((r, i) => {
            const cells = render(r, i);
            return (
              <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
                {cells.map((cell, ci) => <td key={ci} style={ci === 0 ? TDC : TD}><RO val={cell} /></td>)}
                <td style={TDV}><ViewDocsCell docKey={`${docPfx}-${i}`} docs={docs} /></td>
                <td style={TDS}><RO val={r.score} center /></td>
                {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
                <td style={TDS_EDIT}><DI val={get(key, i, "director")} onChange={v => set(key, i, "director", v)} /></td>
              </tr>
            );
          })}</tbody></table></div>
        </SC>
      ))}
    </div>
  );
}

// ─── Score Calculator ─────────────────────────────────────────────────────────
function calcDirScore(person, dirData) {
  const get = (section, idx, field) => {
    if (dirData[section]) {
      const s = dirData[section];
      return idx === null ? n(s[field]) : n(s[idx]?.[field]);
    }
    return idx === null ? n(person[section]?.[field]) : n(person[section]?.[idx]?.[field]);
  };
  const getS = (key) => n(dirData[key] ?? person[key]);
  const sum = (arr, s, f) => (arr || []).reduce((a, _, i) => a + get(s, i, f), 0);

  const partA = sum(person.lectures, "lectures", "director") + get("courseFile", null, "director") +
    getS("innovDir") + sum(person.projects, "projects", "director") +
    sum(person.quals, "quals", "director") + sum(person.feedback, "feedback", "director") +
    sum(person.deptActs, "deptActs", "director") + sum(person.uniActs, "uniActs", "director") +
    sum(person.society, "society", "director") + sum(person.industry, "industry", "director") +
    sum(person.acr, "acr", "director");

  const partB = sum(person.journals, "journals", "director") + sum(person.books, "books", "director") +
    sum(person.ict, "ict", "director") + sum(person.research, "research", "director") +
    sum(person.patents, "patents", "director") + sum(person.awards, "awards", "director") +
    sum(person.confs, "confs", "director") + sum(person.proposals, "proposals", "director") +
    sum(person.fdps, "fdps", "director") + sum(person.training, "training", "director");

  return { partA, partB, total: partA + partB };
}

// ─── Review Panel ─────────────────────────────────────────────────────────────
function ReviewPanel({ person, personType, onBack, onSubmit }) {
  const [dirData, setDirData] = useState({});
  const [remarks, setRemarks] = useState(person.directorRemarks || "");
  const [tab, setTab] = useState("form");

  const { partA, partB, total } = calcDirScore(person, dirData);
  const g = grade(total, 575);

  const hodPartA = [
    ...(person.lectures || []).map(r => n(r.hod)),
    n(person.courseFile?.hod), n(person.innovHod),
    ...(person.projects || []).map(r => n(r.hod)),
    ...(person.quals || []).map(r => n(r.hod)),
    ...(person.feedback || []).map(r => n(r.hod)),
    ...(person.deptActs || []).map(r => n(r.hod)),
    ...(person.uniActs || []).map(r => n(r.hod)),
    ...(person.society || []).map(r => n(r.hod)),
    ...(person.industry || []).map(r => n(r.hod)),
    ...(person.acr || []).map(r => n(r.hod)),
  ].reduce((a, b) => a + b, 0);

  const hodPartB = [
    ...(person.journals || []).map(r => n(r.hod)),
    ...(person.books || []).map(r => n(r.hod)),
    ...(person.confs || []).map(r => n(r.hod)),
    ...(person.patents || []).map(r => n(r.hod)),
    ...(person.fdps || []).map(r => n(r.hod)),
  ].reduce((a, b) => a + b, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header bar */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16, borderRadius: 10 }}>
        <button onClick={onBack} style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontFamily: "Georgia, serif" }}>← Back</button>
        <Avatar initials={person.avatar} color={person.avatarColor || "#0ea5e9"} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>{person.name}</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>{person.designation} · {person.employeeId}</div>
        </div>
        {/* Score pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {personType !== "self" && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>HOD Total</div>
              <div style={{ color: "#818cf8", fontWeight: 800, fontSize: 14 }}>{(hodPartA + hodPartB).toFixed(1)}</div>
            </div>
          )}
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>Dir Part A</div>
            <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 14 }}>{partA.toFixed(1)}</div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>Dir Part B</div>
            <div style={{ color: "#34d399", fontWeight: 800, fontSize: 14 }}>{partB.toFixed(1)}</div>
          </div>
          <div style={{ background: g.bg, border: `2px solid ${g.color}40`, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: g.color, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 700 }}>Dir Total</div>
            <div style={{ color: g.color, fontWeight: 800, fontSize: 14 }}>{total.toFixed(1)}<span style={{ fontSize: 10, color: "#94a3b8" }}>/575</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["form", "📋 Review Form"], ["remarks", "✏️ Remarks & Submit"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ padding: "7px 18px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, background: tab === id ? "#0c4a6e" : "#e2e8f0", color: tab === id ? "#e0f2fe" : "#475569" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "form" && (
        <ReviewForm
          person={person} dirData={dirData} setDirData={setDirData}
          showHodCol={personType !== "self"}
          accentColor="#0ea5e9"
          role={personType === "self" ? "self" : "director"}
        />
      )}

      {tab === "remarks" && (
        <div style={{ background: "#fff", borderRadius: 10, padding: "22px 24px", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
          <h3 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: 15 }}>Director Remarks & Final Submission</h3>

          {/* Previous remarks (HOD) */}
          {person.hodRemarks && (
            <div style={{ background: "#f0f4ff", border: "1px solid #c7d2fe", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4338ca", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 6 }}>HOD Remarks</div>
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>{person.hodRemarks}</div>
            </div>
          )}

          {/* Score Summary */}
          <table style={{ ...T, marginBottom: 18 }}>
            <thead><tr>
              <th style={TH}>Section</th><th style={TH}>Max</th>
              <th style={TH}>Faculty Score</th>
              {personType !== "self" && <th style={TH_HOD}>HOD Score</th>}
              <th style={TH_DIR}>Director Score</th>
            </tr></thead>
            <tbody>
              <tr>
                <td style={TD}>Part A — Teaching & Activities</td>
                <td style={TDC}>200</td>
                <td style={TDS}>{[...(person.lectures||[]), ...(person.quals||[])].reduce((a,r)=>a+n(r.score),0).toFixed(1)}</td>
                {personType !== "self" && <td style={TDS_HOD}>{hodPartA.toFixed(1)}</td>}
                <td style={{ ...TDS_DIR, fontWeight: 700, color: "#0c4a6e" }}>{partA.toFixed(1)}</td>
              </tr>
              <tr>
                <td style={TD}>Part B — Research & Contributions</td>
                <td style={TDC}>375</td>
                <td style={TDS}>{(person.journals||[]).reduce((a,r)=>a+n(r.score),0).toFixed(1)}</td>
                {personType !== "self" && <td style={TDS_HOD}>{hodPartB.toFixed(1)}</td>}
                <td style={{ ...TDS_DIR, fontWeight: 700, color: "#0c4a6e" }}>{partB.toFixed(1)}</td>
              </tr>
              <tr style={{ background: "#d1fae5", fontWeight: 700 }}>
                <td style={TD}>Grand Total</td><td style={TDC}>575</td>
                <td style={TDS}>—</td>
                {personType !== "self" && <td style={TDS_HOD}>—</td>}
                <td style={{ ...TDS_DIR, color: "#065f46", fontSize: 14 }}>{total.toFixed(1)}</td>
              </tr>
              <tr style={{ background: g.bg }}>
                <td style={TD} colSpan={personType !== "self" ? 4 : 3}><strong>Grade</strong></td>
                <td style={{ ...TDC, color: g.color, fontWeight: 800 }}>{g.label}</td>
              </tr>
            </tbody>
          </table>

          <label style={{ fontWeight: 700, fontSize: 13, color: "#334155", display: "block", marginBottom: 6 }}>
            {personType === "self" ? "Self Remarks" : "Director Remarks"}
          </label>
          <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={4}
            placeholder={personType === "self" ? "Add your self-assessment remarks..." : "Enter your remarks, observations, and recommendations..."}
            style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 7, padding: "10px 12px", fontSize: 12, fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onBack} style={{ padding: "9px 22px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "Georgia, serif" }}>Cancel</button>
            <button onClick={() => onSubmit(person.id, total, remarks, personType)}
              style={{ padding: "10px 28px", background: personType === "self" ? "#059669" : "#0c4a6e", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}>
              {personType === "self" ? "✔ Submit Self Appraisal" : "✔ Submit Director Approval"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Self-Appraisal Panel ─────────────────────────────────────────────────────
function SelfAppraisalPanel() {
  const [dirData, setDirData] = useState({});
  const [tab, setTab] = useState("form");
  const [submitted, setSubmitted] = useState(false);
  const [remarks, setRemarks] = useState("");

  const { partA, partB, total } = calcDirScore(DIRECTOR_SELF_DATA, dirData);
  const g = grade(total, 575);

  if (submitted) return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "48px", textAlign: "center", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
      <h2 style={{ margin: "0 0 8px", color: "#0f172a" }}>Self-Appraisal Submitted</h2>
      <p style={{ color: "#64748b", fontSize: 13 }}>Your appraisal for AY {DIRECTOR_USER.ay} has been forwarded to the Vice Chancellor.</p>
      <div style={{ display: "inline-block", background: g.bg, color: g.color, borderRadius: 12, padding: "14px 28px", marginTop: 16, fontWeight: 800, fontSize: 18 }}>
        {total.toFixed(1)} / 575 — {g.label}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Score header */}
      <div style={{ background: "#0f172a", borderRadius: 10, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <Avatar initials={DIRECTOR_USER.avatar} color="#0ea5e9" size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>{DIRECTOR_USER.name}</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>{DIRECTOR_USER.designation} · Self-Appraisal AY {DIRECTOR_USER.ay}</div>
        </div>
        
        <div style={{ display: "flex", gap: 8 }}>
          {[["Part A", partA.toFixed(1), "#38bdf8"], ["Part B", partB.toFixed(1), "#34d399"], ["Total", `${total.toFixed(1)}/575`, g.color]].map(([l, v, c]) => (
            <div key={l} style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>{l}</div>
              <div style={{ color: c, fontWeight: 800, fontSize: 14 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["form", "📋 Appraisal Form"], ["submit", "✏️ Submit"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ padding: "7px 18px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, background: tab === id ? "#064e3b" : "#e2e8f0", color: tab === id ? "#6ee7b7" : "#475569" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "form" && (
        <ReviewForm
          person={DIRECTOR_SELF_DATA} dirData={dirData} setDirData={setDirData}
          showHodCol={false} accentColor="#10b981" role="self"
        />
      )}

      {tab === "submit" && (
        <div style={{ background: "#fff", borderRadius: 10, padding: "22px 24px", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
          <h3 style={{ margin: "0 0 14px", color: "#0f172a" }}>Submit Self-Appraisal</h3>
          <table style={{ ...T, marginBottom: 18 }}>
            <thead><tr><th style={TH}>Section</th><th style={TH}>Max</th><th style={{ ...TH, background: "#064e3b", color: "#6ee7b7" }}>Your Score</th></tr></thead>
            <tbody>
              {[["Part A — Teaching & Activities", 200, partA], ["Part B — Research & Contributions", 375, partB]].map(([l, m, v]) => (
                <tr key={l}><td style={TD}>{l}</td><td style={TDC}>{m}</td><td style={{ ...TDS, background: "#f0fff8", fontWeight: 700, color: "#064e3b" }}>{v.toFixed(1)}</td></tr>
              ))}
              <tr style={{ background: g.bg }}>
                <td style={TD} colSpan={2}><strong>Grand Total — {g.label}</strong></td>
                <td style={{ ...TDS, background: g.bg, color: g.color, fontWeight: 800, fontSize: 14 }}>{total.toFixed(1)}/575</td>
              </tr>
            </tbody>
          </table>
          <label style={{ fontWeight: 700, fontSize: 13, color: "#334155", display: "block", marginBottom: 6 }}>Self Remarks</label>
          <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={4}
            placeholder="Add your self-assessment remarks..."
            style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 7, padding: "10px 12px", fontSize: 12, fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={() => setSubmitted(true)}
              style={{ padding: "11px 30px", background: "#059669", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}>
              ✔ Submit to VC
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Person Card (shared for HOD and Faculty cards) ───────────────────────────
function PersonCard({ person, personType, onReview }) {
  const g = grade(person.directorTotal || person.hodTotal || 300, 575);
  const submittedScore = person.hodTotal || person.hodScore || 0;
  const docCount = Object.values(person.docs || {}).reduce((a, arr) => a + arr.length, 0);

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,.07)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar initials={person.avatar} color={person.avatarColor || "#0ea5e9"} size={46} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{person.name}</div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>{person.designation}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>{person.employeeId}</div>
          {person.department && <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{person.department}</div>}
        </div>
        <StatusBadge status={person.status} />
      </div>

      {/* Scores */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, background: "#f8fafc", borderRadius: 8, padding: "12px 14px" }}>
        {[
          { label: personType === "hod" ? "Own Score" : "HOD Score", val: submittedScore, max: 575, color: "#6366f1" },
          { label: "Dir Score", val: person.directorTotal || 0, max: 575, color: "#0ea5e9" },
          { label: "Docs", val: docCount, max: null, color: "#10b981" },
        ].map(({ label, val, max, color }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color, lineHeight: 1 }}>
              {typeof val === "number" ? val.toFixed(0) : val}
              {max && <span style={{ fontSize: 9, color: "#94a3b8" }}>/{max}</span>}
            </div>
            {max && <ScoreBar score={val} max={max} color={color} />}
            {!max && <div style={{ fontSize: 9, color: "#94a3b8" }}>files</div>}
          </div>
        ))}
      </div>

      {/* HOD Remarks preview */}
      {person.hodRemarks && (
        <div style={{ background: "#f0f4ff", borderRadius: 6, padding: "8px 10px", fontSize: 11, color: "#4338ca", lineHeight: 1.5, borderLeft: "3px solid #818cf8" }}>
          <span style={{ fontWeight: 700 }}>HOD: </span>{person.hodRemarks.slice(0, 80)}{person.hodRemarks.length > 80 ? "…" : ""}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
        <div style={{ fontSize: 10, color: "#94a3b8" }}>Submitted: {person.submittedOn}</div>
        <button onClick={() => onReview(person, personType)}
          style={{ fontSize: 11, padding: "7px 18px", background: person.status === "Director Approved" ? "#1e293b" : "#0c4a6e", color: "#e0f2fe", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontFamily: "Georgia, serif" }}>
          {person.status === "Director Approved" ? "✎ Edit Approval" : "🔍 Review & Approve →"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Director Dashboard ──────────────────────────────────────────────────
export default function DirectorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("hods");
  const [reviewing, setReviewing] = useState(null);   // { person, personType }
  const [hodList, setHodList] = useState(HOD_LIST);
  const [facList, setFacList] = useState(FACULTY_LIST);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const pendingHods = hodList.filter(h => h.status === "Pending Review").length;
  const pendingFacs = facList.filter(f => f.status === "HOD Reviewed").length;

  const handleSubmit = (id, total, remarks, personType) => {
    if (personType === "hod") {
      setHodList(prev => prev.map(h => h.id === id ? { ...h, status: "Reviewed", directorTotal: total, directorRemarks: remarks } : h));
    } else if (personType === "faculty") {
      setFacList(prev => prev.map(f => f.id === id ? { ...f, status: "Director Approved", directorTotal: total, directorRemarks: remarks } : f));
    }
    setReviewing(null);
  };

  const currentList = activeTab === "hods" ? hodList : facList;
  const filtered = filterStatus === "All" ? currentList : currentList.filter(p => p.status === filterStatus);

  const NAV = [
    { id: "self",    icon: "👤", label: "My Appraisal",       sub: "Self-assessment form" },
    { id: "hods",    icon: "👥", label: "HOD Approvals",      sub: `${pendingHods} awaiting review`, badge: pendingHods },
    { id: "faculty", icon: "📋", label: "Faculty Approvals",  sub: `${pendingFacs} awaiting review`, badge: pendingFacs },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Georgia, serif", background: "#f8fafc", color: "#1e293b" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 252, minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", padding: "22px 16px", gap: 14, position: "sticky", top: 0, alignSelf: "flex-start", flexShrink: 0, borderTopRightRadius: 18, borderBottomRightRadius: 18, marginRight: 8, boxShadow: "6px 0 20px rgba(15,23,42,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,#0ea5e9,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>FA</div>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13 }}>FacultyAppraise</div>
            <div style={{ color: "#475569", fontSize: 9 }}>D Y Patil International University</div>
          </div>
        </div>

        {/* Role badge */}
        <div style={{ background: "#164e63", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#7dd3fc" }}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>Director / Dean</div>
          <div style={{ color: "#475569", fontSize: 10 }}>{DIRECTOR_USER.school}</div>
        </div>

        <div style={{ height: 1, background: "#1e293b" }} />

        {NAV.map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setReviewing(null); setFilterStatus("All"); }}
            style={{ background: activeTab === tab.id ? "#1e293b" : "none", border: "none", borderRadius: 9, padding: "10px 11px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, width: "100%", fontFamily: "Georgia, serif" }}>
            <span style={{ fontSize: 16 }}>{tab.icon}</span>
            <div style={{ flex: 1, textAlign: "left" }}>
              <div style={{ color: "#e2e8f0", fontWeight: 700, fontSize: 12 }}>{tab.label}</div>
              <div style={{ color: "#64748b", fontSize: 10, marginTop: 1 }}>{tab.sub}</div>
            </div>
            {tab.badge > 0 && (
              <div style={{ background: "#f59e0b", color: "#fff", fontWeight: 800, fontSize: 10, minWidth: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{tab.badge}</div>
            )}
          </button>
        ))}

        <div style={{ flex: 1 }} />
        <div style={{ height: 1, background: "#1e293b" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials={DIRECTOR_USER.avatar} color="#0ea5e9" size={34} />
          <div>
            <div style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 700 }}>{DIRECTOR_USER.name.split(" ").slice(0, 2).join(" ")}</div>
            <div style={{ color: "#475569", fontSize: 9 }}>Director · {DIRECTOR_USER.school}</div>
          </div>
        </div>
        <button
          onClick={() => setShowLogoutModal(true)}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: 9, background: "none", border: "1px solid #374151", borderRadius: 8, padding: "9px 11px", cursor: "pointer", fontFamily: "Georgia, serif" }}
          onMouseEnter={e => e.currentTarget.style.background = "#1e293b"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          <span style={{ fontSize: 15 }}>🚪</span>
          <span style={{ color: "#f87171", fontWeight: 700, fontSize: 12 }}>Logout</span>
        </button>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, padding: "24px 30px", display: "flex", flexDirection: "column", gap: 18, overflowX: "auto" }}>

        {/* SELF APPRAISAL */}
        {activeTab === "self" && <SelfAppraisalPanel />}

        {/* HOD / FACULTY APPROVAL TABS */}
        {(activeTab === "hods" || activeTab === "faculty") && !reviewing && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.5 }}>
                  {activeTab === "hods" ? "HOD Approvals" : "Faculty Approvals"}
                </h1>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 11 }}>{DIRECTOR_USER.school} · AY {DIRECTOR_USER.ay}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "#fef3c7", color: "#92400e" }}>
                  ⏳ {activeTab === "hods" ? pendingHods : pendingFacs} Pending
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "#d1fae5", color: "#065f46" }}>
                  ✔ {activeTab === "hods" ? hodList.filter(h=>h.status==="Reviewed").length : facList.filter(f=>f.status==="Director Approved").length} Approved
                </div>
              </div>
            </div>

            {/* Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "#fff", borderRadius: 9, boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>Filter:</span>
              {["All", ...(activeTab === "hods" ? ["Pending Review", "Reviewed"] : ["HOD Reviewed", "Director Approved"])].map(f => (
                <button key={f} onClick={() => setFilterStatus(f)}
                  style={{ fontSize: 11, padding: "4px 12px", border: "1px solid #e2e8f0", borderRadius: 20, cursor: "pointer", fontFamily: "Georgia, serif", background: filterStatus === f ? "#0f172a" : "none", color: filterStatus === f ? "#f1f5f9" : "#475569" }}>
                  {f}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 14 }}>
              {filtered.map(person => (
                <PersonCard
                  key={person.id} person={person}
                  personType={activeTab === "hods" ? "hod" : "faculty"}
                  onReview={(p, t) => setReviewing({ person: p, personType: t })}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#94a3b8" }}>
                <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
                <div style={{ fontWeight: 700, color: "#0f172a" }}>All caught up!</div>
                <div style={{ color: "#64748b", fontSize: 12 }}>No records match the selected filter.</div>
              </div>
            )}
          </>
        )}

        {/* REVIEW PANEL */}
        {reviewing && (
          <ReviewPanel
            person={reviewing.person}
            personType={reviewing.personType}
            onBack={() => setReviewing(null)}
            onSubmit={handleSubmit}
          />
        )}
      </main>
      {showLogoutModal && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            style={{ background: "#fff", borderRadius: 14, padding: "32px 36px", maxWidth: 380, width: "90%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", alignItems: "center", gap: 18, fontFamily: "Georgia, serif" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#fee2e2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🚪</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 17, color: "#0f172a", marginBottom: 6 }}>Confirm Logout</div>
              <div style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6 }}>
                You are about to log out of <strong>FacultyAppraise</strong>.<br />Any unsaved changes will be lost.
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, width: "100%" }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                style={{ flex: 1, padding: "10px 0", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  localStorage.clear();
                  navigate("/", { replace: true });
                }}
                style={{ flex: 1, padding: "10px 0", background: "#dc2626", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
