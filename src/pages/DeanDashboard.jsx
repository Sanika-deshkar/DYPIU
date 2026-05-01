import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const DEAN_USER = {
  name: "Prof. Anand Krishnamurthy", employeeId: "DYPIU-DEAN-0001",
  designation: "Dean of Academics",
  department: "Office of the Dean",
  school: "D Y Patil International University", ay: "2025-2026", avatar: "AK",
};

// Directors under this Dean (each director has reviewed HODs and faculty)
const DIRECTOR_LIST = [
  {
    id: 301, name: "Prof. Suresh Patil", employeeId: "DYPIU-DIR-0005",
    designation: "Director / Dean", department: "School of Engineering & Management Research",
    submittedOn: "2025-04-28", status: "Pending Dean Review",
    avatar: "SP", avatarColor: "#6366f1",
    directorScore: 420,
    info: { name: "Prof. Suresh Patil", qual: "Ph.D., D.Sc. (Mechanical)", desig: "Director / Dean", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "ME601 / Advanced Manufacturing", planned: "40", conducted: "39", score: "20", director: "20", dean: "" }],
    courseFile: { course: "ME601", title: "Advanced Manufacturing", details: "Yes", score: "18", director: "18", dean: "" },
    innovScore: "9", innovDir: "9", innovDean: "",
    projects: [
      { label: "Project guided (3/batch)", score: "5", director: "5", dean: "" },
      { label: "Industrial collaboration", score: "5", director: "5", dean: "" },
      { label: "Award received", score: "4", director: "4", dean: "" },
      { label: "Project outcome", score: "4", director: "4", dean: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", director: "5", dean: "" }, { label: "Certification", score: "5", director: "5", dean: "" }],
    feedback: [{ code: "ME601", fb1: "4.7", fb2: "4.8", score: "9.5", director: "9.5", dean: "" }],
    deptActs: [{ activity: "School Administration", nature: "Director", score: "20", director: "20", dean: "" }],
    uniActs: [{ activity: "University Academic Council", nature: "Member", score: "30", director: "30", dean: "" }],
    society: [{ label: "Industry Connect Summit", details: "Organised annual summit", score: "5", director: "5", dean: "" }],
    industry: [{ name: "Tata Motors", details: "Joint Research MOU", score: "5", director: "5", dean: "" }],
    acr: [
      { label: "Leadership and Vision", director: "24", dean: "" },
      { label: "Research Output", director: "23", dean: "" },
      { label: "Institutional Development", director: "25", dean: "" },
      { label: "Industry Interface", director: "22", dean: "" },
      { label: "Compliance & Reporting", director: "20", dean: "" },
    ],
    journals: [{ title: "Smart Manufacturing using AI", journal: "CIRP Annals", issn: "0007-8506", index: "SCI", score: "40", director: "40", dean: "" }],
    books: [{ title: "Manufacturing Systems Engineering", book: "Springer, 2024", issn: "978-3-031", pub: "International", coauth: "0", first: "Yes", score: "30", director: "30", dean: "" }],
    ict: [{ title: "Advanced Manufacturing MOOC", desc: "NPTEL certified", type: "E-Content", quad: "4", score: "18", director: "18", dean: "" }],
    research: [{ degree: "PhD", name: "Mihir Shah", thesis: "Awarded 2024-08-20", score: "25", director: "25", dean: "" }],
    patents: [{ title: "Self-Healing Smart Composite", type: "International", date: "2024-06-10", status: "Granted", fileNo: "PCT/IN2024/050456", score: "35", director: "35", dean: "" }],
    awards: [{ title: "Distinguished Educator Award", date: "2025-01-15", agency: "ISTE", level: "National", score: "10", director: "10", dean: "" }],
    confs: [{ title: "Future of Manufacturing", type: "Keynote", org: "AIMTDR 2024", level: "International", score: "20", director: "20", dean: "" }],
    proposals: [{ title: "Industry 4.0 Smart Factory", duration: "3 Years", agency: "DST-SERB", amount: "75 Lakhs", score: "18", director: "18", dean: "" }],
    fdps: [{ program: "Leadership Development Program", duration: "1 Week", org: "IIM Pune", score: "5", director: "5", dean: "" }],
    training: [],
    docs: {
      "lec-0": [{ name: "me601_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "smart_manufacturing.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "patent_int.pdf", url: "#", type: "application/pdf" }],
      "conf-0": [{ name: "keynote.pdf", url: "#", type: "application/pdf" }],
    },
    directorRemarks: "Self-assessment submitted for Dean review.",
  },
  {
    id: 302, name: "Dr. Meena Iyer", employeeId: "DYPIU-DIR-0003",
    designation: "Director", department: "School of Health Sciences",
    submittedOn: "2025-04-26", status: "Dean Reviewed",
    avatar: "MI", avatarColor: "#10b981",
    directorScore: 395, deanTotal: 388,
    info: { name: "Dr. Meena Iyer", qual: "Ph.D. (Biomedical Sciences)", desig: "Director", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "HS501 / Clinical Research Methods", planned: "40", conducted: "40", score: "22", director: "22", dean: "22" }],
    courseFile: { course: "HS501", title: "Clinical Research Methods", details: "Yes", score: "19", director: "19", dean: "19" },
    innovScore: "10", innovDir: "10", innovDean: "10",
    projects: [
      { label: "Project guided", score: "5", director: "5", dean: "5" },
      { label: "Industrial collaboration", score: "5", director: "5", dean: "5" },
      { label: "Award received", score: "4", director: "4", dean: "4" },
      { label: "Project outcome", score: "4", director: "4", dean: "4" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", director: "5", dean: "5" }, { label: "Certification", score: "5", director: "5", dean: "5" }],
    feedback: [{ code: "HS501", fb1: "4.9", fb2: "4.8", score: "9.7", director: "9.7", dean: "9.7" }],
    deptActs: [{ activity: "Research Ethics Committee", nature: "Chair", score: "20", director: "20", dean: "20" }],
    uniActs: [{ activity: "NAAC Steering Committee", nature: "Co-Convener", score: "28", director: "28", dean: "28" }],
    society: [{ label: "Community Health Camp", details: "Free checkups in rural Pune", score: "5", director: "5", dean: "5" }],
    industry: [{ name: "Cipla Ltd.", details: "Joint Research MOU", score: "5", director: "5", dean: "5" }],
    acr: [
      { label: "Leadership and Vision", director: "25", dean: "25" },
      { label: "Research Output", director: "24", dean: "24" },
      { label: "Institutional Development", director: "23", dean: "23" },
      { label: "Industry Interface", director: "22", dean: "22" },
      { label: "Compliance & Reporting", director: "24", dean: "24" },
    ],
    journals: [{ title: "AI-Assisted Drug Discovery", journal: "Nature Medicine", issn: "1078-8956", index: "SCI", score: "40", director: "40", dean: "40" }],
    books: [], ict: [], research: [{ degree: "PhD", name: "Pooja Varma", thesis: "Awarded 2024-12-10", score: "25", director: "25", dean: "25" }],
    patents: [], awards: [{ title: "Excellence in Research", date: "2024-10-20", agency: "ICMR", level: "National", score: "10", director: "10", dean: "10" }],
    confs: [{ title: "Biomarkers in Early Cancer Detection", type: "Invited Talk", org: "AACR 2024", level: "International", score: "20", director: "20", dean: "20" }],
    proposals: [{ title: "Rural Health Diagnostics AI", duration: "2 Years", agency: "ICMR", amount: "30 Lakhs", score: "18", director: "18", dean: "18" }],
    fdps: [], training: [],
    docs: {
      "lec-0": [{ name: "hs501_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "ai_drug_discovery.pdf", url: "#", type: "application/pdf" }],
    },
    directorRemarks: "Outstanding researcher and institutional leader. Fully recommended.",
    deanRemarks: "Endorsed with commendation. Exceptional contribution to health sciences research.",
  },
];

// HODs that the Dean can also view (with both HOD and Director scores visible)
const HOD_LIST_DEAN = [
  {
    id: 101, name: "Dr. Priya Sharma", employeeId: "DYPIU-HOD-0042",
    designation: "Associate Professor & HOD", department: "Computer Science & Engineering",
    submittedOn: "2025-04-25", status: "Director Reviewed",
    avatar: "PS", avatarColor: "#6366f1",
    hodScore: 312, directorTotal: 308, deanTotal: 0,
    info: { name: "Dr. Priya Sharma", qual: "Ph.D (Computer Science)", desig: "Associate Professor & HOD", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CS501 / AI & ML", planned: "48", conducted: "47", score: "20", hod: "20", director: "20", dean: "" }],
    courseFile: { course: "CS501", title: "AI & ML", details: "Yes", score: "18", hod: "18", director: "18", dean: "" },
    innovScore: "9", innovHod: "9", innovDir: "9", innovDean: "",
    projects: [
      { label: "Project guided (3/batch)", score: "5", hod: "5", director: "5", dean: "" },
      { label: "Industrial collaboration", score: "4", hod: "4", director: "4", dean: "" },
      { label: "Award received", score: "3", hod: "3", director: "3", dean: "" },
      { label: "Project outcome", score: "4", hod: "4", director: "4", dean: "" },
    ],
    quals: [{ label: "Higher Qualification achieved", score: "5", hod: "5", director: "5", dean: "" }, { label: "Add-on Certification", score: "4", hod: "4", director: "4", dean: "" }],
    feedback: [{ code: "CS501", fb1: "4.5", fb2: "4.7", score: "9.2", hod: "9.2", director: "9.2", dean: "" }],
    deptActs: [{ activity: "Department Seminar Series", nature: "Coordinator", score: "18", hod: "18", director: "18", dean: "" }],
    uniActs: [{ activity: "NBA Accreditation Committee", nature: "Convener", score: "25", hod: "25", director: "25", dean: "" }],
    society: [{ label: "Community Coding Bootcamp", details: "Organised for school students", score: "5", hod: "5", director: "5", dean: "" }],
    industry: [{ name: "Microsoft India", details: "MOU + Certification Program", score: "5", hod: "5", director: "5", dean: "" }],
    acr: [
      { label: "Leadership and Team Management", hod: "22", director: "22", dean: "" },
      { label: "Research Output", hod: "24", director: "23", dean: "" },
      { label: "Departmental Performance", hod: "23", director: "23", dean: "" },
      { label: "Punctuality & Commitment", hod: "20", director: "20", dean: "" },
      { label: "Industry / Institute Interface", hod: "19", director: "19", dean: "" },
    ],
    journals: [{ title: "Federated Learning for Healthcare IoT", journal: "IEEE IoT Journal", issn: "2327-4662", index: "SCI", score: "40", hod: "40", director: "40", dean: "" }],
    books: [{ title: "Machine Learning Fundamentals", book: "Pearson, 2024", issn: "978-93-54", pub: "National", coauth: "0", first: "Yes", score: "25", hod: "25", director: "25", dean: "" }],
    ict: [{ title: "AI MOOC on NPTEL", desc: "16-week course", type: "E-Content", quad: "4", score: "18", hod: "18", director: "18", dean: "" }],
    research: [{ degree: "PhD", name: "Aakash Tiwari", thesis: "Submitted 2025-01-15", score: "25", hod: "25", director: "25", dean: "" }],
    patents: [{ title: "Federated AI Privacy System", type: "International", date: "2024-10-05", status: "Published", fileNo: "PCT/IN2024/050123", score: "35", hod: "35", director: "35", dean: "" }],
    awards: [{ title: "Best Researcher Award", date: "2025-02-10", agency: "AICTE", level: "National", score: "10", hod: "10", director: "10", dean: "" }],
    confs: [{ title: "Privacy in AI Systems", type: "Keynote", org: "IEEE COMPSAC 2024", level: "International", score: "20", hod: "20", director: "20", dean: "" }],
    proposals: [{ title: "Federated ML for Smart Cities", duration: "3 Years", agency: "SERB", amount: "48 Lakhs", score: "18", hod: "18", director: "18", dean: "" }],
    fdps: [{ program: "FDP on Generative AI", duration: "2 Weeks", org: "IIT Delhi", score: "8", hod: "8", director: "8", dean: "" }],
    training: [{ company: "Google India", duration: "1 Week", nature: "Industry Immersion", score: "5", hod: "5", director: "5", dean: "" }],
    docs: {
      "lec-0": [{ name: "ai_ml_schedule.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "federated_learning.pdf", url: "#", type: "application/pdf" }],
      "pat-0": [{ name: "patent_int.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Excellent performance across all parameters. Strongly recommended for promotion consideration.",
    directorRemarks: "Endorsed. Excellent researcher and departmental leader.",
  },
  {
    id: 103, name: "Dr. Anjali Nair", employeeId: "DYPIU-HOD-0051",
    designation: "Associate Professor & HOD", department: "Chemical Engineering",
    submittedOn: "2025-04-20", status: "Dean Reviewed",
    avatar: "AN", avatarColor: "#10b981",
    hodScore: 330, directorTotal: 330, deanTotal: 328,
    info: { name: "Dr. Anjali Nair", qual: "Ph.D (Chemical)", desig: "Associate Professor & HOD", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CH301 / Process Engineering", planned: "48", conducted: "48", score: "22", hod: "22", director: "22", dean: "22" }],
    courseFile: { course: "CH301", title: "Process Engineering", details: "Yes", score: "19", hod: "19", director: "19", dean: "19" },
    innovScore: "10", innovHod: "10", innovDir: "10", innovDean: "10",
    projects: [
      { label: "Project guided", score: "5", hod: "5", director: "5", dean: "5" },
      { label: "Industrial collaboration", score: "5", hod: "5", director: "5", dean: "5" },
      { label: "Award received", score: "4", hod: "4", director: "4", dean: "4" },
      { label: "Project outcome", score: "4", hod: "4", director: "4", dean: "4" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5", dean: "5" }, { label: "Certification", score: "5", hod: "5", director: "5", dean: "5" }],
    feedback: [{ code: "CH301", fb1: "4.8", fb2: "4.9", score: "9.7", hod: "9.7", director: "9.7", dean: "9.7" }],
    deptActs: [{ activity: "Lab Upgrade Project", nature: "PI", score: "20", hod: "20", director: "20", dean: "20" }],
    uniActs: [{ activity: "NAAC Criterion 3 Lead", nature: "Convener", score: "28", hod: "28", director: "28", dean: "28" }],
    society: [{ label: "Rural Sanitation Project", details: "NGO Collaboration", score: "5", hod: "5", director: "5", dean: "5" }],
    industry: [{ name: "BASF India", details: "Research Collaboration", score: "5", hod: "5", director: "5", dean: "5" }],
    acr: [
      { label: "Leadership and Team Management", hod: "25", director: "25", dean: "25" },
      { label: "Research Output", hod: "25", director: "25", dean: "25" },
      { label: "Departmental Performance", hod: "24", director: "24", dean: "24" },
      { label: "Punctuality & Commitment", hod: "23", director: "23", dean: "23" },
      { label: "Industry / Institute Interface", hod: "22", director: "22", dean: "22" },
    ],
    journals: [{ title: "Green Chemistry in Polymers", journal: "Green Chemistry", issn: "1463-9262", index: "SCI", score: "40", hod: "40", director: "40", dean: "40" }],
    books: [{ title: "Chemical Process Design", book: "Wiley, 2024", issn: "978-11-19", pub: "International", coauth: "0", first: "Yes", score: "30", hod: "30", director: "30", dean: "30" }],
    ict: [], research: [{ degree: "PhD", name: "Kavya Iyer", thesis: "Awarded 2024-09-10", score: "25", hod: "25", director: "25", dean: "25" }],
    patents: [], awards: [{ title: "Young Scientist Award", date: "2024-11-05", agency: "DST", level: "National", score: "10", hod: "10", director: "10", dean: "10" }],
    confs: [{ title: "Sustainable Process Engineering", type: "Invited Talk", org: "IChemE 2024", level: "International", score: "20", hod: "20", director: "20", dean: "20" }],
    proposals: [{ title: "Bio-refinery Optimisation", duration: "2 Years", agency: "CSIR", amount: "22 Lakhs", score: "18", hod: "18", director: "18", dean: "18" }],
    fdps: [], training: [],
    docs: {
      "lec-0": [{ name: "ch301_timetable.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "green_chemistry.pdf", url: "#", type: "application/pdf" }],
    },
    hodRemarks: "Outstanding researcher and administrator. Recommended for senior designation.",
    directorRemarks: "Fully endorsed. Exceptional contribution to research and institution building.",
    deanRemarks: "Strongly approved at Dean level. Exemplary academic and research leadership.",
  },
];

// Faculty visible to Dean (director-approved)
const FACULTY_LIST_DEAN = [
  {
    id: 201, name: "Prof. Arjun Mehta", employeeId: "DYPIU-FAC-0101",
    designation: "Assistant Professor", department: "Computer Science & Engineering",
    submittedOn: "2025-04-18", status: "Director Approved",
    avatar: "AM", avatarColor: "#6366f1",
    hodTotal: 310, directorTotal: 305, deanTotal: 0,
    hodRemarks: "Good performance. Continue research.",
    directorRemarks: "Satisfactory. Encouraged to publish more.",
    info: { name: "Prof. Arjun Mehta", qual: "M.Tech (CSE)", desig: "Assistant Professor", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "CS301 / Data Structures", planned: "48", conducted: "46", score: "18", hod: "18", director: "18", dean: "" }],
    courseFile: { course: "CS301", title: "Data Structures", details: "Yes", score: "16", hod: "16", director: "16", dean: "" },
    innovScore: "8", innovHod: "8", innovDir: "8", innovDean: "",
    projects: [
      { label: "Project guided", score: "5", hod: "5", director: "5", dean: "" },
      { label: "Industrial collaboration", score: "3", hod: "3", director: "3", dean: "" },
      { label: "Award received", score: "2", hod: "2", director: "2", dean: "" },
      { label: "Project outcome", score: "3", hod: "3", director: "3", dean: "" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5", dean: "" }, { label: "Certification", score: "4", hod: "4", director: "4", dean: "" }],
    feedback: [{ code: "CS301", fb1: "4.2", fb2: "4.4", score: "8.8", hod: "8.8", director: "8.8", dean: "" }],
    deptActs: [{ activity: "Department Seminar", nature: "Coordinator", score: "10", hod: "10", director: "10", dean: "" }],
    uniActs: [{ activity: "Exam Duty", nature: "Flying Squad", score: "15", hod: "15", director: "15", dean: "" }],
    society: [{ label: "Induction Program", details: "FE Student induction", score: "5", hod: "5", director: "5", dean: "" }],
    industry: [{ name: "TCS Pune", details: "Guest Lecture + MOU", score: "4", hod: "4", director: "4", dean: "" }],
    acr: [
      { label: "Self-motivation and Proactiveness", hod: "18", director: "17", dean: "" },
      { label: "Punctuality", hod: "20", director: "20", dean: "" },
      { label: "Target based work", hod: "17", director: "17", dean: "" },
      { label: "Effectiveness", hod: "16", director: "16", dean: "" },
      { label: "Obedience", hod: "19", director: "19", dean: "" },
    ],
    journals: [{ title: "Deep Learning for Image Segmentation", journal: "Elsevier CVIU", issn: "1077-3142", index: "Scopus", score: "30", hod: "30", director: "30", dean: "" }],
    books: [{ title: "Data Structures with C++", book: "Oxford Press, 2024", issn: "978-01-9", pub: "National", coauth: "1", first: "Yes", score: "20", hod: "20", director: "20", dean: "" }],
    ict: [{ title: "Data Structures MOOC", desc: "12-week", type: "E-Content", quad: "4", score: "15", hod: "15", director: "15", dean: "" }],
    research: [{ degree: "PhD", name: "Rohan Pawar", thesis: "Submitted 2024-11-10", score: "20", hod: "20", director: "20", dean: "" }],
    patents: [{ title: "Smart Irrigation System", type: "National", date: "2024-08-15", status: "Published", fileNo: "202421012345", score: "25", hod: "25", director: "25", dean: "" }],
    awards: [{ title: "Best Paper Award", date: "2024-03-20", agency: "IEEE", level: "International", score: "10", hod: "10", director: "10", dean: "" }],
    confs: [{ title: "ML in Healthcare", type: "Paper", org: "IEEE ICCCNT 2024", level: "International", score: "15", hod: "15", director: "15", dean: "" }],
    proposals: [{ title: "AI-based Traffic Management", duration: "2 Years", agency: "DST", amount: "12.5 Lakhs", score: "10", hod: "10", director: "10", dean: "" }],
    fdps: [{ program: "FDP on Deep Learning", duration: "1 Week", org: "IIT Bombay", score: "5", hod: "5", director: "5", dean: "" }],
    training: [{ company: "Infosys BPM", duration: "2 Weeks", nature: "Industry Collaboration", score: "5", hod: "5", director: "5", dean: "" }],
    docs: {
      "lec-0": [{ name: "timetable_sem1.pdf", url: "#", type: "application/pdf" }],
      "jour-0": [{ name: "journal_paper_1.pdf", url: "#", type: "application/pdf" }],
    },
  },
  {
    id: 202, name: "Dr. Sneha Kulkarni", employeeId: "DYPIU-FAC-0088",
    designation: "Assistant Professor", department: "Computer Science & Engineering",
    submittedOn: "2025-04-20", status: "Dean Reviewed",
    avatar: "SK", avatarColor: "#0ea5e9",
    hodTotal: 345, directorTotal: 340, deanTotal: 338,
    hodRemarks: "Excellent researcher.",
    directorRemarks: "Strongly approved.",
    deanRemarks: "Exemplary. Dean-level endorsement for fast-track promotion.",
    info: { name: "Dr. Sneha Kulkarni", qual: "Ph.D (IT)", desig: "Assistant Professor", ay: "2025-2026" },
    lectures: [{ sem: "Sem I", code: "IT201 / Database Systems", planned: "48", conducted: "48", score: "22", hod: "22", director: "22", dean: "22" }],
    courseFile: { course: "IT201", title: "Database Systems", details: "Yes", score: "18", hod: "18", director: "18", dean: "18" },
    innovScore: "9", innovHod: "9", innovDir: "9", innovDean: "9",
    projects: [
      { label: "Project guided", score: "4", hod: "4", director: "4", dean: "4" },
      { label: "Industrial collaboration", score: "4", hod: "4", director: "4", dean: "4" },
      { label: "Award received", score: "3", hod: "3", director: "3", dean: "3" },
      { label: "Project outcome", score: "4", hod: "4", director: "4", dean: "4" },
    ],
    quals: [{ label: "Higher Qualification", score: "5", hod: "5", director: "5", dean: "5" }, { label: "Certification", score: "5", hod: "5", director: "5", dean: "5" }],
    feedback: [{ code: "IT201", fb1: "4.6", fb2: "4.8", score: "9.4", hod: "9.4", director: "9.4", dean: "9.4" }],
    deptActs: [{ activity: "Departmental Seminar", nature: "Organizer", score: "15", hod: "15", director: "15", dean: "15" }],
    uniActs: [{ activity: "Admission Committee", nature: "Member", score: "18", hod: "18", director: "18", dean: "18" }],
    society: [{ label: "Blood Donation", details: "Organised camp", score: "5", hod: "5", director: "5", dean: "5" }],
    industry: [{ name: "Wipro Pune", details: "Internship MOU", score: "5", hod: "5", director: "5", dean: "5" }],
    acr: [
      { label: "Self-motivation and Proactiveness", hod: "22", director: "22", dean: "22" },
      { label: "Punctuality", hod: "23", director: "23", dean: "23" },
      { label: "Target based work", hod: "21", director: "21", dean: "21" },
      { label: "Effectiveness", hod: "22", director: "22", dean: "22" },
      { label: "Obedience", hod: "23", director: "23", dean: "23" },
    ],
    journals: [{ title: "Blockchain in Healthcare", journal: "Springer", issn: "1234-5678", index: "SCI", score: "40", hod: "40", director: "40", dean: "40" }],
    books: [], ict: [], research: [], patents: [], awards: [], confs: [], proposals: [], fdps: [], training: [],
    docs: { "jour-0": [{ name: "blockchain_paper.pdf", url: "#", type: "application/pdf" }] },
  },
];

// Dean's own self-appraisal data
const DEAN_SELF_DATA = {
  info: { name: "Prof. Anand Krishnamurthy", qual: "Ph.D., LLD (Law & Policy)", desig: "Dean of Academics", ay: "2025-2026" },
  lectures: [{ sem: "Sem I", code: "GS701 / Academic Leadership & Policy", planned: "30", conducted: "29", score: "18" }],
  courseFile: { course: "GS701", title: "Academic Leadership & Policy", details: "Yes", score: "18" },
  innovScore: "9",
  projects: [
    { label: "Project guided (3/batch)", score: "5" }, { label: "Industrial collaboration", score: "5" },
    { label: "Award received", score: "4" }, { label: "Project outcome", score: "4" },
  ],
  quals: [{ label: "Higher Qualification", score: "5" }, { label: "Certification", score: "5" }],
  feedback: [{ code: "GS701", fb1: "4.9", fb2: "4.9", score: "9.8" }],
  deptActs: [{ activity: "University Curriculum Committee", nature: "Chair", score: "20" }],
  uniActs: [{ activity: "Senate & Academic Council", nature: "Secretary", score: "30" }],
  society: [{ label: "Higher Ed Policy Forum", details: "National-level participation", score: "5" }],
  industry: [{ name: "McKinsey India", details: "Advisory Board Member", score: "5" }],
  acr: [],
  journals: [{ title: "Governance Models in Indian HEIs", journal: "Higher Education", issn: "0018-1560", index: "SCI", score: "40" }],
  books: [{ title: "Academic Administration in the 21st Century", book: "Oxford Press, 2024", issn: "978-01-8", pub: "International", coauth: "0", first: "Yes", score: "30" }],
  ict: [{ title: "Leadership MOOC on Coursera", desc: "8-week program", type: "E-Content", quad: "4", score: "18" }],
  research: [{ degree: "PhD", name: "Sonal Joshi", thesis: "Awarded 2025-02-15", score: "25" }],
  patents: [],
  awards: [{ title: "Best Academic Administrator", date: "2025-03-01", agency: "AIU", level: "National", score: "10" }],
  confs: [{ title: "Future of Higher Education in India", type: "Keynote", org: "FICCI HEIS 2024", level: "International", score: "20" }],
  proposals: [{ title: "NEP 2020 Implementation Research", duration: "2 Years", agency: "UGC", amount: "15 Lakhs", score: "18" }],
  fdps: [{ program: "Leadership & Strategy", duration: "1 Week", org: "IIM Ahmedabad", score: "5" }],
  training: [],
  docs: {
    "lec-0": [{ name: "gs701_schedule.pdf", url: "#", type: "application/pdf" }],
    "jour-0": [{ name: "governance_paper.pdf", url: "#", type: "application/pdf" }],
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
    "Pending Review":         { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    "HOD Reviewed":           { bg: "#ede9fe", color: "#5b21b6", dot: "#7c3aed" },
    "Director Reviewed":      { bg: "#dbeafe", color: "#1e40af", dot: "#3b82f6" },
    "Director Approved":      { bg: "#cffafe", color: "#164e63", dot: "#06b6d4" },
    "Pending Dean Review":    { bg: "#fef3c7", color: "#92400e", dot: "#f59e0b" },
    "Dean Reviewed":          { bg: "#d1fae5", color: "#065f46", dot: "#10b981" },
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
function DeanInput({ val, onChange }) {
  return (
    <input type="number" min="0" step="0.5" value={val}
      onChange={e => onChange(e.target.value)}
      style={{ width: 58, textAlign: "center", border: "1.5px solid #7c3aed", borderRadius: 5, padding: "3px 5px", fontSize: 11, fontFamily: "Georgia, serif", outline: "none", background: "#faf5ff" }}
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
function SC({ title, subtitle, accent = "#7c3aed", children }) {
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
const T = { width: "100%", borderCollapse: "collapse", fontSize: 11 };
const TH      = { border: "1px solid #cbd5e1", padding: "5px 7px", background: "#0f172a",  color: "#94a3b8",  fontWeight: 700, textAlign: "center", fontSize: 10 };
const TH_HOD  = { ...TH, background: "#312e81", color: "#c7d2fe" };
const TH_DIR  = { ...TH, background: "#0c4a6e", color: "#bae6fd" };
const TH_DEAN = { ...TH, background: "#4c1d95", color: "#ddd6fe" };
const TD  = { border: "1px solid #e2e8f0", padding: "5px 7px", verticalAlign: "middle" };
const TDC = { ...TD, textAlign: "center" };
const TDS = { ...TD, textAlign: "center", background: "#f8fafc", minWidth: 58 };
const TDS_HOD  = { ...TDS, background: "#f0f4ff" };
const TDS_DIR  = { ...TDS, background: "#f0fbff" };
const TDS_DEAN = { ...TDS, background: "#faf5ff" };
const TDV = { ...TD, background: "#fafbff", minWidth: 110 };

// ─── Generic Review Form ──────────────────────────────────────────────────────
// personMode: "director" (reviewing a Director), "hod" (reviewing HOD), "faculty" (reviewing faculty), "self"
function ReviewForm({ person, deanData, setDeanData, personMode = "director", accentColor = "#7c3aed", role = "dean" }) {
  const showHodCol  = personMode === "hod" || personMode === "faculty";
  const showDirCol  = personMode === "director" || personMode === "hod" || personMode === "faculty";

  const set = (section, idx, field, val) => {
    setDeanData(prev => {
      const updated = { ...prev };
      if (!updated[section]) updated[section] = JSON.parse(JSON.stringify(person[section] || []));
      if (idx === null) updated[section] = { ...updated[section], [field]: val };
      else updated[section] = updated[section].map((r, i) => i === idx ? { ...r, [field]: val } : r);
      return updated;
    });
  };
  const setScalar = (key, val) => setDeanData(prev => ({ ...prev, [key]: val }));
  const get = (section, idx, field) => {
    if (deanData[section]) {
      const s = deanData[section];
      return idx === null ? (s[field] ?? person[section]?.[field] ?? "") : (s[idx]?.[field] ?? person[section]?.[idx]?.[field] ?? "");
    }
    return idx === null ? (person[section]?.[field] ?? "") : (person[section]?.[idx]?.[field] ?? "");
  };
  const getS = (key) => deanData[key] ?? person[key] ?? "";
  const { docs } = person;
  const rows = (arr) => arr && arr.length > 0 ? arr : [{}];

  const DI = ({ val, onChange }) =>
    role === "self"
      ? <SelfInput val={val} onChange={onChange} />
      : <DeanInput val={val} onChange={onChange} />;

  const TH_EDIT  = role === "self" ? { ...TH, background: "#064e3b", color: "#6ee7b7" } : TH_DEAN;
  const TDS_EDIT = role === "self" ? { ...TDS, background: "#f0fff8" } : TDS_DEAN;
  const editLabel = role === "self" ? "Your Score" : "Dean Score";

  // Director score column label for HOD/Faculty mode
  const dirColLabel = personMode === "director" ? "Self Score" : "Director Score";
  const facColLabel = "Faculty Score";

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Mode banner */}
      <div style={{ background: `linear-gradient(90deg,#3b0764,#6d28d9)`, color: "#ede9fe", borderRadius: 8, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 10, fontSize: 12 }}>
        <span style={{ fontSize: 18 }}>{role === "self" ? "✏️" : "👁️"}</span>
        <div>
          {role === "self"
            ? <><strong>Self-Appraisal Mode</strong> — Fill your own scores in the <span style={{ color: "#86efac", fontWeight: 700 }}>Your Score</span> column.</>
            : <><strong>Dean Review Mode</strong> — All prior scores are read-only. Only the <span style={{ color: "#c4b5fd", fontWeight: 700 }}>Dean Score</span> column is editable.
                {showHodCol && " HOD scores shown for reference."} {showDirCol && " Director scores shown for reference."}</>
          }
        </div>
      </div>

      {/* Personal Info */}
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

      {/* A1 Lectures */}
      <SC title="A1. Lectures / Tutorials / Practicals (Max 50)" accent={accentColor}>
        <div style={{ overflowX: "auto" }}>
          <table style={T}><thead><tr>
            <th style={TH}>SN</th><th style={TH}>Semester</th><th style={TH}>Course</th>
            <th style={TH}>Planned</th><th style={TH}>Conducted</th><th style={TH}>Docs</th>
            {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
            {!showHodCol && <th style={TH}>{personMode === "director" ? "Self Score" : "Faculty Score"}</th>}
            {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
            <th style={TH_EDIT}>{editLabel}</th>
          </tr></thead>
          <tbody>{rows(person.lectures).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.sem} /></td><td style={TD}><RO val={r.code} /></td>
              <td style={TDC}><RO val={r.planned} center /></td><td style={TDC}><RO val={r.conducted} center /></td>
              <td style={TDV}><ViewDocsCell docKey={`lec-${i}`} docs={docs} /></td>
              {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
              {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
              {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
              <td style={TDS_EDIT}><DI val={get("lectures", i, "dean")} onChange={v => set("lectures", i, "dean", v)} /></td>
            </tr>
          ))}</tbody></table>
        </div>
      </SC>

      {/* A2 Course File */}
      <SC title="A2. Course File (Max 20)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>Course</th><th style={TH}>Title</th><th style={TH}>Details</th><th style={TH}>Docs</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody><tr>
          <td style={TD}><RO val={person.courseFile?.course} /></td>
          <td style={TD}><RO val={person.courseFile?.title} /></td>
          <td style={TDC}><RO val={person.courseFile?.details} center /></td>
          <td style={TDV}><ViewDocsCell docKey="cf-0" docs={docs} /></td>
          {showHodCol && <><td style={TDS}><RO val={person.courseFile?.score} center /></td><td style={TDS_HOD}><RO val={person.courseFile?.hod} center /></td></>}
          {!showHodCol && <td style={TDS}><RO val={person.courseFile?.score} center /></td>}
          {showDirCol && <td style={TDS_DIR}><RO val={person.courseFile?.director} center /></td>}
          <td style={TDS_EDIT}><DI val={get("courseFile", null, "dean")} onChange={v => set("courseFile", null, "dean", v)} /></td>
        </tr></tbody></table>
      </SC>

      {/* A3 Innovative */}
      <SC title="A3. Innovative Teaching-Learning (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>Method</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody><tr>
          <td style={TD}>Innovative / participatory teaching methods used</td>
          {showHodCol && <><td style={TDS}><RO val={person.innovScore} center /></td><td style={TDS_HOD}><RO val={person.innovHod} center /></td></>}
          {!showHodCol && <td style={TDS}><RO val={person.innovScore} center /></td>}
          {showDirCol && <td style={TDS_DIR}><RO val={person.innovDir} center /></td>}
          <td style={TDS_EDIT}><DI val={getS("innovDean")} onChange={v => setScalar("innovDean", v)} /></td>
        </tr></tbody></table>
      </SC>

      {/* A4 Projects */}
      <SC title="A4. Projects (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Project Type</th><th style={TH}>Docs</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.projects).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.label} /></td>
            <td style={TDV}><ViewDocsCell docKey={`proj-${i}`} docs={docs} /></td>
            {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
            {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_EDIT}><DI val={get("projects", i, "dean")} onChange={v => set("projects", i, "dean", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* A5 Quals */}
      <SC title="A5. Qualification Enhancement (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Description</th><th style={TH}>Docs</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.quals).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.label} /></td>
            <td style={TDV}><ViewDocsCell docKey={`qual-${i}`} docs={docs} /></td>
            {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
            {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_EDIT}><DI val={get("quals", i, "dean")} onChange={v => set("quals", i, "dean", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* B Feedback */}
      <SC title="B. Student Feedback (Max 10)" accent={accentColor}>
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Course</th><th style={TH}>FB1</th><th style={TH}>FB2</th><th style={TH}>Avg</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.feedback).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.code} /></td>
            <td style={TDC}><RO val={r.fb1} center /></td><td style={TDC}><RO val={r.fb2} center /></td>
            <td style={{ ...TDC, fontWeight: 700, color: "#0ea5e9" }}>{r.fb1 && r.fb2 ? ((n(r.fb1) + n(r.fb2)) / 2).toFixed(2) : "—"}</td>
            {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
            {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_EDIT}><DI val={get("feedback", i, "dean")} onChange={v => set("feedback", i, "dean", v)} /></td>
          </tr>
        ))}</tbody></table>
      </SC>

      {/* C–F Activities */}
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
            <th style={TH}>Docs</th>
            {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
            {!showHodCol && <th style={TH}>Self Score</th>}
            {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
            <th style={TH_EDIT}>{editLabel}</th>
          </tr></thead>
          <tbody>{rows(person[key]).map((r, i) => (
            <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
              <td style={TDC}>{i + 1}</td>
              {fields.map(f => <td key={f} style={TD}><RO val={r[f]} /></td>)}
              <td style={TDV}><ViewDocsCell docKey={`${docPfx}-${i}`} docs={docs} /></td>
              {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
              {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
              {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
              <td style={TDS_EDIT}><DI val={get(key, i, "dean")} onChange={v => set(key, i, "dean", v)} /></td>
            </tr>
          ))}</tbody></table>
        </SC>
      ))}

      {/* G ACR */}
      <SC title="G. Annual Confidential Report (Max 25)" accent="#ef4444">
        <table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Parameter</th>
          {showHodCol && <th style={TH_HOD}>HOD Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          {role !== "self" && <th style={TH_EDIT}>{editLabel}</th>}
        </tr></thead>
        <tbody>{rows(person.acr).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td>
            <td style={TD}><RO val={r.label} /></td>
            {showHodCol && <td style={TDS_HOD}><RO val={r.hod} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            {role !== "self" && <td style={TDS_EDIT}><DI val={get("acr", i, "dean")} onChange={v => set("acr", i, "dean", v)} /></td>}
          </tr>
        ))}</tbody></table>
      </SC>

      <div style={{ fontWeight: 800, fontSize: 13, color: "#1e293b", background: "#ede9fe", padding: "8px 14px", borderRadius: 6, marginBottom: 10 }}>PART B — Research & Academic Contributions</div>

      {/* B1 Journals */}
      <SC title="B1. Research Papers / Journal Publications (Max 120)" accent="#7c3aed">
        <div style={{ overflowX: "auto" }}><table style={T}><thead><tr>
          <th style={TH}>SN</th><th style={TH}>Title</th><th style={TH}>Journal</th>
          <th style={TH}>ISSN</th><th style={TH}>Index</th><th style={TH}>Docs</th>
          {showHodCol && <><th style={TH}>Faculty Score</th><th style={TH_HOD}>HOD Score</th></>}
          {!showHodCol && <th style={TH}>Self Score</th>}
          {showDirCol && <th style={TH_DIR}>{dirColLabel}</th>}
          <th style={TH_EDIT}>{editLabel}</th>
        </tr></thead>
        <tbody>{rows(person.journals).map((r, i) => (
          <tr key={i} style={i % 2 ? { background: "#f8fafc" } : {}}>
            <td style={TDC}>{i + 1}</td><td style={TD}><RO val={r.title} /></td><td style={TD}><RO val={r.journal} /></td>
            <td style={TDC}><RO val={r.issn} center /></td><td style={TDC}><RO val={r.index} center /></td>
            <td style={TDV}><ViewDocsCell docKey={`jour-${i}`} docs={docs} /></td>
            {showHodCol && <><td style={TDS}><RO val={r.score} center /></td><td style={TDS_HOD}><RO val={r.hod} center /></td></>}
            {!showHodCol && <td style={TDS}><RO val={r.score} center /></td>}
            {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
            <td style={TDS_EDIT}><DI val={get("journals", i, "dean")} onChange={v => set("journals", i, "dean", v)} /></td>
          </tr>
        ))}</tbody></table></div>
      </SC>

      {/* B2–B8 */}
      {[
        { title: "B2. Books / Book Chapters (Max 50)", key: "books", docPfx: "book",
          cols: ["SN","Title","Book & Publisher","ISBN","1st Author?","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.title,r.book,r.issn,r.first] },
        { title: "B3. ICT / E-Content (Max 20)", key: "ict", docPfx: "ict",
          cols: ["SN","Title","Type","Quadrants","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.title,r.type,r.quad] },
        { title: "B4. Research Guidance (Max 30)", key: "research", docPfx: "res",
          cols: ["SN","Degree","Student","Status","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.degree,r.name,r.thesis] },
        { title: "B5a. Patents / IPR (Max 40)", key: "patents", docPfx: "pat",
          cols: ["SN","Title","Type","Filed","Status","File No.","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.title,r.type,r.date,r.status,r.fileNo] },
        { title: "B5b. Awards / Fellowships (Max 10)", key: "awards", docPfx: "awd",
          cols: ["SN","Award","Date","Agency","Level","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.title,r.date,r.agency,r.level] },
        { title: "B6. Conferences (Max 30)", key: "confs", docPfx: "conf",
          cols: ["SN","Title","Type","Organizer","Level","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.title,r.type,r.org,r.level] },
        { title: "B7. Research Proposals (Max 20)", key: "proposals", docPfx: "prop",
          cols: ["SN","Title","Duration","Agency","Amount","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.title,r.duration,r.agency,r.amount] },
        { title: "B8. Self Development — FDP (Max 10)", key: "fdps", docPfx: "fdp",
          cols: ["SN","Program","Duration","Organizer","Docs","Fac/Self Score","HOD","Dir","Dean"],
          render: (r,i) => [i+1,r.program,r.duration,r.org] },
      ].map(({ title, key, docPfx, render, cols }) => (
        <SC key={key} title={title} accent="#7c3aed">
          <div style={{ overflowX: "auto" }}><table style={T}><thead>
            <tr>{cols.map((c, ci) => {
              if (c === "HOD") return showHodCol ? <th key={ci} style={TH_HOD}>HOD Score</th> : null;
              if (c === "Dir") return showDirCol ? <th key={ci} style={TH_DIR}>{dirColLabel}</th> : null;
              if (c === "Dean") return <th key={ci} style={TH_EDIT}>{editLabel}</th>;
              if (c === "Fac/Self Score") return <th key={ci} style={TH}>Faculty Score</th>;
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
                {showDirCol && <td style={TDS_DIR}><RO val={r.director} center /></td>}
                <td style={TDS_EDIT}><DI val={get(key, i, "dean")} onChange={v => set(key, i, "dean", v)} /></td>
              </tr>
            );
          })}</tbody></table></div>
        </SC>
      ))}
    </div>
  );
}

// ─── Score Calculator ─────────────────────────────────────────────────────────
function calcDeanScore(person, deanData) {
  const get = (section, idx, field) => {
    if (deanData[section]) {
      const s = deanData[section];
      return idx === null ? n(s[field]) : n(s[idx]?.[field]);
    }
    return idx === null ? n(person[section]?.[field]) : n(person[section]?.[idx]?.[field]);
  };
  const getS = (key) => n(deanData[key] ?? person[key]);
  const sum = (arr, s, f) => (arr || []).reduce((a, _, i) => a + get(s, i, f), 0);

  const partA = sum(person.lectures, "lectures", "dean") + get("courseFile", null, "dean") +
    getS("innovDean") + sum(person.projects, "projects", "dean") +
    sum(person.quals, "quals", "dean") + sum(person.feedback, "feedback", "dean") +
    sum(person.deptActs, "deptActs", "dean") + sum(person.uniActs, "uniActs", "dean") +
    sum(person.society, "society", "dean") + sum(person.industry, "industry", "dean") +
    sum(person.acr, "acr", "dean");

  const partB = sum(person.journals, "journals", "dean") + sum(person.books, "books", "dean") +
    sum(person.ict, "ict", "dean") + sum(person.research, "research", "dean") +
    sum(person.patents, "patents", "dean") + sum(person.awards, "awards", "dean") +
    sum(person.confs, "confs", "dean") + sum(person.proposals, "proposals", "dean") +
    sum(person.fdps, "fdps", "dean") + sum(person.training || [], "training", "dean");

  return { partA, partB, total: partA + partB };
}

// ─── Review Panel ─────────────────────────────────────────────────────────────
function ReviewPanel({ person, personMode, onBack, onSubmit }) {
  const [deanData, setDeanData] = useState({});
  const [remarks, setRemarks] = useState(person.deanRemarks || "");
  const [tab, setTab] = useState("form");

  const { partA, partB, total } = calcDeanScore(person, deanData);
  const g = grade(total, 575);

  // Compute prior score totals for display
  const dirTotal = person.directorTotal || person.directorScore || 0;
  const hodTotal  = person.hodTotal || person.hodScore || 0;

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#0f172a", padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16, borderRadius: 10 }}>
        <button onClick={onBack} style={{ background: "#1e293b", border: "none", color: "#94a3b8", cursor: "pointer", borderRadius: 6, padding: "6px 12px", fontSize: 12, fontFamily: "Georgia, serif" }}>← Back</button>
        <Avatar initials={person.avatar} color={person.avatarColor || "#7c3aed"} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>{person.name}</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>{person.designation} · {person.employeeId}</div>
        </div>
        {/* Score pills */}
        <div style={{ display: "flex", gap: 8 }}>
          {personMode === "faculty" && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>HOD Total</div>
              <div style={{ color: "#818cf8", fontWeight: 800, fontSize: 14 }}>{hodTotal}</div>
            </div>
          )}
          {(personMode === "faculty" || personMode === "hod") && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>Dir Total</div>
              <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 14 }}>{dirTotal}</div>
            </div>
          )}
          {personMode === "director" && (
            <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>Dir Self Score</div>
              <div style={{ color: "#38bdf8", fontWeight: 800, fontSize: 14 }}>{dirTotal}</div>
            </div>
          )}
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>Dean Part A</div>
            <div style={{ color: "#c4b5fd", fontWeight: 800, fontSize: 14 }}>{partA.toFixed(1)}</div>
          </div>
          <div style={{ background: "#1e293b", borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: "#94a3b8", fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6 }}>Dean Part B</div>
            <div style={{ color: "#a78bfa", fontWeight: 800, fontSize: 14 }}>{partB.toFixed(1)}</div>
          </div>
          <div style={{ background: g.bg, border: `2px solid ${g.color}40`, borderRadius: 8, padding: "8px 12px", textAlign: "center" }}>
            <div style={{ color: g.color, fontSize: 9, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 700 }}>Dean Total</div>
            <div style={{ color: g.color, fontWeight: 800, fontSize: 14 }}>{total.toFixed(1)}<span style={{ fontSize: 10, color: "#94a3b8" }}>/575</span></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[["form", "📋 Review Form"], ["remarks", "✏️ Remarks & Submit"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            style={{ padding: "7px 18px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, background: tab === id ? "#4c1d95" : "#e2e8f0", color: tab === id ? "#ddd6fe" : "#475569" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "form" && (
        <ReviewForm
          person={person} deanData={deanData} setDeanData={setDeanData}
          personMode={personMode} accentColor="#7c3aed" role="dean"
        />
      )}

      {tab === "remarks" && (
        <div style={{ background: "#fff", borderRadius: 10, padding: "22px 24px", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
          <h3 style={{ margin: "0 0 16px", color: "#0f172a", fontSize: 15 }}>Dean Remarks & Final Submission</h3>

          {/* Prior remarks chain */}
          {person.hodRemarks && (
            <div style={{ background: "#f0f4ff", border: "1px solid #c7d2fe", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4338ca", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>HOD Remarks</div>
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>{person.hodRemarks}</div>
            </div>
          )}
          {person.directorRemarks && (
            <div style={{ background: "#f0f9ff", border: "1px solid #bae6fd", borderRadius: 8, padding: "12px 14px", marginBottom: 16 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#0369a1", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 4 }}>Director Remarks</div>
              <div style={{ fontSize: 12, color: "#334155", lineHeight: 1.6 }}>{person.directorRemarks}</div>
            </div>
          )}

          {/* Score summary */}
          <table style={{ ...T, marginBottom: 18 }}>
            <thead><tr>
              <th style={TH}>Section</th><th style={TH}>Max</th>
              {(personMode === "hod" || personMode === "faculty") && <th style={TH}>Faculty Score</th>}
              {(personMode === "hod" || personMode === "faculty") && <th style={TH_HOD}>HOD Score</th>}
              {personMode !== "self" && <th style={TH_DIR}>Director Score</th>}
              <th style={TH_DEAN}>Dean Score</th>
            </tr></thead>
            <tbody>
              {[["Part A — Teaching & Activities", 200, partA], ["Part B — Research & Contributions", 375, partB]].map(([l, m, v]) => (
                <tr key={l}>
                  <td style={TD}>{l}</td><td style={TDC}>{m}</td>
                  {(personMode === "hod" || personMode === "faculty") && <td style={TDS}>—</td>}
                  {(personMode === "hod" || personMode === "faculty") && <td style={TDS_HOD}>{hodTotal ? (hodTotal / 2).toFixed(0) : "—"}</td>}
                  {personMode !== "self" && <td style={TDS_DIR}>{dirTotal ? (dirTotal / 2).toFixed(0) : "—"}</td>}
                  <td style={{ ...TDS_DEAN, fontWeight: 700, color: "#4c1d95" }}>{v.toFixed(1)}</td>
                </tr>
              ))}
              <tr style={{ background: "#d1fae5", fontWeight: 700 }}>
                <td style={TD}>Grand Total</td><td style={TDC}>575</td>
                {(personMode === "hod" || personMode === "faculty") && <td style={TDS}>—</td>}
                {(personMode === "hod" || personMode === "faculty") && <td style={TDS_HOD}>{hodTotal}</td>}
                {personMode !== "self" && <td style={TDS_DIR}>{dirTotal}</td>}
                <td style={{ ...TDS_DEAN, color: "#065f46", fontSize: 14 }}>{total.toFixed(1)}</td>
              </tr>
              <tr style={{ background: g.bg }}>
                <td style={TD} colSpan={6}><strong>Grade</strong></td>
                <td style={{ ...TDC, color: g.color, fontWeight: 800 }}>{g.label}</td>
              </tr>
            </tbody>
          </table>

          <label style={{ fontWeight: 700, fontSize: 13, color: "#334155", display: "block", marginBottom: 6 }}>Dean Remarks</label>
          <textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={4}
            placeholder="Enter your Dean-level remarks, endorsement, and recommendations..."
            style={{ width: "100%", border: "1px solid #e2e8f0", borderRadius: 7, padding: "10px 12px", fontSize: 12, fontFamily: "Georgia, serif", resize: "vertical", boxSizing: "border-box", marginBottom: 16 }} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button onClick={onBack} style={{ padding: "9px 22px", background: "#f1f5f9", color: "#475569", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "Georgia, serif" }}>Cancel</button>
            <button onClick={() => onSubmit(person.id, total, remarks, personMode)}
              style={{ padding: "10px 28px", background: "#4c1d95", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "Georgia, serif" }}>
              ✔ Submit Dean Approval
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Person Card ──────────────────────────────────────────────────────────────
function PersonCard({ person, personMode, onReview }) {
  const g = grade(person.deanTotal || person.directorTotal || person.hodTotal || 300, 575);
  const docCount = Object.values(person.docs || {}).reduce((a, arr) => a + arr.length, 0);

  const scoreRows = [];
  if (personMode === "faculty" || personMode === "hod") {
    scoreRows.push({ label: personMode === "hod" ? "Own Score" : "HOD Score", val: person.hodTotal || person.hodScore || 0, color: "#6366f1" });
  }
  scoreRows.push({ label: "Dir Score", val: person.directorTotal || person.directorScore || 0, color: "#0ea5e9" });
  scoreRows.push({ label: "Dean Score", val: person.deanTotal || 0, color: "#7c3aed" });
  scoreRows.push({ label: "Docs", val: docCount, color: "#10b981", noBar: true });

  const isDeanReviewed = person.status === "Dean Reviewed";

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "18px 20px", boxShadow: "0 1px 6px rgba(0,0,0,.07)", display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Avatar initials={person.avatar} color={person.avatarColor || "#7c3aed"} size={46} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{person.name}</div>
          <div style={{ fontSize: 11, color: "#475569", marginBottom: 2 }}>{person.designation}</div>
          <div style={{ fontSize: 10, color: "#94a3b8", fontFamily: "monospace" }}>{person.employeeId}</div>
          {person.department && <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>{person.department}</div>}
        </div>
        <StatusBadge status={person.status} />
      </div>

      {/* Score grid */}
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
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {person.hodRemarks && (
          <div style={{ background: "#f0f4ff", borderRadius: 6, padding: "7px 10px", fontSize: 11, color: "#4338ca", lineHeight: 1.5, borderLeft: "3px solid #818cf8" }}>
            <span style={{ fontWeight: 700 }}>HOD: </span>{person.hodRemarks.slice(0, 60)}{person.hodRemarks.length > 60 ? "…" : ""}
          </div>
        )}
        {person.directorRemarks && (
          <div style={{ background: "#f0f9ff", borderRadius: 6, padding: "7px 10px", fontSize: 11, color: "#0369a1", lineHeight: 1.5, borderLeft: "3px solid #38bdf8" }}>
            <span style={{ fontWeight: 700 }}>Director: </span>{person.directorRemarks.slice(0, 60)}{person.directorRemarks.length > 60 ? "…" : ""}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
        <div style={{ fontSize: 10, color: "#94a3b8" }}>Submitted: {person.submittedOn}</div>
        <button onClick={() => onReview(person, personMode)}
          style={{ fontSize: 11, padding: "7px 18px", background: isDeanReviewed ? "#1e293b" : "#4c1d95", color: isDeanReviewed ? "#e2e8f0" : "#ede9fe", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 700, fontFamily: "Georgia, serif" }}>
          {isDeanReviewed ? "✎ Edit Dean Review" : "👁️ Review & Approve →"}
        </button>
      </div>
    </div>
  );
}

// ─── Self-Appraisal Panel ─────────────────────────────────────────────────────
function SelfAppraisalPanel() {
  const [deanData, setDeanData] = useState({});
  const [tab, setTab] = useState("form");
  const [submitted, setSubmitted] = useState(false);
  const [remarks, setRemarks] = useState("");

  const { partA, partB, total } = calcDeanScore(DEAN_SELF_DATA, deanData);
  const g = grade(total, 575);

  if (submitted) return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "48px", textAlign: "center", boxShadow: "0 1px 6px rgba(0,0,0,.06)" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
      <h2 style={{ margin: "0 0 8px", color: "#0f172a" }}>Self-Appraisal Submitted</h2>
      <p style={{ color: "#64748b", fontSize: 13 }}>Your appraisal for AY {DEAN_USER.ay} has been forwarded to the Vice Chancellor.</p>
      <div style={{ display: "inline-block", background: g.bg, color: g.color, borderRadius: 12, padding: "14px 28px", marginTop: 16, fontWeight: 800, fontSize: 18 }}>
        {total.toFixed(1)} / 575 — {g.label}
      </div>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* Score header */}
      <div style={{ background: "#0f172a", borderRadius: 10, padding: "14px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
        <Avatar initials={DEAN_USER.avatar} color="#7c3aed" size={44} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15 }}>{DEAN_USER.name}</div>
          <div style={{ color: "#64748b", fontSize: 11 }}>{DEAN_USER.designation} · Self-Appraisal AY {DEAN_USER.ay}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {[["Part A", partA.toFixed(1), "#c4b5fd"], ["Part B", partB.toFixed(1), "#a78bfa"], ["Total", `${total.toFixed(1)}/575`, g.color]].map(([l, v, c]) => (
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
            style={{ padding: "7px 18px", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "Georgia, serif", fontSize: 12, fontWeight: 700, background: tab === id ? "#4c1d95" : "#e2e8f0", color: tab === id ? "#ddd6fe" : "#475569" }}>
            {label}
          </button>
        ))}
      </div>

      {tab === "form" && (
        <ReviewForm
          person={DEAN_SELF_DATA} deanData={deanData} setDeanData={setDeanData}
          personMode="self" accentColor="#10b981" role="self"
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

// ─── Main Dean Dashboard ──────────────────────────────────────────────────────
export default function DeanDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("directors");
  const [reviewing, setReviewing] = useState(null); // { person, personMode }
  const [dirList, setDirList] = useState(DIRECTOR_LIST);
  const [hodList, setHodList] = useState(HOD_LIST_DEAN);
  const [facList, setFacList] = useState(FACULTY_LIST_DEAN);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const pendingDirs = dirList.filter(d => d.status === "Pending Dean Review").length;
  const pendingHods = hodList.filter(h => h.status === "Director Reviewed").length;
  const pendingFacs = facList.filter(f => f.status === "Director Approved").length;

  const handleSubmit = (id, total, remarks, personMode) => {
    if (personMode === "director") {
      setDirList(prev => prev.map(d => d.id === id ? { ...d, status: "Dean Reviewed", deanTotal: total, deanRemarks: remarks } : d));
    } else if (personMode === "hod") {
      setHodList(prev => prev.map(h => h.id === id ? { ...h, status: "Dean Reviewed", deanTotal: total, deanRemarks: remarks } : h));
    } else if (personMode === "faculty") {
      setFacList(prev => prev.map(f => f.id === id ? { ...f, status: "Dean Reviewed", deanTotal: total, deanRemarks: remarks } : f));
    }
    setReviewing(null);
  };

  const currentList = activeTab === "directors" ? dirList : activeTab === "hods" ? hodList : facList;
  const filterOptions = activeTab === "directors"
    ? ["All", "Pending Dean Review", "Dean Reviewed"]
    : activeTab === "hods"
    ? ["All", "Director Reviewed", "Dean Reviewed"]
    : ["All", "Director Approved", "Dean Reviewed"];

  const filtered = filterStatus === "All" ? currentList : currentList.filter(p => p.status === filterStatus);

  const personModeFor = (tab) => tab === "directors" ? "director" : tab === "hods" ? "hod" : "faculty";

  const NAV = [
    { id: "self",      icon: "👤", label: "My Appraisal",         sub: "Self-assessment form" },
    { id: "directors", icon: "🏛️", label: "Director Reviews",     sub: `${pendingDirs} awaiting review`, badge: pendingDirs },
    { id: "hods",      icon: "👥", label: "HOD Reviews",           sub: `${pendingHods} awaiting review`, badge: pendingHods },
    { id: "faculty",   icon: "📋", label: "Faculty Reviews",       sub: `${pendingFacs} awaiting review`, badge: pendingFacs },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Georgia, serif", background: "#f0ede8", color: "#1e293b" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: 252, minHeight: "100vh", background: "#0f172a", display: "flex", flexDirection: "column", padding: "20px 16px", gap: 14, position: "sticky", top: 0, alignSelf: "flex-start", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,#7c3aed,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 13 }}>FA</div>
          <div>
            <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 13 }}>FacultyAppraise</div>
            <div style={{ color: "#475569", fontSize: 9 }}>D Y Patil International University</div>
          </div>
        </div>

        {/* Role badge */}
        <div style={{ background: "#3b0764", borderRadius: 8, padding: "8px 12px", fontSize: 11, color: "#c4b5fd" }}>
          <div style={{ fontWeight: 700, marginBottom: 2 }}>Dean of Academics</div>
          <div style={{ color: "#6d28d9", fontSize: 10 }}>University-level oversight</div>
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
              <div style={{ background: "#7c3aed", color: "#fff", fontWeight: 800, fontSize: 10, minWidth: 18, height: 18, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px" }}>{tab.badge}</div>
            )}
          </button>
        ))}

        {/* Legend */}
        <div style={{ marginTop: 4, background: "#1e293b", borderRadius: 8, padding: "10px 12px" }}>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#475569", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>Score Columns Legend</div>
          {[
            { color: "#818cf8", label: "HOD Score" },
            { color: "#38bdf8", label: "Director Score" },
            { color: "#a78bfa", label: "Dean Score (you)" },
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
          <Avatar initials={DEAN_USER.avatar} color="#7c3aed" size={34} />
          <div>
            <div style={{ color: "#e2e8f0", fontSize: 11, fontWeight: 700 }}>{DEAN_USER.name.split(" ").slice(0, 2).join(" ")}</div>
            <div style={{ color: "#475569", fontSize: 9 }}>Dean · DYPIU</div>
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

        {/* SELF APPRAISAL */}
        {activeTab === "self" && <SelfAppraisalPanel />}

        {/* LIST VIEWS */}
        {activeTab !== "self" && !reviewing && (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#0f172a", letterSpacing: -0.5 }}>
                  {activeTab === "directors" ? "Director Reviews" : activeTab === "hods" ? "HOD Reviews" : "Faculty Reviews"}
                </h1>
                <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: 11 }}>DYPIU · AY {DEAN_USER.ay}</p>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "#fef3c7", color: "#92400e" }}>
                  ⏳ {activeTab === "directors" ? pendingDirs : activeTab === "hods" ? pendingHods : pendingFacs} Pending
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "#f3e8ff", color: "#6b21a8" }}>
                  ✔ {currentList.filter(p => p.status === "Dean Reviewed").length} Dean Reviewed
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

        {/* REVIEW PANEL */}
        {reviewing && (
          <ReviewPanel
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
