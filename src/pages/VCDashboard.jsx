import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const VC_USER = {
  name: "Prof. Rajendra Kulkarni", employeeId: "DYPIU-VC-0001",
  designation: "Vice Chancellor",
  school: "D Y Patil International University", ay: "2025-2026", avatar: "RK",
};

// Deans visible to VC (with Dean self-score)
const DEAN_LIST = [
  {
    id: 401, name: "Prof. Anand Krishnamurthy", employeeId: "DYPIU-DEAN-0001",
    designation: "Dean of Academics", department: "Office of the Dean",
    submittedOn: "2025-04-30", status: "Pending VC Review",
    avatar: "AK", avatarColor: "#7c3aed",
    deanSelfScore: 430,
    info: { name: "Prof. Anand Krishnamurthy", qual: "Ph.D., LLD (Law & Policy)", desig: "Dean of Academics", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "GS701 / Academic Leadership & Policy", planned: "30", conducted: "29", score: "18", dean: "18", vc: "" }],
    courseFile: { course: "GS701", title: "Academic Leadership & Policy", details: "Yes", score: "18", dean: "18", vc: "" },
    innovScore: "9", innovDean: "9", innovVC: "",
    projects: [
      { label: "Project guided (3/batch)", score: "5", dean: "5", vc: "" },
      { label: "Industrial collaboration", score: "5", dean: "5", vc: "" },
      { label: "Award received", score: "4", dean: "4", vc: "" },
      { label: "Project outcome", score: "4", dean: "4", vc: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", dean: "5", vc: "" }, { label: "Certification", score: "5", dean: "5", vc: "" }],
    feedback: [{ code: "GS701", fb1: "4.9", fb2: "4.9", score: "9.8", dean: "9.8", vc: "" }],
    deptActs: [{ activity: "University Curriculum Committee", nature: "Chair", score: "20", dean: "20", vc: "" }],
    uniActs: [{ activity: "Senate & Academic Council", nature: "Secretary", score: "30", dean: "30", vc: "" }],
    society: [{ label: "Higher Ed Policy Forum", details: "National-level participation", score: "5", dean: "5", vc: "" }],
    industry: [{ name: "McKinsey India", details: "Advisory Board Member", score: "5", dean: "5", vc: "" }],
    acr: [
      { label: "Strategic Leadership", dean: "25", vc: "" },
      { label: "Academic Governance", dean: "24", vc: "" },
      { label: "Research Promotion", dean: "23", vc: "" },
      { label: "Institutional Relations", dean: "22", vc: "" },
      { label: "Compliance & Reporting", dean: "24", vc: "" },
    ],
    journals: [{ title: "Governance Models in Indian HEIs", journal: "Higher Education", issn: "0018-1560", index: "SCI", score: "40", dean: "40", vc: "" }],
    books: [{ title: "Academic Administration in the 21st Century", book: "Oxford Press, 2024", issn: "978-01-8", pub: "International", coauth: "0", first: "Yes", score: "30", dean: "30", vc: "" }],
    ict: [{ title: "Leadership MOOC on Coursera", desc: "8-week program", type: "E-Content", quad: "4", score: "18", dean: "18", vc: "" }],
    research: [{ degree: "PhD", name: "Sonal Joshi", thesis: "Awarded 2025-02-15", score: "25", dean: "25", vc: "" }],
    patents: [],
    awards: [{ title: "Best Academic Administrator", date: "2025-03-01", agency: "AIU", level: "National", score: "10", dean: "10", vc: "" }],
    confs: [{ title: "Future of Higher Education in India", type: "Keynote", org: "FICCI HEIS 2024", level: "International", score: "20", dean: "20", vc: "" }],
    proposals: [{ title: "NEP 2020 Implementation Research", duration: "2 Years", agency: "UGC", amount: "15 Lakhs", score: "18", dean: "18", vc: "" }],
    fdps: [{ program: "Leadership & Strategy", duration: "1 Week", org: "IIM Ahmedabad", score: "5", dean: "5", vc: "" }],
    training: [],
    docs: {
      "lec-0": [{ name: "gs701_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "governance_paper.pdf", url: "#", type: "application/pdf" }],
    },
    deanRemarks: "Self-appraisal submitted to Vice Chancellor for review.",
  },
  {
    id: 402, name: "Prof. Lalitha Raghunathan", employeeId: "DYPIU-DEAN-0002",
    designation: "Dean of Research & Innovation", department: "Office of Research",
    submittedOn: "2025-04-28", status: "VC Reviewed",
    avatar: "LR", avatarColor: "#0ea5e9",
    deanSelfScore: 448, vcTotal: 440,
    info: { name: "Prof. Lalitha Raghunathan", qual: "Ph.D. (Biotechnology), Post-Doc (MIT)", desig: "Dean of Research & Innovation", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "RS801 / Advanced Research Methodology", planned: "30", conducted: "30", score: "20", dean: "20", vc: "20" }],
    courseFile: { course: "RS801", title: "Advanced Research Methodology", details: "Yes", score: "19", dean: "19", vc: "19" },
    innovScore: "10", innovDean: "10", innovVC: "10",
    projects: [
      { label: "Project guided", score: "5", dean: "5", vc: "5" },
      { label: "Industrial collaboration", score: "5", dean: "5", vc: "5" },
      { label: "Award received", score: "5", dean: "5", vc: "5" },
      { label: "Project outcome", score: "5", dean: "5", vc: "5" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", dean: "5", vc: "5" }, { label: "Certification", score: "5", dean: "5", vc: "5" }],
    feedback: [{ code: "RS801", fb1: "4.9", fb2: "5.0", score: "9.9", dean: "9.9", vc: "9.9" }],
    deptActs: [{ activity: "Research Council", nature: "Chair", score: "20", dean: "20", vc: "20" }],
    uniActs: [{ activity: "NAAC Criterion 3", nature: "Co-ordinator", score: "30", dean: "30", vc: "30" }],
    society: [{ label: "Rural Innovation Lab", details: "Initiated program in tribal areas", score: "5", dean: "5", vc: "5" }],
    industry: [{ name: "TATA Consultancy", details: "Joint Research Lab MOU", score: "5", dean: "5", vc: "5" }],
    acr: [
      { label: "Strategic Leadership", dean: "25", vc: "25" },
      { label: "Academic Governance", dean: "25", vc: "25" },
      { label: "Research Promotion", dean: "25", vc: "25" },
      { label: "Institutional Relations", dean: "24", vc: "24" },
      { label: "Compliance & Reporting", dean: "24", vc: "24" },
    ],
    journals: [{ title: "CRISPR-based Gene Editing in Cancer", journal: "Nature Biotechnology", issn: "1087-0156", index: "SCI", score: "40", dean: "40", vc: "40" }],
    books: [{ title: "Modern Research Methods", book: "Springer, 2024", issn: "978-3-030", pub: "International", coauth: "0", first: "Yes", score: "30", dean: "30", vc: "30" }],
    ict: [{ title: "Research Ethics MOOC", desc: "NPTEL 12-week", type: "E-Content", quad: "4", score: "18", dean: "18", vc: "18" }],
    research: [{ degree: "PhD", name: "Arun Prakash", thesis: "Awarded 2024-11-10", score: "25", dean: "25", vc: "25" }],
    patents: [{ title: "Nano Drug Delivery System", type: "International", date: "2024-07-15", status: "Granted", fileNo: "PCT/IN2024/050789", score: "35", dean: "35", vc: "35" }],
    awards: [{ title: "National Science Academy Fellow", date: "2025-01-20", agency: "INSA", level: "National", score: "10", dean: "10", vc: "10" }],
    confs: [{ title: "Frontiers in Biotech Research", type: "Keynote", org: "IICB 2024", level: "International", score: "20", dean: "20", vc: "20" }],
    proposals: [{ title: "Precision Medicine for India", duration: "5 Years", agency: "DBT", amount: "2.5 Crore", score: "18", dean: "18", vc: "18" }],
    fdps: [{ program: "Research Leadership Program", duration: "2 Weeks", org: "IISc Bangalore", score: "5", dean: "5", vc: "5" }],
    training: [],
    docs: {
      "lec-0": [{ name: "rs801_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "crispr_cancer.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "nanodrug_patent.pdf", url: "#", type: "application/pdf" }],
    },
    deanRemarks: "Exceptional researcher and leader. Strongly recommended for highest recognition.",
    vcRemarks: "VC-level endorsement. Distinguished contribution to research and innovation nationally.",
  },
];

// Directors visible to VC (Dean-reviewed)
const DIRECTOR_LIST_VC = [
  {
    id: 301, name: "Prof. Suresh Patil", employeeId: "DYPIU-DIR-0005",
    designation: "Director / Dean", department: "School of Engineering & Management Research",
    submittedOn: "2025-04-28", status: "Dean Reviewed",
    avatar: "SP", avatarColor: "#6366f1",
    directorScore: 420, deanTotal: 415, vcTotal: 0,
    info: { name: "Prof. Suresh Patil", qual: "Ph.D., D.Sc. (Mechanical)", desig: "Director / Dean", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "ME601 / Advanced Manufacturing", planned: "40", conducted: "39", score: "20", director: "20", dean: "20", vc: "" }],
    courseFile: { course: "ME601", title: "Advanced Manufacturing", details: "Yes", score: "18", director: "18", dean: "18", vc: "" },
    innovScore: "9", innovDir: "9", innovDean: "9", innovVC: "",
    projects: [
      { label: "Project guided (3/batch)", score: "5", director: "5", dean: "5", vc: "" },
      { label: "Industrial collaboration", score: "5", director: "5", dean: "5", vc: "" },
      { label: "Award received", score: "4", director: "4", dean: "4", vc: "" },
      { label: "Project outcome", score: "4", director: "4", dean: "4", vc: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", director: "5", dean: "5", vc: "" }, { label: "Certification", score: "5", director: "5", dean: "5", vc: "" }],
    feedback: [{ code: "ME601", fb1: "4.7", fb2: "4.8", score: "9.5", director: "9.5", dean: "9.5", vc: "" }],
    deptActs: [{ activity: "School Administration", nature: "Director", score: "20", director: "20", dean: "20", vc: "" }],
    uniActs: [{ activity: "University Academic Council", nature: "Member", score: "30", director: "30", dean: "30", vc: "" }],
    society: [{ label: "Industry Connect Summit", details: "Organised annual summit", score: "5", director: "5", dean: "5", vc: "" }],
    industry: [{ name: "Tata Motors", details: "Joint Research MOU", score: "5", director: "5", dean: "5", vc: "" }],
    acr: [
      { label: "Leadership and Vision", director: "24", dean: "24", vc: "" },
      { label: "Research Output", director: "23", dean: "23", vc: "" },
      { label: "Institutional Development", director: "25", dean: "25", vc: "" },
      { label: "Industry Interface", director: "22", dean: "22", vc: "" },
      { label: "Compliance & Reporting", director: "20", dean: "20", vc: "" },
    ],
    journals: [{ title: "Smart Manufacturing using AI", journal: "CIRP Annals", issn: "0007-8506", index: "SCI", score: "40", director: "40", dean: "40", vc: "" }],
    books: [{ title: "Manufacturing Systems Engineering", book: "Springer, 2024", issn: "978-3-031", pub: "International", coauth: "0", first: "Yes", score: "30", director: "30", dean: "30", vc: "" }],
    ict: [{ title: "Advanced Manufacturing MOOC", desc: "NPTEL certified", type: "E-Content", quad: "4", score: "18", director: "18", dean: "18", vc: "" }],
    research: [{ degree: "PhD", name: "Mihir Shah", thesis: "Awarded 2024-08-20", score: "25", director: "25", dean: "25", vc: "" }],
    patents: [{ title: "Self-Healing Smart Composite", type: "International", date: "2024-06-10", status: "Granted", fileNo: "PCT/IN2024/050456", score: "35", director: "35", dean: "35", vc: "" }],
    awards: [{ title: "Distinguished Educator Award", date: "2025-01-15", agency: "ISTE", level: "National", score: "10", director: "10", dean: "10", vc: "" }],
    confs: [{ title: "Future of Manufacturing", type: "Keynote", org: "AIMTDR 2024", level: "International", score: "20", director: "20", dean: "20", vc: "" }],
    proposals: [{ title: "Industry 4.0 Smart Factory", duration: "3 Years", agency: "DST-SERB", amount: "75 Lakhs", score: "18", director: "18", dean: "18", vc: "" }],
    fdps: [{ program: "Leadership Development Program", duration: "1 Week", org: "IIM Pune", score: "5", director: "5", dean: "5", vc: "" }],
    training: [],
    docs: {
      "lec-0": [{ name: "me601_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "smart_manufacturing.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "patent_int.pdf", url: "#", type: "application/pdf" }],
      "conf-0": [{ name: "keynote.pdf", url: "#", type: "application/pdf" }],
    },
    directorRemarks: "Self-assessment submitted for Dean review.",
    deanRemarks: "Excellent Director-level performance. Strongly endorsed for VC approval.",
  },
  {
    id: 302, name: "Dr. Meena Iyer", employeeId: "DYPIU-DIR-0003",
    designation: "Director", department: "School of Health Sciences",
    submittedOn: "2025-04-26", status: "VC Reviewed",
    avatar: "MI", avatarColor: "#10b981",
    directorScore: 395, deanTotal: 388, vcTotal: 385,
    info: { name: "Dr. Meena Iyer", qual: "Ph.D. (Biomedical Sciences)", desig: "Director", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "HS501 / Clinical Research Methods", planned: "40", conducted: "40", score: "22", director: "22", dean: "22", vc: "22" }],
    courseFile: { course: "HS501", title: "Clinical Research Methods", details: "Yes", score: "19", director: "19", dean: "19", vc: "19" },
    innovScore: "10", innovDir: "10", innovDean: "10", innovVC: "10",
    projects: [
      { label: "Project guided", score: "5", director: "5", dean: "5", vc: "5" },
      { label: "Industrial collaboration", score: "5", director: "5", dean: "5", vc: "5" },
      { label: "Award received", score: "4", director: "4", dean: "4", vc: "4" },
      { label: "Project outcome", score: "4", director: "4", dean: "4", vc: "4" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", director: "5", dean: "5", vc: "5" }, { label: "Certification", score: "5", director: "5", dean: "5", vc: "5" }],
    feedback: [{ code: "HS501", fb1: "4.9", fb2: "4.8", score: "9.7", director: "9.7", dean: "9.7", vc: "9.7" }],
    deptActs: [{ activity: "Research Ethics Committee", nature: "Chair", score: "20", director: "20", dean: "20", vc: "20" }],
    uniActs: [{ activity: "NAAC Steering Committee", nature: "Co-Convener", score: "28", director: "28", dean: "28", vc: "28" }],
    society: [{ label: "Community Health Camp", details: "Free checkups in rural Pune", score: "5", director: "5", dean: "5", vc: "5" }],
    industry: [{ name: "Cipla Ltd.", details: "Joint Research MOU", score: "5", director: "5", dean: "5", vc: "5" }],
    acr: [
      { label: "Leadership and Vision", director: "25", dean: "25", vc: "25" },
      { label: "Research Output", director: "24", dean: "24", vc: "24" },
      { label: "Institutional Development", director: "23", dean: "23", vc: "23" },
      { label: "Industry Interface", director: "22", dean: "22", vc: "22" },
      { label: "Compliance & Reporting", director: "24", dean: "24", vc: "24" },
    ],
    journals: [{ title: "AI-Assisted Drug Discovery", journal: "Nature Medicine", issn: "1078-8956", index: "SCI", score: "40", director: "40", dean: "40", vc: "40" }],
    books: [], ict: [], research: [{ degree: "PhD", name: "Pooja Varma", thesis: "Awarded 2024-12-10", score: "25", director: "25", dean: "25", vc: "25" }],
    patents: [], awards: [{ title: "Excellence in Research", date: "2024-10-20", agency: "ICMR", level: "National", score: "10", director: "10", dean: "10", vc: "10" }],
    confs: [{ title: "Biomarkers in Early Cancer Detection", type: "Invited Talk", org: "AACR 2024", level: "International", score: "20", director: "20", dean: "20", vc: "20" }],
    proposals: [{ title: "Rural Health Diagnostics AI", duration: "2 Years", agency: "ICMR", amount: "30 Lakhs", score: "18", director: "18", dean: "18", vc: "18" }],
    fdps: [], training: [],
    docs: {
      "lec-0": [{ name: "hs501_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "ai_drug_discovery.pdf", url: "#", type: "application/pdf" }],
    },
    directorRemarks: "Outstanding researcher and institutional leader. Fully recommended.",
    deanRemarks: "Endorsed with commendation. Exceptional contribution to health sciences research.",
    vcRemarks: "VC approval granted. Exemplary national-level contribution.",
  },
];

// HODs visible to VC (Dean-reviewed)
const HOD_LIST_VC = [
  {
    id: 103, name: "Dr. Anjali Nair", employeeId: "DYPIU-HOD-0051",
    designation: "Associate Professor & HOD", department: "Chemical Engineering",
    submittedOn: "2025-04-20", status: "Dean Reviewed",
    avatar: "AN", avatarColor: "#10b981",
    hodScore: 330, directorTotal: 330, deanTotal: 328, vcTotal: 0,
    info: { name: "Dr. Anjali Nair", qual: "Ph.D (Chemical)", desig: "Associate Professor & HOD", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CH301 / Process Engineering", planned: "48", conducted: "48", score: "22", hod: "22", director: "22", dean: "22", vc: "" }],
    courseFile: { course: "CH301", title: "Process Engineering", details: "Yes", score: "19", hod: "19", director: "19", dean: "19", vc: "" },
    innovScore: "10", innovHod: "10", innovDir: "10", innovDean: "10", innovVC: "",
    projects: [
      { label: "Project guided", score: "5", hod: "5", director: "5", dean: "5", vc: "" },
      { label: "Industrial collaboration", score: "5", hod: "5", director: "5", dean: "5", vc: "" },
      { label: "Award received", score: "4", hod: "4", director: "4", dean: "4", vc: "" },
      { label: "Project outcome", score: "4", hod: "4", director: "4", dean: "4", vc: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5", dean: "5", vc: "" }, { label: "Certification", score: "5", hod: "5", director: "5", dean: "5", vc: "" }],
    feedback: [{ code: "CH301", fb1: "4.8", fb2: "4.9", score: "9.7", hod: "9.7", director: "9.7", dean: "9.7", vc: "" }],
    deptActs: [{ activity: "Lab Upgrade Project", nature: "PI", score: "20", hod: "20", director: "20", dean: "20", vc: "" }],
    uniActs: [{ activity: "NAAC Criterion 3 Lead", nature: "Convener", score: "28", hod: "28", director: "28", dean: "28", vc: "" }],
    society: [{ label: "Rural Sanitation Project", details: "NGO Collaboration", score: "5", hod: "5", director: "5", dean: "5", vc: "" }],
    industry: [{ name: "BASF India", details: "Research Collaboration", score: "5", hod: "5", director: "5", dean: "5", vc: "" }],
    acr: [
      { label: "Leadership and Team Management", hod: "25", director: "25", dean: "25", vc: "" },
      { label: "Research Output", hod: "25", director: "25", dean: "25", vc: "" },
      { label: "Departmental Performance", hod: "24", director: "24", dean: "24", vc: "" },
      { label: "Punctuality & Commitment", hod: "23", director: "23", dean: "23", vc: "" },
      { label: "Industry / Institute Interface", hod: "22", director: "22", dean: "22", vc: "" },
    ],
    journals: [{ title: "Green Chemistry in Polymers", journal: "Green Chemistry", issn: "1463-9262", index: "SCI", score: "40", hod: "40", director: "40", dean: "40", vc: "" }],
    books: [{ title: "Chemical Process Design", book: "Wiley, 2024", issn: "978-11-19", pub: "International", coauth: "0", first: "Yes", score: "30", hod: "30", director: "30", dean: "30", vc: "" }],
    ict: [], research: [{ degree: "PhD", name: "Kavya Iyer", thesis: "Awarded 2024-09-10", score: "25", hod: "25", director: "25", dean: "25", vc: "" }],
    patents: [], awards: [{ title: "Young Scientist Award", date: "2024-11-05", agency: "DST", level: "National", score: "10", hod: "10", director: "10", dean: "10", vc: "" }],
    confs: [{ title: "Sustainable Process Engineering", type: "Invited Talk", org: "IChemE 2024", level: "International", score: "20", hod: "20", director: "20", dean: "20", vc: "" }],
    proposals: [{ title: "Bio-refinery Optimisation", duration: "2 Years", agency: "CSIR", amount: "22 Lakhs", score: "18", hod: "18", director: "18", dean: "18", vc: "" }],
    fdps: [], training: [],
    docs: {
      "lec-0": [{ name: "ch301_timetable.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "green_chemistry.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Outstanding researcher and administrator. Recommended for senior designation.",
    directorRemarks: "Fully endorsed. Exceptional contribution to research and institution building.",
    deanRemarks: "Strongly approved at Dean level. Exemplary academic and research leadership.",
  },
  {
    id: 104, name: "Dr. Priya Sharma", employeeId: "DYPIU-HOD-0042",
    designation: "Associate Professor & HOD", department: "Computer Science & Engineering",
    submittedOn: "2025-04-25", status: "VC Reviewed",
    avatar: "PS", avatarColor: "#6366f1",
    hodScore: 312, directorTotal: 308, deanTotal: 305, vcTotal: 302,
    info: { name: "Dr. Priya Sharma", qual: "Ph.D (Computer Science)", desig: "Associate Professor & HOD", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CS501 / AI & ML", planned: "48", conducted: "47", score: "20", hod: "20", director: "20", dean: "20", vc: "20" }],
    courseFile: { course: "CS501", title: "AI & ML", details: "Yes", score: "18", hod: "18", director: "18", dean: "18", vc: "18" },
    innovScore: "9", innovHod: "9", innovDir: "9", innovDean: "9", innovVC: "9",
    projects: [
      { label: "Project guided (3/batch)", score: "5", hod: "5", director: "5", dean: "5", vc: "5" },
      { label: "Industrial collaboration", score: "4", hod: "4", director: "4", dean: "4", vc: "4" },
      { label: "Award received", score: "3", hod: "3", director: "3", dean: "3", vc: "3" },
      { label: "Project outcome", score: "4", hod: "4", director: "4", dean: "4", vc: "4" },
    ],
    quals: [{ label: "Higher Qualification achieved", score: "5", hod: "5", director: "5", dean: "5", vc: "5" }, { label: "Add-on Certification", score: "4", hod: "4", director: "4", dean: "4", vc: "4" }],
    feedback: [{ code: "CS501", fb1: "4.5", fb2: "4.7", score: "9.2", hod: "9.2", director: "9.2", dean: "9.2", vc: "9.2" }],
    deptActs: [{ activity: "Department Seminar Series", nature: "Coordinator", score: "18", hod: "18", director: "18", dean: "18", vc: "18" }],
    uniActs: [{ activity: "NBA Accreditation Committee", nature: "Convener", score: "25", hod: "25", director: "25", dean: "25", vc: "25" }],
    society: [{ label: "Community Coding Bootcamp", details: "Organised for school students", score: "5", hod: "5", director: "5", dean: "5", vc: "5" }],
    industry: [{ name: "Microsoft India", details: "MOU + Certification Program", score: "5", hod: "5", director: "5", dean: "5", vc: "5" }],
    acr: [
      { label: "Leadership and Team Management", hod: "22", director: "22", dean: "22", vc: "22" },
      { label: "Research Output", hod: "24", director: "23", dean: "23", vc: "22" },
      { label: "Departmental Performance", hod: "23", director: "23", dean: "23", vc: "23" },
      { label: "Punctuality & Commitment", hod: "20", director: "20", dean: "20", vc: "20" },
      { label: "Industry / Institute Interface", hod: "19", director: "19", dean: "19", vc: "19" },
    ],
    journals: [{ title: "Federated Learning for Healthcare IoT", journal: "IEEE IoT Journal", issn: "2327-4662", index: "SCI", score: "40", hod: "40", director: "40", dean: "40", vc: "40" }],
    books: [{ title: "Machine Learning Fundamentals", book: "Pearson, 2024", issn: "978-93-54", pub: "National", coauth: "0", first: "Yes", score: "25", hod: "25", director: "25", dean: "25", vc: "25" }],
    ict: [{ title: "AI MOOC on NPTEL", desc: "16-week course", type: "E-Content", quad: "4", score: "18", hod: "18", director: "18", dean: "18", vc: "18" }],
    research: [{ degree: "PhD", name: "Aakash Tiwari", thesis: "Submitted 2025-01-15", score: "25", hod: "25", director: "25", dean: "25", vc: "25" }],
    patents: [{ title: "Federated AI Privacy System", type: "International", date: "2024-10-05", status: "Published", fileNo: "PCT/IN2024/050123", score: "35", hod: "35", director: "35", dean: "35", vc: "35" }],
    awards: [{ title: "Best Researcher Award", date: "2025-02-10", agency: "AICTE", level: "National", score: "10", hod: "10", director: "10", dean: "10", vc: "10" }],
    confs: [{ title: "Privacy in AI Systems", type: "Keynote", org: "IEEE COMPSAC 2024", level: "International", score: "20", hod: "20", director: "20", dean: "20", vc: "20" }],
    proposals: [{ title: "Federated ML for Smart Cities", duration: "3 Years", agency: "SERB", amount: "48 Lakhs", score: "18", hod: "18", director: "18", dean: "18", vc: "18" }],
    fdps: [{ program: "FDP on Generative AI", duration: "2 Weeks", org: "IIT Delhi", score: "8", hod: "8", director: "8", dean: "8", vc: "8" }],
    training: [{ company: "Google India", duration: "1 Week", nature: "Industry Immersion", score: "5", hod: "5", director: "5", dean: "5", vc: "5" }],
    docs: {
      "lec-0": [{ name: "ai_ml_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "federated_learning.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "patent_int.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Excellent performance across all parameters. Strongly recommended for promotion.",
    directorRemarks: "Endorsed. Excellent researcher and departmental leader.",
    deanRemarks: "Approved. Commendable research and academic leadership.",
    vcRemarks: "VC approval confirmed. Fast-track promotion recommended.",
  },
];

// Faculty visible to VC (Dean-reviewed)
const FACULTY_LIST_VC = [
  {
    id: 202, name: "Dr. Sneha Kulkarni", employeeId: "DYPIU-FAC-0088",
    designation: "Assistant Professor", department: "Computer Science & Engineering",
    submittedOn: "2025-04-20", status: "Dean Reviewed",
    avatar: "SK", avatarColor: "#0ea5e9",
    hodTotal: 345, directorTotal: 340, deanTotal: 338, vcTotal: 0,
    hodRemarks: "Excellent researcher.",
    directorRemarks: "Strongly approved.",
    deanRemarks: "Exemplary. Dean-level endorsement for fast-track promotion.",
    info: { name: "Dr. Sneha Kulkarni", qual: "Ph.D (IT)", desig: "Assistant Professor", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "IT201 / Database Systems", planned: "48", conducted: "48", score: "22", hod: "22", director: "22", dean: "22", vc: "" }],
    courseFile: { course: "IT201", title: "Database Systems", details: "Yes", score: "18", hod: "18", director: "18", dean: "18", vc: "" },
    innovScore: "9", innovHod: "9", innovDir: "9", innovDean: "9", innovVC: "",
    projects: [
      { label: "Project guided", score: "4", hod: "4", director: "4", dean: "4", vc: "" },
      { label: "Industrial collaboration", score: "4", hod: "4", director: "4", dean: "4", vc: "" },
      { label: "Award received", score: "3", hod: "3", director: "3", dean: "3", vc: "" },
      { label: "Project outcome", score: "4", hod: "4", director: "4", dean: "4", vc: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5", dean: "5", vc: "" }, { label: "Certification", score: "5", hod: "5", director: "5", dean: "5", vc: "" }],
    feedback: [{ code: "IT201", fb1: "4.6", fb2: "4.8", score: "9.4", hod: "9.4", director: "9.4", dean: "9.4", vc: "" }],
    deptActs: [{ activity: "Departmental Seminar", nature: "Organizer", score: "15", hod: "15", director: "15", dean: "15", vc: "" }],
    uniActs: [{ activity: "Admission Committee", nature: "Member", score: "18", hod: "18", director: "18", dean: "18", vc: "" }],
    society: [{ label: "Blood Donation", details: "Organised camp", score: "5", hod: "5", director: "5", dean: "5", vc: "" }],
    industry: [{ name: "Wipro Pune", details: "Internship MOU", score: "5", hod: "5", director: "5", dean: "5", vc: "" }],
    acr: [
      { label: "Self-motivation and Proactiveness", hod: "22", director: "22", dean: "22", vc: "" },
      { label: "Punctuality", hod: "23", director: "23", dean: "23", vc: "" },
      { label: "Target based work", hod: "21", director: "21", dean: "21", vc: "" },
      { label: "Effectiveness", hod: "22", director: "22", dean: "22", vc: "" },
      { label: "Obedience", hod: "23", director: "23", dean: "23", vc: "" },
    ],
    journals: [{ title: "Blockchain in Healthcare", journal: "Springer", issn: "1234-5678", index: "SCI", score: "40", hod: "40", director: "40", dean: "40", vc: "" }],
    books: [], ict: [], research: [], patents: [], awards: [], confs: [], proposals: [], fdps: [], training: [],
    docs: { "jour-0": [{ name: "blockchain_paper.pdf", url: "#", type: "application/pdf" }] },
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const n = (v) => parseFloat(v) || 0;
const pct = (v, m) => Math.min(100, Math.round((v / m) * 100)) || 0;
const grade = (score, max) => {
  const p = (score / max) * 100;
  if (p >= 85) return { label: "Outstanding", color: "#059669", bg: "#d1fae5" };
  if (p >= 70) return { label: "Very Good",   color: "#0284c7", bg: "#dbeafe" };
  if (p >= 55) return { label: "Good",         color: "#7c3aed", bg: "#ede9fe" };
  if (p >= 40) return { label: "Satisfactory", color: "#d97706", bg: "#fef3c7" };
  return { label: "Needs Improvement", color: "#dc2626", bg: "#fee2e2" };
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function Avatar({ initials, color = "#b45309", size = 40 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: `linear-gradient(135deg,${color},${color}99)`, color: "#fff", fontWeight: 800, fontSize: size * 0.32, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, letterSpacing: 0.5 }}>
      {initials}
    </div>
  );
}
function ScoreBar({ score, max, color = "#b45309" }) {
  return (
    <div style={{ width: "100%", background: "#f1f5f9", borderRadius: 4, height: 5, overflow: "hidden" }}>
      <div style={{ width: `${pct(score, max)}%`, height: "100%", background: color, borderRadius: 4, transition: "width .5s" }} />
    </div>
  );
}
function StatusBadge({ status }) {
  const map = {
    "Dean Reviewed":   { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    "VC Reviewed":     { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
    "Pending VC Review": { bg: "#ede9fe", color: "#5b21b6", dot: "#7c3aed" },
  };
  const s = map[status] || map["Pending VC Review"];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, color: s.color, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}
function RO({ val, center }) {
  return <span style={{ fontSize: 11, fontFamily: "'Crimson Text', Georgia, serif", color: "#1e293b", display: "block", textAlign: center ? "center" : "left" }}>{val || <span style={{ color: "#cbd5e1" }}>—</span>}</span>;
}
function VCInput({ val, onChange }) {
  return (
    <input type="number" min="0" step="0.5" value={val}
      onChange={e => onChange(e.target.value)}
      style={{ width: 58, textAlign: "center", border: "1.5px solid #b45309", borderRadius: 5, padding: "3px 5px", fontSize: 11, fontFamily: "Georgia, serif", outline: "none", background: "#fffbf0" }}
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
          style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#b45309", fontSize: 10, textDecoration: "none", background: "#fffbf0", border: "1px solid #fde68a", borderRadius: 4, padding: "2px 7px", whiteSpace: "nowrap" }}
          title={f.name}>
          📄 {f.name.length > 16 ? f.name.slice(0, 16) + "…" : f.name}
        </a>
      ))}
    </div>
  );
}
function SC({ title, subtitle, accent = "#b45309", children }) {
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

// ─── Table style constants ─────────────────────────────────────────────────────
const T     = { width: "100%", borderCollapse: "collapse", fontSize: 11 };
const TH      = { border: "1px solid #cbd5e1", padding: "5px 7px", background: "#0f172a",  color: "#94a3b8",  fontWeight: 700, textAlign: "center", fontSize: 10 };
const TH_HOD  = { ...TH, background: "#312e81", color: "#c7d2fe" };
const TH_DIR  = { ...TH, background: "#0c4a6e", color: "#bae6fd" };
const TH_DEAN = { ...TH, background: "#4c1d95", color: "#ddd6fe" };
const TH_VC   = { ...TH, background: "#78350f", color: "#fde68a" };
const TD  = { border: "1px solid #e2e8f0", padding: "5px 7px", verticalAlign: "middle" };
const TDC = { ...TD, textAlign: "center" };
const TDS     = { ...TD, textAlign: "center", background: "#f8fafc", minWidth: 58 };
const TDS_HOD  = { ...TDS, background: "#f0f4ff" };
const TDS_DIR  = { ...TDS, background: "#f0fbff" };
const TDS_DEAN = { ...TDS, background: "#faf5ff" };
const TDS_VC   = { ...TDS, background: "#fffbf0" };
const TDV = { ...TD, background: "#fafbff", minWidth: 110 };

// ─── VC Review Form ───────────────────────────────────────────────────────────
// personMode: "dean" | "director" | "hod" | "faculty"
function VCReviewForm({ person, vcData, setVcData, personMode = "director" }) {
  const showHodCol  = personMode === "hod" || personMode === "faculty";
  const showDirCol  = personMode === "director" || personMode === "hod" || personMode === "faculty";
  const showDeanCol = true;

  const set = (section, idx, field, val) => {
    setVcData(prev => {
      const updated = { ...prev };
      if (!updated[section]) updated[section] = JSON.parse(JSON.stringify(person[section] || []));
      if (idx === null) updated[section] = { ...updated[section], [field]: val };
      else updated[section] = updated[section].map((r, i) => i === idx ? { ...r, [field]: val } : r);
      return updated;
    });
  };
  const setScalar = (key, val) => setVcData(prev => ({ ...prev, [key]: val }));
  const get = (section, idx, field) => {
    if (vcData[section]) {
      const s = vcData[section];
      return idx === null ? (s[field] ?? person[section]?.[field] ?? "") : (s[idx]?.[field] ?? person[section]?.[idx]?.[field] ?? "");
    }
    return idx === null ? (person[section]?.[field] ?? "") : (person[section]?.[idx]?.[field] ?? "");
  };
  const getS = (key) => vcData[key] ?? person[key] ?? "";
  const { docs } = person;
  const rows = (arr) => arr && arr.length > 0 ? arr : [{}];

  const deanScoreKey = personMode === "dean" ? "score" : "dean";

  const buildScoreHeaders = () => (
    <>
      {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
      {!showHodCol && personMode !== "dean" && <th style={TH}>Self Score</th>}
      {personMode === "dean" && <th style={TH}>Self Score</th>}
      {showDirCol && <th style={TH_DIR}>Dir Score</th>}
      {showDeanCol && <th style={TH_DEAN}>Dean Score</th>}
      <th style={TH_VC}>VC Score</th>
    </>
  );

  const buildScoreCells = (r, section, idx) => (
    <>
      {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
      {!showHodCol && personMode !== "dean" && <td style={TDS}><RO val={r.score} center /></td>}
      {personMode === "dean" && <td style={TDS}><RO val={r.score} center /></td>}
      {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
      {showDeanCol && <td style={TDS_DEAN}><RO val={r.dean || r[deanScoreKey]} center /></td>}
      <td style={TDS_VC}><VCInput val={get(section, idx, "vc")} onChange={v => set(section, idx, "vc", v)} /></td>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Mode banner */}
      <div style={{ background: `linear-gradient(90deg,#451a03,#92400e)`, color: "#fef3c7", borderRadius: 8, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
        <span style={{ fontSize: 18 }}>👁️</span>
        <div>
          <strong>VC Review Mode</strong> — All prior scores are read-only. Only the <span style={{ color: "#fde68a", fontWeight: 700 }}>VC Score</span> column is editable.
          {showHodCol && " HOD scores visible for reference."} {showDirCol && " Director scores visible for reference."} Dean scores shown for reference.
        </div>
      </div>

      {/* Personal Info */}
      <SC title="Personal Information" accent="#b45309">
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

      <div style={{ fontWeight: 800, fontSize: 13, color: "#1e293b", background: "#fef3c7", padding: "8px 14px", borderRadius: 6, marginBottom: 10 }}>PART A — Teaching & Academic Activities</div>

      {/* A1 Lectures */}
      <SC title="A1. Lectures / Tutorials / Practicals (Max 50)" accent="#b45309">
        <div style={{ overflowX: "auto" }}>
          <table style={T}><thead><tr>
            <th style={TH}>SN</th><th style={TH}>Semester</th><th style={TH}>Course</th>
            <th style={TH}>Planned</th><th style={TH}>Conducted</th><th style={TH}>Docs</th>
            {buildScoreHeaders()}
          </tr></thead>
          <tbody>{rows(person.lectures).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.sem} /></td><td style={TD}><RO val={r.code} /></td>
              <td style={TDC}><RO val={r.planned} center /></td><td style={TDC}><RO val={r.conducted} center /></td>
              <td style={TDV}><ViewDocsCell docKey={`lec-${i}`} docs={docs} /></td>
              {buildScoreCells(r, "lectures", i)}
            </tr>
          ))}</tbody></table>
        </div>
      </SC>

      {/* A2 Course File */}
      <SC title="A2. Course File (Max 20)" accent="#b45309">
        <table style={T}><thead><tr>
          <th style={TH}>Course</th><th style={TH}>Title</th><th style={TH}>Details</th><th style={TH}>Docs</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>Dir Score</th>}
          <th style={TH_DEAN}>Dean Score</th>
          <th style={TH_VC}>VC Score</th>
        </tr></thead>
        <tbody><tr>
          <td style={TD}><RO val={person.courseFile?.course} /></td>
          <td style={TD}><RO val={person.courseFile?.title} /></td>
          <td style={TDC}><RO val={person.courseFile?.details} center /></td>
          <td style={TDV}><ViewDocsCell docKey="cf-0" docs={docs} /></td>
          {showHodCol && <><td style={TDS}><RO val={person.courseFile?.score} center /></td><td style={TDS_HOD}><RO val={person.courseFile?.hod} center /></td></>}
          {!showHodCol && <td style={TDS}><RO val={person.courseFile?.score} center /></td>}
          {showDirCol && <td style={TDS_DIR}><RO val={person.courseFile?.director} center /></td>}
          <td style={TDS_DEAN}><RO val={person.courseFile?.dean || person.courseFile?.score} center /></td>
          <td style={TDS_VC}><VCInput val={get("courseFile", null, "vc")} onChange={v => set("courseFile", null, "vc", v)} /></td>
        </tr></tbody></table>
      </SC>

      {/* A3 Innovative */}
      <SC title="A3. Innovative Teaching-Learning (Max 10)" accent="#b45309">
        <table style={T}><thead><tr>
          <th style={TH}>Method</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>Dir Score</th>}
          <th style={TH_DEAN}>Dean Score</th>
          <th style={TH_VC}>VC Score</th>
        </tr></thead>
        <tbody><tr>
          <td style={TD}>Innovative / participatory teaching methods used</td>
          {showHodCol && <><td style={TDS}><RO val={person.innovScore} center /></td><td style={TDS_HOD}><RO val={person.innovHod} center /></td></>}
          {!showHodCol && <td style={TDS}><RO val={person.innovScore} center /></td>}
          {showDirCol && <td style={TDS_DIR}><RO val={person.innovDir} center /></td>}
          <td style={TDS_DEAN}><RO val={person.innovDean} center /></td>
          <td style={TDS_VC}><VCInput val={getS("innovVC")} onChange={v => setScalar("innovVC", v)} /></td>
        </tr></tbody></table>
      </SC>

      {/* A4–A5 Projects & Quals */}
      {[
        ["A4. Projects (Max 10)", "projects", "proj"],
        ["A5. Qualification Enhancement (Max 10)", "quals", "qual"],
      ].map(([title, key, docPfx]) => (
        <SC key={key} title={title} accent="#b45309">
          <table style={T}><thead><tr>
            <th style={TH}>SN</th><th style={TH}>Description</th><th style={TH}>Docs</th>
            {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
            {!showHodCol && <th style={TH}>Self Score</th>}
            {showDirCol && <th style={TH_DIR}>Dir Score</th>}
            <th style={TH_DEAN}>Dean Score</th>
            <th style={TH_VC}>VC Score</th>
          </tr></thead>
          <tbody>{rows(person[key]).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td>
              <td style={TD}><RO val={r.label} /></td>
              <td style={TDV}><ViewDocsCell docKey={`${docPfx}-${i}`} docs={docs} /></td>
              {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
              {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
              {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
              <td style={TDS_DEAN}><RO val={r.dean || r.score} center /></td>
              <td style={TDS_VC}><VCInput val={get(key, i, "vc")} onChange={v => set(key, i, "vc", v)} /></td>
            </tr>
          ))}</tbody></table>
        </SC>
      ))}

      {/* B Feedback */}
      <SC title="B. Student Feedback (Max 10)" accent="#b45309">
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Course</th><th style={TH}>FB1</th><th style={TH}>FB2</th><th style={TH}>Avg</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>Dir Score</th>}
          <th style={TH_DEAN}>Dean Score</th>
          <th style={TH_VC}>VC Score</th>
        </tr></thead>
        <tbody>{rows(person.feedback).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.code} /></td>
            <td style={TDC}><RO val={r.fb1} center /></td><td style={TDC}><RO val={r.fb2} center /></td>
            <td style={{ ...TDC, fontWeight: 700, color: "#b45309" }}>{r.fb1 && r.fb2 ? ((n(r.fb1) + n(r.fb2)) / 2).toFixed(2) : "—"}</td>
            {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
            {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_DEAN}><RO val={r.dean || r.score} center /></td>
            <td style={TDS_VC}><VCInput val={get("feedback", i, "vc")} onChange={v => set("feedback", i, "vc", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* C–F Activities */}
      {[
        ["C. Departmental Activities (Max 20)", "deptActs", "#d97706", ["Activity", "Nature"], ["activity", "nature"], "dept"],
        ["D. University Activities (Max 30)", "uniActs", "#d97706", ["Activity", "Nature"], ["activity", "nature"], "uni"],
        ["E. Contribution to Society (Max 10)", "society", "#059669", ["Activity", "Details"], ["label", "details"], "soc"],
        ["F. Industry Connect (Max 5)", "industry", "#059669", ["Industry", "Details"], ["name", "details"], "ind"],
      ].map(([title, key, accent2, cols, fields, docPfx]) => (
        <SC key={key} title={title} accent={accent2}>
          <table style={T}><thead><tr>
            <th style={TH}>SN</th>
            {cols.map(c => <th key={c} style={TH}>{c}</th>)}
            <th style={TH}>Docs</th>
            {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
            {!showHodCol && <th style={TH}>Self Score</th>}
            {showDirCol && <th style={TH_DIR}>Dir Score</th>}
            <th style={TH_DEAN}>Dean Score</th>
            <th style={TH_VC}>VC Score</th>
          </tr></thead>
          <tbody>{rows(person[key]).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td>
              {fields.map(f => <td key={f} style={TD}><RO val={r[f]} /></td>)}
              <td style={TDV}><ViewDocsCell docKey={`${docPfx}-${i}`} docs={docs} /></td>
              {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
              {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
              {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
              <td style={TDS_DEAN}><RO val={r.dean || r.score} center /></td>
              <td style={TDS_VC}><VCInput val={get(key, i, "vc")} onChange={v => set(key, i, "vc", v)} /></td>
            </tr>
          ))}</tbody></table>
        </SC>
      ))}

      {/* G ACR */}
      <SC title="G. Annual Confidential Report (Max 25)" accent="#ef4444">
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Parameter</th>
          {showHodCol && <th style={TH_HOD}>HOD Score</th>}
          {showDirCol && <th style={TH_DIR}>Dir Score</th>}
          <th style={TH_DEAN}>Dean Score</th>
          <th style={TH_VC}>VC Score</th>
        </tr></thead>
        <tbody>{rows(person.acr).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td>
            <td style={TD}><RO val={r.label} /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_DEAN}><RO val={r.dean} center /></td>
            <td style={TDS_VC}><VCInput val={get("acr", i, "vc")} onChange={v => set("acr", i, "vc", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      <div style={{ fontWeight: 800, fontSize: 13, color: "#1e293b", background: "#fef3c7", padding: "8px 14px", borderRadius: 6, marginBottom: 10 }}>PART B — Research & Academic Contributions</div>

      {/* B1 Journals */}
      <SC title="B1. Research Papers / Journal Publications (Max 120)" accent="#b45309">
        <div style={{ overflowX: "auto" }}><table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Title</th><th style={TH}>Journal</th>
          <th style={TH}>ISSN</th><th style={TH}>Index</th><th style={TH}>Docs</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>Dir Score</th>}
          <th style={TH_DEAN}>Dean Score</th>
          <th style={TH_VC}>VC Score</th>
        </tr></thead>
        <tbody>{rows(person.journals).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.title} /></td><td style={TD}><RO val={r.journal} /></td>
            <td style={TDC}><RO val={r.issn} center /></td><td style={TDC}><RO val={r.index} center /></td>
            <td style={TDV}><ViewDocsCell docKey={`jour-${i}`} docs={docs} /></td>
            {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
            {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_DEAN}><RO val={r.dean || r.score} center /></td>
            <td style={TDS_VC}><VCInput val={get("journals", i, "vc")} onChange={v => set("journals", i, "vc", v)} /></td>
          </tr>
        ))}</tbody></table></div>
      </SC>

      {/* B2–B8 */}
      {[
        { title: "B2. Books / Book Chapters (Max 50)", key: "books", docPfx: "book",
          render: (r) => [r.title, r.book, r.issn, r.first] },
        { title: "B3. ICT / E-Content (Max 20)", key: "ict", docPfx: "ict",
          render: (r) => [r.title, r.type, r.quad] },
        { title: "B4. Research Guidance (Max 30)", key: "research", docPfx: "res",
          render: (r) => [r.degree, r.name, r.thesis] },
        { title: "B5a. Patents / IPR (Max 40)", key: "patents", docPfx: "pat",
          render: (r) => [r.title, r.type, r.date, r.status, r.fileNo] },
        { title: "B5b. Awards / Fellowships (Max 10)", key: "awards", docPfx: "awd",
          render: (r) => [r.title, r.date, r.agency, r.level] },
        { title: "B6. Conferences (Max 30)", key: "confs", docPfx: "conf",
          render: (r) => [r.title, r.type, r.org, r.level] },
        { title: "B7. Research Proposals (Max 20)", key: "proposals", docPfx: "prop",
          render: (r) => [r.title, r.duration, r.agency, r.amount] },
        { title: "B8. Self Development — FDP (Max 10)", key: "fdps", docPfx: "fdp",
          render: (r) => [r.program, r.duration, r.org] },
      ].map(({ title, key, docPfx, render }) => (
        <SC key={key} title={title} accent="#b45309">
          <div style={{ overflowX: "auto" }}><table style={T}><thead>
            <tr>
              <th style={TH}>SN</th><th style={TH}>Details</th><th style={TH}>Docs</th>
              {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
              {!showHodCol && <th style={TH}>Self Score</th>}
              {showDirCol && <th style={TH_DIR}>Dir Score</th>}
              <th style={TH_DEAN}>Dean Score</th>
              <th style={TH_VC}>VC Score</th>
            </tr>
          </thead>
          <tbody>{rows(person[key]).map((r, i) => {
            const cells = render(r);
            return (
              <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
                <td style={TDC}>{i + 1}</td>
                <td style={TD}>
                  {cells.filter(Boolean).map((c, ci) => (
                    <span key={ci} style={{ display: "inline-block", marginRight: 8, color: "#334155" }}>{c}</span>
                  ))}
                </td>
                <td style={TDV}><ViewDocsCell docKey={`${docPfx}-${i}`} docs={docs} /></td>
                <td style={TDS}><RO val={r.score} center /></td>
                {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
                {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
                <td style={TDS_DEAN}><RO val={r.dean || r.score} center /></td>
                <td style={TDS_VC}><VCInput val={get(key, i, "vc")} onChange={v => set(key, i, "vc", v)} /></td>
              </tr>
            );
          })}</tbody></table></div>
        </SC>
      ))}
    </div>
  );
}

// ─── Score Calculator ─────────────────────────────────────────────────────────
function calcVCScore(person, vcData) {
  const get = (section, idx, field) => {
    if (vcData[section]) {
      const s = vcData[section];
      return idx === null ? n(s[field]) : n(s[idx]?.[field]);
    }
    return idx === null ? n(person[section]?.[field]) : n(person[section]?.[idx]?.[field]);
  };
  const getS = (key) => n(vcData[key] ?? person[key]);
  const sum = (arr, s, f) => (arr || []).reduce((a, _, i) => a + get(s, i, f), 0);

  const partA = sum(person.lectures, "lectures", "vc") + get("courseFile", null, "vc") +
    getS("innovVC") + sum(person.projects, "projects", "vc") +
    sum(person.quals, "quals", "vc") + sum(person.feedback, "feedback", "vc") +
    sum(person.deptActs, "deptActs", "vc") + sum(person.uniActs, "uniActs", "vc") +
    sum(person.society, "society", "vc") + sum(person.industry, "industry", "vc") +
    sum(person.acr, "acr", "vc");

  const partB = sum(person.journals, "journals", "vc") + sum(person.books, "books", "vc") +
    sum(person.ict, "ict", "vc") + sum(person.research, "research", "vc") +
    sum(person.patents, "patents", "vc") + sum(person.awards, "awards", "vc") +
    sum(person.confs, "confs", "vc") + sum(person.proposals, "proposals", "vc") +
    sum(person.fdps, "fdps", "vc") + sum(person.training || [], "training", "vc");

  return { partA, partB, total: partA + partB };
}

// ─── Analytics Overview ───────────────────────────────────────────────────────
function AnalyticsPanel({ deans, directors, hods, faculty }) {
  const all = [
    ...deans.map(d => ({ ...d, role: "Dean" })),
    ...directors.map(d => ({ ...d, role: "Director" })),
    ...hods.map(h => ({ ...h, role: "HOD" })),
    ...faculty.map(f => ({ ...f, role: "Faculty" })),
  ];

  const reviewed = all.filter(p => p.vcTotal > 0);
  const pending  = all.filter(p => !p.vcTotal);
  const avgScore = reviewed.length ? (reviewed.reduce((a, p) => a + (p.vcTotal || p.deanTotal || 0), 0) / reviewed.length).toFixed(1) : "—";

  const roleStats = ["Dean", "Director", "HOD", "Faculty"].map(role => ({
    role,
    count: all.filter(p => p.role === role).length,
    approved: all.filter(p => p.role === role && p.vcTotal > 0).length,
  }));

  const topPerformers = [...all].sort((a, b) => (b.vcTotal || b.deanTotal || 0) - (a.vcTotal || a.deanTotal || 0)).slice(0, 5);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.5 }}>University Analytics</h1>
      <p style={{ margin: "0 0 8px", color: "#64748b", fontSize: 11 }}>DYPIU · AY {VC_USER.ay} — VC-level overview</p>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
        {[
          { label: "Total Records", val: all.length, icon: "📋", color: "#0f172a" },
          { label: "VC Reviewed", val: reviewed.length, icon: "✅", color: "#059669" },
          { label: "Pending VC", val: pending.length, icon: "⏳", color: "#d97706" },
          { label: "Avg VC Score", val: avgScore, sub: "/575", icon: "📊", color: "#b45309" },
        ].map(({ label, val, icon, color, sub }) => (
          <div key={label} style={{ background: "#fff", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.07)", borderTop: `3px solid ${color}` }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 26, fontWeight: 800, color }}>
              {val}<span style={{ fontSize: 13, color: "#94a3b8" }}>{sub}</span>
            </div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {/* Role Breakdown */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
          <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 14, fontSize: 13 }}>Approval by Role</div>
          {roleStats.map(({ role, count, approved }) => (
            <div key={role} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{role}</span>
                <span style={{ fontSize: 11, color: "#64748b" }}>{approved}/{count} approved</span>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: 4, height: 8, overflow: "hidden" }}>
                <div style={{ width: `${count ? (approved / count) * 100 : 0}%`, height: "100%", background: "#b45309", borderRadius: 4, transition: "width .6s" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Top Performers */}
        <div style={{ background: "#fff", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
          <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 14, fontSize: 13 }}>Top Performers (All Roles)</div>
          {topPerformers.map((p, i) => {
            const score = p.vcTotal || p.deanTotal || p.directorTotal || 0;
            const g = grade(score, 575);
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? "#fbbf24" : i === 1 ? "#94a3b8" : i === 2 ? "#d97706" : "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 10, color: "#fff", flexShrink: 0 }}>{i + 1}</div>
                <Avatar initials={p.avatar} color={p.avatarColor || "#b45309"} size={28} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "#94a3b8" }}>{p.role} · {p.department || "Office"}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: g.color }}>{score}</div>
                  <div style={{ fontSize: 9, color: "#94a3b8" }}>{g.label}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grade distribution */}
      <div style={{ background: "#fff", borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,.07)" }}>
        <div style={{ fontWeight: 700, color: "#0f172a", marginBottom: 14, fontSize: 13 }}>Grade Distribution (All Reviewed)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10 }}>
          {[
            { label: "Outstanding", min: 85, color: "#059669", bg: "#d1fae5" },
            { label: "Very Good",   min: 70, color: "#0284c7", bg: "#dbeafe" },
            { label: "Good",        min: 55, color: "#7c3aed", bg: "#ede9fe" },
            { label: "Satisfactory",min: 40, color: "#d97706", bg: "#fef3c7" },
            { label: "Needs Imp.",  min: 0,  color: "#dc2626", bg: "#fee2e2" },
          ].map(({ label, min, color, bg }) => {
            const count = all.filter(p => {
              const s = p.vcTotal || p.deanTotal || p.directorTotal || 0;
              const pct2 = (s / 575) * 100;
              return pct2 >= min && (min === 0 ? pct2 < 40 : true) && (min === 85 || pct2 < (min === 70 ? 85 : min === 55 ? 70 : min === 40 ? 55 : 85));
            }).length;
            return (
              <div key={label} style={{ background: bg, borderRadius: 8, padding: "14px", textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color }}>{count}</div>
                <div style={{ fontSize: 10, color, fontWeight: 700, marginTop: 4 }}>{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Review Panel ─────────────────────────────────────────────────────────────
function VCReviewPanel({ person, personMode, onBack, onSubmit }) {
  const [vcData, setVcData] = useState({});
  const [remarks, setRemarks] = useState(person.vcRemarks || "");
  const [tab, setTab] = useState("form");

  const { partA, partB, total } = calcVCScore(person, vcData);
  const g = grade(total, 575);

  const dirTotal  = person.directorTotal || person.directorScore || 0;
  const hodTotal  = person.hodTotal || person.hodScore || 0;
  const deanTotal = person.deanTotal || person.deanSelfScore || 0;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16, borderRadius: 10 }}>
        <button onClick={onBack} style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontFamily: "Georgia, serif" }}>← Back</button>
        <Avatar initials={person.avatar} color={person.avatarColor || "#b45309"} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>{person.name}</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>{person.designation} · {person.employeeId}</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {personMode === "faculty" && hodTotal > 0 && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase" }}>HOD</div>
              <div style={{ color: "#818cf8", fontWeight: 800, fontSize: 14 }}>{hodTotal}</div>
            </div>
          )}
          {(personMode === "faculty" || personMode === "hod") && dirTotal > 0 && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase" }}>Dir</div>
              <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 14 }}>{dirTotal}</div>
            </div>
          )}
          {personMode === "director" && dirTotal > 0 && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase" }}>Dir Self</div>
              <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 14 }}>{dirTotal}</div>
            </div>
          )}
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase" }}>Dean</div>
            <div style={{ color: "#c4b5fd", fontWeight: 800, fontSize: 14 }}>{deanTotal}</div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase" }}>VC A</div>
            <div style={{ color: "#fde68a", fontWeight: 800, fontSize: 14 }}>{partA.toFixed(1)}</div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase" }}>VC B</div>
            <div style={{ color: "#fbbf24", fontWeight: 800, fontSize: 14 }}>{partB.toFixed(1)}</div>
          </div>
          <div style={{ background: g.bg, border: `2px solid ${g.color}40`, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: g.color, fontSize: 9, textTransform: "uppercase", fontWeight: 700 }}>VC Total</div>
            <div style={{ color: g.color, fontWeight: 800, fontSize: 14 }}>{total.toFixed(1)}<span style={{ fontSize: 10, color: "#94a3b8" }}>/575</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["form", "📋 Review Form"], ["remarks", "✏️ Remarks & Submit"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ padding: "7px 18px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, background: tab === id ? "#78350f" : "#e2e8f0", color: tab === id ? "#fde68a" : "#475569" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "form" && (
        <VCReviewForm person={person} vcData={vcData} setVcData={setVcData} personMode={personMode} />
      )}

      {tab === "remarks" && (
        <div style={{ background: "#fff", borderRadius: 10, padding: "22px 24px", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
          <h3 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: 15 }}>VC Remarks & Final Submission</h3>

          {/* Remarks chain */}
          {person.hodRemarks && (
            <div style={{ background: "#f0f4ff", border: "1px solid #c7d2fe", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4338ca", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>HOD Remarks</div>
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>{person.hodRemarks}</div>
            </div>
          )}
          {person.directorRemarks && (
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#0369a1", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Director Remarks</div>
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>{person.directorRemarks}</div>
            </div>
          )}
          {person.deanRemarks && (
            <div style={{ background: "#faf5ff", border: "1px solid #ddd6fe", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#6d28d9", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Dean Remarks</div>
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>{person.deanRemarks}</div>
            </div>
          )}

          {/* Score summary */}
          <table style={{ ...T, marginBottom: 18 }}>
            <thead><tr>
              <th style={TH}>Section</th><th style={TH}>Max</th>
              {(personMode === "hod" || personMode === "faculty") && <th style={TH_HOD}>HOD Score</th>}
              {(personMode !== "dean") && <th style={TH_DIR}>Director Score</th>}
              <th style={TH_DEAN}>Dean Score</th>
              <th style={TH_VC}>VC Score</th>
            </tr></thead>
            <tbody>
              {[["Part A — Teaching & Activities", 200, partA], ["Part B — Research & Contributions", 375, partB]].map(([l, m, v]) => (
                <tr key={l}>
                  <td style={TD}>{l}</td><td style={TDC}>{m}</td>
                  {(personMode === "hod" || personMode === "faculty") && <td style={TDS_HOD}>{hodTotal ? (hodTotal / 2).toFixed(0) : "—"}</td>}
                  {personMode !== "dean" && <td style={TDS_DIR}>{dirTotal ? (dirTotal / 2).toFixed(0) : "—"}</td>}
                  <td style={TDS_DEAN}>{deanTotal ? (deanTotal / 2).toFixed(0) : "—"}</td>
                  <td style={{ ...TDS_VC, fontWeight: 700, color: "#78350f" }}>{v.toFixed(1)}</td>
                </tr>
              ))}
              <tr style={{ background: "#fef3c7", fontWeight: 700 }}>
                <td style={TD}>Grand Total</td><td style={TDC}>575</td>
                {(personMode === "hod" || personMode === "faculty") && <td style={TDS_HOD}>{hodTotal}</td>}
                {personMode !== "dean" && <td style={TDS_DIR}>{dirTotal}</td>}
                <td style={TDS_DEAN}>{deanTotal}</td>
                <td style={{ ...TDS_VC, color: "#78350f", fontSize: 14 }}>{total.toFixed(1)}</td>
              </tr>
              <tr style={{ background: g.bg }}>
                <td style={TD} colSpan={6}><strong>Grade</strong></td>
                <td style={{ ...TDC, color: g.color, fontWeight: 800 }}>{g.label}</td>
              </tr>
            </tbody>
          </table>

          <label style={{ fontWeight: 700, fontSize: 13, color: "#334155", display: "block", marginBottom: 6 }}>VC Remarks</label>
          <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={4}
            placeholder="Enter your Vice Chancellor-level remarks, final endorsement, and recommendations..."
            style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 7, padding: "10px 12px", fontSize: 12, fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onBack} style={{ padding: "9px 22px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "Georgia, serif" }}>Cancel</button>
            <button onClick={() => onSubmit(person.id, total, remarks, personMode)}
              style={{ padding: "10px 28px", background: "#78350f", color: "#fef3c7", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}>
              ✔ Submit VC Final Approval
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Person Card ──────────────────────────────────────────────────────────────
function PersonCard({ person, personMode, onReview }) {
  const g = grade(person.vcTotal || person.deanTotal || person.directorTotal || 300, 575);
  const docCount = Object.values(person.docs || {}).reduce((a, arr) => a + arr.length, 0);
  const isVCReviewed = person.status === "VC Reviewed";

  const scoreRows = [];
  if (personMode === "faculty") scoreRows.push({ label: "HOD Score",  val: person.hodTotal || 0,       color: "#6366f1" });
  if (personMode !== "dean")    scoreRows.push({ label: "Dir Score",  val: person.directorTotal || person.directorScore || 0, color: "#0ea5e9" });
  scoreRows.push({ label: "Dean Score", val: person.deanTotal || person.deanSelfScore || 0, color: "#7c3aed" });
  scoreRows.push({ label: "VC Score",   val: person.vcTotal || 0,       color: "#b45309" });
  scoreRows.push({ label: "Docs",       val: docCount,                  color: "#10b981", noBar: true });

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,.07)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar initials={person.avatar} color={person.avatarColor || "#b45309"} size={46} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{person.name}</div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>{person.designation}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>{person.employeeId}</div>
          {person.department && <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{person.department}</div>}
        </div>
        <StatusBadge status={person.status} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: `repeat(${scoreRows.length},1fr)`, gap: 10, background: "#f8fafc", borderRadius: 8, padding: "12px 14px" }}>
        {scoreRows.map(({ label, val, color, noBar }) => (
          <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color, lineHeight: 1 }}>
              {typeof val === "number" ? val.toFixed(0) : val}
              {!noBar && <span style={{ fontSize: 9, color: "#94a3b8" }}>/575</span>}
            </div>
            {!noBar && <ScoreBar score={val} max={575} color={color} />}
            {noBar && <div style={{ fontSize: 9, color: "#94a3b8" }}>files</div>}
          </div>
        ))}
      </div>

      {/* Remarks chain preview */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {person.directorRemarks && (
          <div style={{ background: "#f0f9ff", borderRadius: 6, padding: "7px 10px", fontSize: 11, color: "#0369a1", lineHeight: 1.5, borderLeft: "3px solid #38bdf8" }}>
            <span style={{ fontWeight: 700 }}>Director: </span>{person.directorRemarks.slice(0, 55)}{person.directorRemarks.length > 55 ? "…" : ""}
          </div>
        )}
        {person.deanRemarks && (
          <div style={{ background: "#faf5ff", borderRadius: 6, padding: "7px 10px", fontSize: 11, color: "#6d28d9", lineHeight: 1.5, borderLeft: "3px solid #a78bfa" }}>
            <span style={{ fontWeight: 700 }}>Dean: </span>{person.deanRemarks.slice(0, 55)}{person.deanRemarks.length > 55 ? "…" : ""}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
        <div style={{ fontSize: 10, color: "#94a3b8" }}>Submitted: {person.submittedOn}</div>
        <button onClick={() => onReview(person, personMode)}
          style={{ fontSize: 11, padding: "7px 18px", background: isVCReviewed ? "#1e293b" : "#78350f", color: isVCReviewed ? "#e2e8f0" : "#fde68a", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontFamily: "Georgia, serif" }}>
          {isVCReviewed ? "✎ Edit VC Review" : "👁️ VC Review & Approve →"}
        </button>
      </div>
    </div>
  );
}

// ─── Main VC Dashboard ────────────────────────────────────────────────────────
export default function VCDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab]   = useState("analytics");
  const [reviewing, setReviewing]   = useState(null);
  const [deanList,  setDeanList]    = useState(DEAN_LIST);
  const [dirList,   setDirList]     = useState(DIRECTOR_LIST_VC);
  const [hodList,   setHodList]     = useState(HOD_LIST_VC);
  const [facList,   setFacList]     = useState(FACULTY_LIST_VC);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const pendingDeans = deanList.filter(d => d.status !== "VC Reviewed").length;
  const pendingDirs  = dirList.filter(d => d.status !== "VC Reviewed").length;
  const pendingHods  = hodList.filter(h => h.status !== "VC Reviewed").length;
  const pendingFacs  = facList.filter(f => f.status !== "VC Reviewed").length;
  const totalPending = pendingDeans + pendingDirs + pendingHods + pendingFacs;

  const handleSubmit = (id, total, remarks, personMode) => {
    const update = (list, setter) => setter(prev => prev.map(p => p.id === id ? { ...p, status: "VC Reviewed", vcTotal: total, vcRemarks: remarks } : p));
    if (personMode === "dean")     update(deanList, setDeanList);
    else if (personMode === "director") update(dirList, setDirList);
    else if (personMode === "hod") update(hodList, setHodList);
    else if (personMode === "faculty") update(facList, setFacList);
    setReviewing(null);
  };

  const currentList = activeTab === "deans" ? deanList : activeTab === "directors" ? dirList : activeTab === "hods" ? hodList : facList;
  const filterOptions = activeTab === "deans"
    ? ["All", "Pending VC Review", "VC Reviewed"]
    : ["All", "Dean Reviewed", "VC Reviewed"];

  const filtered = filterStatus === "All" ? currentList : currentList.filter(p => p.status === filterStatus);
  const personModeFor = (tab) => tab === "deans" ? "dean" : tab === "directors" ? "director" : tab === "hods" ? "hod" : "faculty";

  const NAV = [
    { id: "analytics",  icon: "📊", label: "Analytics",          sub: "University-wide overview" },
    { id: "deans",      icon: "🎓", label: "Dean Reviews",        sub: `${pendingDeans} awaiting VC`,  badge: pendingDeans },
    { id: "directors",  icon: "🏛️", label: "Director Reviews",   sub: `${pendingDirs} awaiting VC`,   badge: pendingDirs },
    { id: "hods",       icon: "👥", label: "HOD Reviews",         sub: `${pendingHods} awaiting VC`,   badge: pendingHods },
    { id: "faculty",    icon: "📋", label: "Faculty Reviews",     sub: `${pendingFacs} awaiting VC`,   badge: pendingFacs },
  ];

  const tabLabel = activeTab === "deans" ? "Dean Reviews" : activeTab === "directors" ? "Director Reviews" : activeTab === "hods" ? "HOD Reviews" : "Faculty Reviews";

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Georgia, serif", background: "#f5f0eb", color: "#1e293b" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 258, minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", padding: "20px 16px", gap: 14, position: "sticky", top: 0, alignSelf: "flex-start", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,#78350f,#b45309)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fef3c7", fontWeight: 800, fontSize: 13 }}>FA</div>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13 }}>FacultyAppraise</div>
            <div style={{ color: "#475569", fontSize: 9 }}>D Y Patil International University</div>
          </div>
        </div>

        {/* VC Role badge */}
        <div style={{ background: "#451a03", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#fde68a", border: "1px solid #78350f" }}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>Vice Chancellor</div>
          <div style={{ color: "#a16207", fontSize: 10 }}>Final approval authority</div>
        </div>

        {/* Total pending alert */}
        {totalPending > 0 && (
          <div style={{ background: "#7f1d1d", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#fca5a5", border: "1px solid #991b1b" }}>
            <div style={{ fontWeight: 700 }}>⏳ {totalPending} Pending VC</div>
            <div style={{ fontSize: 10, color: "#f87171", marginTop: 2 }}>Awaiting your approval</div>
          </div>
        )}

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
              <div style={{ background: "#b45309", color: "#fef3c7", fontWeight: 800, fontSize: 10, minWidth: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{tab.badge}</div>
            )}
          </button>
        ))}

        {/* Legend */}
        <div style={{ marginTop: 4, background: "#1e293b", borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Score Columns Legend</div>
          {[
            { color: "#818cf8", label: "HOD Score" },
            { color: "#38bdf8", label: "Director Score" },
            { color: "#a78bfa", label: "Dean Score" },
            { color: "#fbbf24", label: "VC Score (you)" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
              <div style={{ fontSize: 10, color: "#94a3b8" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <div style={{ height: 1, background: "#1e293b" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar initials={VC_USER.avatar} color="#b45309" size={34} />
          <div>
            <div style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 700 }}>{VC_USER.name.split(" ").slice(0, 2).join(" ")}</div>
            <div style={{ color: "#475569", fontSize: 9 }}>Vice Chancellor · DYPIU</div>
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
      <main style={{ flex: 1, padding: "24px 28px", display: "flex", flexDirection: "column", gap: 16, overflowX: "auto" }}>

        {/* ANALYTICS */}
        {activeTab === "analytics" && (
          <AnalyticsPanel deans={deanList} directors={dirList} hods={hodList} faculty={facList} />
        )}

        {/* LIST VIEWS */}
        {activeTab !== "analytics" && !reviewing && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.5 }}>{tabLabel}</h1>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 11 }}>DYPIU · AY {VC_USER.ay} — VC Final Approval</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "#fef3c7", color: "#92400e" }}>
                  ⏳ {filtered.filter(p => p.status !== "VC Reviewed").length} Pending
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "#d1fae5", color: "#065f46" }}>
                  ✔ {filtered.filter(p => p.status === "VC Reviewed").length} VC Approved
                </div>
              </div>
            </div>

            {/* Filter */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "#fff", borderRadius: 9, boxShadow: "0 1px 4px rgba(0,0,0,.05)" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>Filter:</span>
              {filterOptions.map(f => (
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
                  personMode={personModeFor(activeTab)}
                  onReview={(p, m) => setReviewing({ person: p, personMode: m })}
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

        {/* VC REVIEW PANEL */}
        {reviewing && (
          <VCReviewPanel
            person={reviewing.person}
            personMode={reviewing.personMode}
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
