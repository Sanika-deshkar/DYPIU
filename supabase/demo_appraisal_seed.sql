-- Demo appraisal flow seed data.
-- Run this after project_complete_schema.sql in the Supabase SQL editor.
-- It creates three submitted test appraisals:
-- 1. Engineering faculty: HOD -> Director -> Dean -> VC
-- 2. Non-engineering faculty: Director -> Dean -> VC
-- 3. Non-teaching staff: Reporting Officer -> Registrar -> VC

begin;

insert into public.faculty_profiles (
  email,
  employee_id,
  full_name,
  qualification,
  designation,
  department,
  school,
  teaching_experience,
  phone,
  academic_year,
  appraisal_role,
  avatar
)
values
  (
    'engg.faculty@demo.local',
    'DEMO-ENGG-001',
    'Dr. Asha Engineer',
    'Ph.D',
    'Assistant Professor',
    'Mechanical Engineering',
    'SoEMR - School of Engineering Management & Research',
    '8 Years',
    '+91 90000 00001',
    '2025-2026',
    'faculty',
    'AE'
  ),
  (
    'engg.hod@demo.local',
    'DEMO-ENGG-HOD',
    'Prof. Hemant HOD',
    'Ph.D',
    'Professor & Head',
    'Mechanical Engineering',
    'SoEMR - School of Engineering Management & Research',
    '18 Years',
    '+91 90000 00002',
    '2025-2026',
    'hod',
    'HH'
  ),
  (
    'engg.director@demo.local',
    'DEMO-ENGG-DIR',
    'Dr. Manish Engineering Director',
    'Ph.D',
    'Director',
    null,
    'SoEMR - School of Engineering Management & Research',
    '20 Years',
    '+91 90000 00003',
    '2025-2026',
    'director',
    'MD'
  ),
  (
    'engg.dean@demo.local',
    'DEMO-ENGG-DEAN',
    'Prof. Kavita Engineering Dean',
    'Ph.D',
    'Dean - Engineering',
    'Engineering',
    'SoCSEA - School of Computer Science, Engineering & Applications',
    '22 Years',
    '+91 90000 00004',
    '2025-2026',
    'dean',
    'KD'
  ),
  (
    'nonengg.faculty@demo.local',
    'DEMO-NENG-001',
    'Dr. Nisha Commerce',
    'Ph.D',
    'Assistant Professor',
    null,
    'SoC - School of Commerce & Management',
    '7 Years',
    '+91 90000 00005',
    '2025-2026',
    'faculty',
    'NC'
  ),
  (
    'nonengg.director@demo.local',
    'DEMO-NENG-DIR',
    'Dr. Ritu Commerce Director',
    'Ph.D',
    'Director',
    null,
    'SoC - School of Commerce & Management',
    '19 Years',
    '+91 90000 00006',
    '2025-2026',
    'director',
    'RD'
  ),
  (
    'nonengg.dean@demo.local',
    'DEMO-NENG-DEAN',
    'Prof. Sameer Non-Engineering Dean',
    'Ph.D',
    'Dean - Non Engineering',
    'Non Engineering',
    'SoC - School of Commerce & Management',
    '21 Years',
    '+91 90000 00007',
    '2025-2026',
    'dean',
    'SD'
  ),
  (
    'nonteaching.staff@demo.local',
    'DEMO-NT-001',
    'Ms. Kavya Admin',
    'MBA',
    'Office Assistant',
    'Administration',
    null,
    '5 Years',
    '+91 90000 00008',
    '2025-2026',
    'non_teaching_staff',
    'KA'
  ),
  (
    'reporting.officer@demo.local',
    'DEMO-RO',
    'Mr. Test Reporting Officer',
    'MBA',
    'Reporting Officer',
    'Administration',
    null,
    '12 Years',
    '+91 90000 00009',
    '2025-2026',
    'reporting_officer',
    'RO'
  ),
  (
    'registrar@demo.local',
    'DEMO-REG',
    'Dr. Test Registrar',
    'Ph.D',
    'Registrar',
    'Office of the Registrar',
    null,
    '18 Years',
    '+91 90000 00010',
    '2025-2026',
    'registrar',
    'TR'
  ),
  (
    'vc@demo.local',
    'DEMO-VC',
    'Prof. Anil Deshmukh',
    'Ph.D',
    'Vice Chancellor',
    'Management',
    'University',
    '25 Years',
    '+91 90000 00011',
    '2025-2026',
    'vc',
    'AD'
  )
on conflict (email) do update set
  employee_id = excluded.employee_id,
  full_name = excluded.full_name,
  qualification = excluded.qualification,
  designation = excluded.designation,
  department = excluded.department,
  school = excluded.school,
  teaching_experience = excluded.teaching_experience,
  phone = excluded.phone,
  academic_year = excluded.academic_year,
  appraisal_role = excluded.appraisal_role,
  avatar = excluded.avatar,
  updated_at = now();

