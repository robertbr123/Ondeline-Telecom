## 2026-01-17 - [Accessibility Polish for Interactive Elements]
**Learning:** Many icon-only buttons and form inputs were missing basic accessibility markers. In Next.js/Tailwind projects, it's easy to miss label-input associations when using custom styled components instead of full-fledged UI libraries.
**Action:** Always verify that every input has an associated label (even if `sr-only`) and every icon-button has an `aria-label`. Use `aria-live` for async form feedback.
# UX/Accessibility Learnings - Ondeline Telecom

## Feedback and Toasts
- Replaced intrusive browser `alert()` calls with `sonner` toasts for a non-blocking and more professional feedback mechanism.
- Integrated `toast.success()` and `toast.error()` across the admin dashboard (Plans, FAQ, Leads, Settings).
- Ensure the `<Toaster />` component is high enough in the component tree (e.g., in a `Providers` component) to be accessible from all client components.

## Loading Performance
- Implemented a skeleton loading state for the `Plans` component using Tailwind's `animate-pulse`.
- This reduces cumulative layout shift (CLS) and improves perceived performance by showing the structure of the data before it arrives.

## Error Handling
- Created a branded custom 404 page (`app/not-found.tsx`) to maintain brand consistency even when users land on invalid routes.
- Added a clear "Back to Home" call-to-action to prevent dead ends.

## Security and Logging
- Wrapped verbose database logs in `lib/db.ts` with `process.env.NODE_ENV !== 'production'`.
- This prevents sensitive SQL queries and connection parameters from being exposed in production log aggregators.
