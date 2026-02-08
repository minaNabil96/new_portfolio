# Portfolio Enhancement Plan

## Objective
To finalize the portfolio by ensuring all interactive elements are functional and SEO best practices are fully implemented.

## Remaining Tasks

### 1. Functional Project Links
- **Task**: Update `ProjectCard` component to accept a `href` or `demoLink`/`repoLink` prop.
- **Action**: meaningful navigation for "Live Demo" and "Source Code" buttons (even if placeholder `#`).
- **Files**: `src/components/ProjectCard.tsx`, `src/app/[locale]/ml-projects/page.tsx`, `src/app/[locale]/web-projects/page.tsx`.

### 2. SEO Implementation
- **Task**: Add search engine indexing controls.
- **Action**: Create `src/app/robots.ts` and `src/app/sitemap.ts`.
- **Details**: Ensure localized routes are covered.

### 3. Branding Assets
- **Task**: Add a custom favicon matching the new "AP" logo.
- **Action**: Generate `src/app/icon.tsx` (using ImageResponse) or add `public/favicon.ico`.
- **Details**: Gradient "AP" logo.

### 4. Final Polish
- **Task**: Verify all "lorem ipsum" or placeholder behaviors.
- **Action**: Ensure Contact Form provides visual feedback (check console logs or UI toast).
