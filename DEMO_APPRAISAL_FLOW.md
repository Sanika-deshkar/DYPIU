# Demo Appraisal Flow

This project now has a small demo setup for showing the complete appraisal workflow with three submitted forms:

1. Engineering faculty appraisal
2. Non-engineering faculty appraisal
3. Non-teaching staff appraisal

## Setup

Run the normal schema first:

```sql
-- supabase/project_complete_schema.sql
```

Then run:

```sql
-- supabase/demo_appraisal_seed.sql
```

The seed is safe to rerun. It upserts the demo profiles and resets the demo submissions to the first pending stage.

## Demo Logins

All demo accounts use password:

```text
demo123
```

Engineering flow:

```text
engg.faculty@demo.local
engg.hod@demo.local
engg.director@demo.local
engg.dean@demo.local
vc@demo.local
```

Non-engineering flow:

```text
nonengg.faculty@demo.local
nonengg.director@demo.local
nonengg.dean@demo.local
vc@demo.local
```

Non-teaching flow:

```text
nonteaching.staff@demo.local
reporting.officer@demo.local
registrar@demo.local
vc@demo.local
```

## Expected Review Paths

Engineering faculty:

```text
Faculty submits -> HOD reviews -> Director reviews -> Engineering Dean reviews -> VC reviews
```

Non-engineering faculty:

```text
Faculty submits -> Director reviews -> Non-Engineering Dean reviews -> VC reviews
```

Non-teaching staff:

```text
Staff submits -> Reporting Officer reviews -> Registrar reviews -> VC reviews
```

## Notes

The email-style demo usernames are also available through the frontend mock-login fallback. The authority review queues require Supabase data, so run the seed SQL when you want the pending forms to appear in dashboards.