insert into public.declarations (
  faculty_email,
  academic_year,
  part_a_total,
  part_b_total,
  grand_total,
  status,
  submitted_at
)
values
  (
    'engg.faculty@demo.local',
    '2025-2026',
    142,
    105,
    247,
    'Pending HOD Review',
    now()
  ),
  (
    'nonengg.faculty@demo.local',
    '2025-2026',
    128,
    80,
    208,
    'Pending Director Review',
    now()
  )
on conflict (faculty_email, academic_year) do update set
  part_a_total = excluded.part_a_total,
  part_b_total = excluded.part_b_total,
  grand_total = excluded.grand_total,
  status = excluded.status,
  submitted_at = excluded.submitted_at,
  updated_at = now();

insert into public.appraisal_snapshots (
  faculty_email,
  academic_year,
  payload
)
values
  (
    'engg.faculty@demo.local',
    '2025-2026',
    '{
      "form": {
        "info": {
          "name": "Dr. Asha Engineer",
          "qual": "Ph.D",
          "desig": "Assistant Professor",
          "school": "SoEMR - School of Engineering Management & Research",
          "department": "Mechanical Engineering",
          "ay": "2025-2026"
        },
        "lectures": [
          { "sem": "Sem I", "code": "ME101", "planned": "40", "conducted": "39", "score": "47.5", "hod": "", "director": "", "dean": "", "vc": "" },
          { "sem": "Sem II", "code": "ME204", "planned": "38", "conducted": "36", "score": "47.5", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "courseFile": [
          { "course": "ME101", "title": "Engineering Mechanics", "details": "Course file completed with lesson plan and assessments.", "score": "18", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "innovDetails": "Used simulation based tutorials and flipped classroom activities.",
        "innovScore": "8",
        "projects": [
          { "label": "Guided two mini-project groups", "score": "8", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "quals": [
          { "label": "Completed NPTEL certification", "score": "8", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "feedback": [
          { "code": "ME101", "fb1": "8.6", "fb2": "8.8", "score": "8.7", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "deptActs": [
          { "activity": "Workshop coordinator", "nature": "Department technical event", "score": "12", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "uniActs": [
          { "activity": "Admissions support", "nature": "University level activity", "score": "15", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "society": [
          { "label": "Social visit", "details": "STEM awareness session", "score": "5", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "industry": [
          { "name": "Demo Industries", "details": "Industrial visit and guest session", "score": "4", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "acr": [
          { "label": "Punctuality", "score": "12", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "journals": [
          { "title": "Smart Maintenance Model", "journal": "Demo Journal of Engineering", "issn": "1234-5678", "index": "Scopus", "score": "30", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "books": [
          { "title": "Applied Mechanics Notes", "book": "Engineering Practice", "issn": "978-0-0000-0000-1", "pub": "Demo Press", "coauth": "No", "first": "Yes", "score": "15", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "ict": [
          { "title": "Virtual Lab Module", "desc": "Video and quiz content", "type": "E-content", "quad": "Q2", "score": "10", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "research": [
          { "degree": "PG", "name": "Student Demo", "thesis": "Thermal analysis prototype", "score": "15", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "projects2": [],
        "patents": [],
        "awards": [],
        "confs": [
          { "title": "Design Thinking in Labs", "type": "Paper presentation", "org": "Demo Conference", "level": "National", "score": "10", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "proposals": [],
        "fdps": [
          { "program": "Outcome Based Education", "duration": "1 week", "org": "AICTE", "score": "5", "hod": "", "director": "", "dean": "", "vc": "" }
        ],
        "training": [],
        "docs": {},
        "sectionSaveStatus": { "partA": true, "partB": true }
      },
      "totals": { "partATotal": 142, "partBTotal": 105, "grandTotal": 247 },
      "submitterProfile": {
        "email": "engg.faculty@demo.local",
        "full_name": "Dr. Asha Engineer",
        "appraisal_role": "faculty",
        "school": "SoEMR - School of Engineering Management & Research",
        "department": "Mechanical Engineering",
        "designation": "Assistant Professor",
        "employee_id": "DEMO-ENGG-001"
      }
    }'::jsonb
  ),
  (
    'nonengg.faculty@demo.local',
    '2025-2026',
    '{
      "form": {
        "info": {
          "name": "Dr. Nisha Commerce",
          "qual": "Ph.D",
          "desig": "Assistant Professor",
          "school": "SoC - School of Commerce & Management",
          "department": "",
          "ay": "2025-2026"
        },
        "lectures": [
          { "sem": "Sem I", "code": "MGT101", "planned": "36", "conducted": "35", "score": "47.5", "director": "", "dean": "", "vc": "" }
        ],
        "courseFile": [
          { "course": "MGT101", "title": "Principles of Management", "details": "Updated course file with rubrics.", "score": "16", "director": "", "dean": "", "vc": "" }
        ],
        "innovDetails": "Case study discussion and peer evaluation.",
        "innovScore": "8",
        "projects": [
          { "label": "Guided capstone business plan team", "score": "8", "director": "", "dean": "", "vc": "" }
        ],
        "quals": [
          { "label": "Completed research methodology FDP", "score": "8", "director": "", "dean": "", "vc": "" }
        ],
        "feedback": [
          { "code": "MGT101", "fb1": "8.4", "fb2": "8.6", "score": "8.5", "director": "", "dean": "", "vc": "" }
        ],
        "deptActs": [
          { "activity": "Commerce club mentoring", "nature": "School activity", "score": "10", "director": "", "dean": "", "vc": "" }
        ],
        "uniActs": [
          { "activity": "Placement readiness session", "nature": "University activity", "score": "12", "director": "", "dean": "", "vc": "" }
        ],
        "society": [
          { "label": "Financial literacy session", "details": "Community outreach", "score": "5", "director": "", "dean": "", "vc": "" }
        ],
        "industry": [
          { "name": "Demo Fintech", "details": "Guest lecture collaboration", "score": "5", "director": "", "dean": "", "vc": "" }
        ],
        "acr": [
          { "label": "Effectiveness", "score": "10", "director": "", "dean": "", "vc": "" }
        ],
        "journals": [
          { "title": "Consumer Analytics Case Study", "journal": "Demo Management Review", "issn": "8765-4321", "index": "UGC Care", "score": "20", "director": "", "dean": "", "vc": "" }
        ],
        "books": [],
        "ict": [
          { "title": "LMS quiz bank", "desc": "Question bank and analytics", "type": "ICT", "quad": "Q1", "score": "10", "director": "", "dean": "", "vc": "" }
        ],
        "research": [],
        "projects2": [],
        "patents": [],
        "awards": [],
        "confs": [
          { "title": "Entrepreneurship Education", "type": "Paper presentation", "org": "Demo Seminar", "level": "State", "score": "10", "director": "", "dean": "", "vc": "" }
        ],
        "proposals": [],
        "fdps": [
          { "program": "NAAC documentation", "duration": "3 days", "org": "DYP IU", "score": "5", "director": "", "dean": "", "vc": "" }
        ],
        "training": [],
        "docs": {},
        "sectionSaveStatus": { "partA": true, "partB": true }
      },
      "totals": { "partATotal": 128, "partBTotal": 80, "grandTotal": 208 },
      "submitterProfile": {
        "email": "nonengg.faculty@demo.local",
        "full_name": "Dr. Nisha Commerce",
        "appraisal_role": "faculty",
        "school": "SoC - School of Commerce & Management",
        "department": "",
        "designation": "Assistant Professor",
        "employee_id": "DEMO-NENG-001"
      }
    }'::jsonb
  )
on conflict (faculty_email, academic_year) do update set
  payload = excluded.payload,
  updated_at = now();

insert into public.non_teaching_appraisals (
  staff_email,
  academic_year,
  payload,
  status,
  self_total,
  ro_total,
  registrar_total,
  vc_total,
  submitted_at
)
values (
  'nonteaching.staff@demo.local',
  '2025-2026',
  '{
    "appraisalType": "non-teaching",
    "submittedByRole": "non_teaching_staff",
    "status": "Submitted",
    "info": {
      "name": "Ms. Kavya Admin",
      "email": "nonteaching.staff@demo.local",
      "employeeId": "DEMO-NT-001",
      "designation": "Office Assistant",
      "department": "Administration",
      "reportingHead": "Mr. Test Reporting Officer",
      "ay": "2025-2026"
    },
    "selfResp": {
      "text": "Handled student document verification, inward/outward register, and daily office correspondence.",
      "marks": "9"
    },
    "selfContrib": {
      "text": "Digitized legacy student records and prepared monthly pending-work summaries.",
      "marks": "8"
    },
    "selfAchieve": {
      "text": "Reduced average certificate processing time during the demo cycle.",
      "marks": "5"
    },
    "partB": {
      "profComp": {},
      "quality": {},
      "personal": {},
      "regular": {}
    },
    "docs": {},
    "remarks": "Submitted for demo appraisal flow.",
    "roRemarks": "",
    "registrarRemarks": "",
    "vcRemarks": ""
  }'::jsonb,
  'Submitted',
  22,
  0,
  0,
  0,
  now()
)
on conflict (staff_email, academic_year) do update set
  payload = excluded.payload,
  status = excluded.status,
  self_total = excluded.self_total,
  ro_total = excluded.ro_total,
  registrar_total = excluded.registrar_total,
  vc_total = excluded.vc_total,
  submitted_at = excluded.submitted_at,
  ro_reviewed_at = null,
  registrar_reviewed_at = null,
  vc_reviewed_at = null,
  updated_at = now();

commit;
