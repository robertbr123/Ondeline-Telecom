## 2026-01-17 - [Accessibility Polish for Interactive Elements]
**Learning:** Many icon-only buttons and form inputs were missing basic accessibility markers. In Next.js/Tailwind projects, it's easy to miss label-input associations when using custom styled components instead of full-fledged UI libraries.
**Action:** Always verify that every input has an associated label (even if `sr-only`) and every icon-button has an `aria-label`. Use `aria-live` for async form feedback.
