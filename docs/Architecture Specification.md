# **Architecture Specification**

**(Based on Doguhan Uluca's "Minimalist Router-First Architecture" & Adapted for v21)**

This document defines the **mandatory architectural standards** for this project. All code generation must strictly adhere to these principles.

## **1\. Folder Structure & Layering (Strict Separation)**

You must enforce a **three-layer architecture**. Circular dependencies or cross-feature imports are strictly forbidden.

## **📂 `src/app/core/` (The Singleton Layer)**

* **Definition:** Code that is loaded **once** (singleton) and globally accessible.

* **Contents:**

  * `auth/`: Authentication logic (AuthService, Guards, Interceptors).

  * `layout/`: Global shell components (Header, Sidebar, Footer).

  * `config/`: Global configuration tokens (API\_URL, AppConfig).

  * `store/`: Global state management (if not feature-specific).

* **Rule:** Never import Feature modules here. Only imported by `app.config` or root routes.

* **Testing:** Services in Core (AuthService, Guards) contain critical logic. **TDD is mandatory** — write Vitest specs first.

## **📂 `src/app/shared/` (The Reusable Layer)**

* **Definition:** Reusable artifacts with **zero business logic**.

* **Contents:**

  * `ui/`: **Dumb/Presentational Components** (Buttons, Cards, Tables). Styled with Tailwind/PrimeNG.

  * `pipes/`: Data formatting helpers.

  * `directives/`: Behavioral modifiers (e.g., `ClickOutside`).

  * `utils/`: Pure helper functions (Date manipulation, Validators).

* **Rule:** Components here must NOT inject Core services. Communication is strictly via `@Input()` (Signals) and `@Output()`.

* **Testing:** **NO unit tests for Dumb Components.** TestBed overhead is too high, value is too low. UI correctness is validated via E2E only.

## **📂 `src/app/features/` (The Business Layer)**

* **Definition:** The application's pages and business domains.

* **Contents:** `dashboard/`, `users/`, `settings/`.

* **Structure per Feature:**

  * `*.routes.ts`: Local route definitions.

  * `*.component.ts`: **Smart/Container Components** (connects to Stores/Services).

  * `ui/`: Feature-specific dumb components (optional, if not generic enough for Shared).

* **Rule:** Features are lazy-loaded. Feature A cannot import from Feature B.

* **Testing:** Smart Components orchestrate logic but do NOT require unit tests. Their correctness is validated by:
  1. **Unit tests on the injected Services/Stores** (TDD)
  2. **E2E tests on the completed feature** (Critical Path)

---

## **2\. Core Architectural Patterns**

## **2.1 Router-First Architecture**

* **Philosophy:** The Router is the backbone of the application, not just a navigation tool.

* **Implementation:**

  * Design the URL structure **before** creating components.

  * Use **Lazy Loading** for all features (`loadChildren` / `loadComponent`).

  * Use **Component Input Binding** (`withComponentInputBinding()`) to pass route params as inputs, avoiding `ActivatedRoute` subscription hell.

## **2.2 Smart vs. Dumb Components**

* **Smart Components (Containers):**

  * Located in `features/`.

  * Inject Services/Stores.

  * Manage data streams (RxJS/Signals).

  * Pass data down to Dumb components.

* **Dumb Components (Presentational):**

  * Located in `shared/ui/`.

  * No dependency injection (except lightweight utils).

  * Purely reactive: UI updates based on Inputs; Logic triggers via Outputs.

## **2.3 Service-as-a-Store (with Signals)**

* **Philosophy:** Manage state in Services, not Components.

* **Implementation (v21 Style):**

  * Use `private _data = signal(...)` for state.

  * Expose `readonly data = this._data.asReadonly()` to the outside.

  * Use **RxJS** for async side effects (HTTP calls) but convert results to **Signals** (`toSignal`) for the view.

  * **NO `BehaviorSubject`** for state unless strictly necessary for complex stream coordination.

---

## **3\. Technical Stack & Standards**

## **3.1 Styling Strategy**

* **Layout & Spacing:** Use **Tailwind CSS** (Utility-first).

* **Complex Components:** Use **PrimeNG** (Datagrid, Datepicker, Dialogs).

* **Customization:** Override PrimeNG styles using Tailwind utilities or CSS variables, never deep selectors if avoidable.

## **3.2 Performance First**

* **Change Detection:** ALL components must use `ChangeDetectionStrategy.OnPush`.

* **Image Optimization:** Use `NgOptimizedImage` (`ngSrc`) for all assets.

* **Deferrable Views:** Use `@defer` for heavy components below the fold.

## **3.3 Form Handling**

* **Reactive Forms:** Use `FormControl` and `FormGroup`.

* **Strict Typing:** Always use Typed Forms. Avoid `any`.

---

## **4. Testing Strategy by Layer (Two-Pillar Alignment)**

This project follows the **"中間鬆，兩頭緊"** (Loose in the Middle, Tight at Both Ends) testing philosophy.

| Layer | What to Test | How | Tool |
| :---- | :---- | :---- | :---- |
| **Core (Services/Stores)** | Business logic, Signal state changes, RxJS streams | **TDD — Spec First** | Vitest |
| **Shared (UI Components)** | **SKIP** — No unit tests | N/A | N/A |
| **Features (Smart Components)** | **SKIP** — No component unit tests | N/A | N/A |
| **Completed Features** | Critical user journeys (Happy Path) | **E2E — Page Object Model** | Cypress/Playwright |

### **AI Directive:**

```
When generating code:
1. For Services/Stores: ALWAYS generate the .spec.ts file FIRST (TDD).
2. For Components (Smart or Dumb): NEVER generate .spec.ts files.
3. For completed features: Generate E2E tests using Page Object pattern.
```

---

這就是架構的「源代碼」。當 AI 讀取這段規則後，它生成的代碼就會自動符合您要求的「企業級」標準。

