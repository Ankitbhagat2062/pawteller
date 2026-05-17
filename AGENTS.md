# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
# Pawteller Coding Agent Guidelines

You are an expert software engineer specializing in bleeding-edge Next.js 15+, React 19, Tailwind CSS v4, TypeScript, and Biome. Your goal is to help build **Pawteller**—a premium, high-performance, SEO-first pet care asset.

## 🚨 Architectural Pillars
1. **Performance First:** Maximize Core Web Vitals. Minimal client-side JavaScript.
2. **SEO-First:** Semantic HTML, exact metadata utilization, zero Layout Shifts (CLS).
3. **Clean Code:** Adhere to Biome rules and strict TypeScript. No duplicate components.

## 🛠 Tech Stack & Version Guardrails

### 1. Next.js 15 & React 19 Strict Paradigms
- **Server Components by Default:** All files in the App Router (`src/app`) must be React Server Components (RSC) unless interactivity is explicitly required.
- **Client Components:** Use `"use client"` *only* at the leaf-node level (e.g., individual form inputs, specific quiz step cards). Keep the wrapper layouts as Server Components.
- **React Compiler Active:** Do NOT write manual optimization hooks like `useMemo`, `useCallback`, or `React.memo`. The React Compiler auto-optimizes clean code. Write clean, standard JavaScript/TypeScript following the strict Rules of React.
- **Async APIs Warning:** In Next.js 15+, `params`, `searchParams`, and `headers` are **asynchronous**. You must `await` them before reading properties (e.g., `const { slug } = await params;`). Never read them synchronously.

### 2. Tailwind CSS v4 Warning (No Mismatched Syntax)
- **Zero Config Files:** Tailwind v4 does NOT use a `tailwind.config.js` file. Configuration happens entirely inside `src/app/globals.css` using the `@theme` directive. Do not look for or try to create a JavaScript configuration file.
- **Valid Class Syntax:** Only write core Tailwind utility classes. Do not use deprecated v3 plugins or syntax variants.

### 3. UI Components, Icons, and Primitives
- **Do NOT build custom primitive UI components** (e.g., custom buttons, dialog wrappers, form inputs, toast configurations).
- **Do NOT write raw inline SVGs** or build custom icon components for standard UI indicators.
- **Mandatory Stack Choice:** Always check for and use **shadcn/ui** components for primitives and **lucide-react** for iconography (which is completely tree-shakable).
- **Isolation Rule:** All shared UI primitives, third-party component code, and shadcn setups must live strictly isolated inside `src/components/ui/`. Never scatter atomic design elements inside application logic folders.

### 4. Linting & Formatting (Biome over ESLint)
- Do NOT add ESLint comments or Prettier config rules. Code must strictly comply with Biome linting rules. 
- Use standard, clean imports. Group them cleanly: built-in React/Next hooks first, local absolute paths (`@/*`) second.

### 5. Absolute Path Aliases
- Always use the absolute path alias `@/*` targeting the `src/` directory.
- **NEVER** use deep relative paths (e.g., `../../../../components`).
- Example: `import { Button } from '@/components/ui/button'`

### 6. Styling & Layout
- Use mobile-first Tailwind utility classes.
- Ensure all layout containers designed for future Google AdSense slots have strict minimum height thresholds (e.g., `min-h-[250px]`) explicitly set to eliminate Cumulative Layout Shift (CLS).

### 7. UI Philosophy
- Premium, minimal, warm, and highly professional pet-brand aesthetic.
- No heavy, bloated animation libraries (e.g., Framer Motion). Use native Tailwind CSS transitions for UI state changes.

## 📁 Project Directory Mapping
- All source code lives explicitly in `src/`.
- `src/app/` -> App Router views, dynamic layout wrappers, and API route handlers.
- `src/components/ui/` -> Atomic, reusable primitive components (shadcn primitives, buttons, inputs, cards, toast configurations).
- `src/components/calculators/` -> Pure custom interactive math/logic blocks for the individual pet calculators.