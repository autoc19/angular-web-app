# Tasks Document: Fully Functional Skeleton

> **QA Strategy**: This spec follows the **Two-Pillar Strategy** ("中間鬆，兩頭緊").
> - **Pillar 1 (TDD)**: Services, Guards, Interceptors → Write `.spec.ts` FIRST, then implement
> - **Pillar 2 (E2E)**: Completed features → Write Playwright tests with Page Objects
> - **No Component Tests**: Layout and Feature components have NO unit tests

---

## Phase 1: Project Foundation & Testing Infrastructure

### 1.1 Developer Experience Setup

- [ ] 1. Configure path aliases in tsconfig
  - **Files**: `tsconfig.json`, `tsconfig.app.json`
  - Configure `@core/*`, `@shared/*`, `@features/*` path aliases
  - **Success**: Path aliases resolve correctly, IDE provides autocomplete
  - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 2. Create directory structure with placeholder files
  - **Files**: Multiple `.gitkeep` files across `core/`, `shared/`, `features/` directories
  - Include `e2e/pages/` and `e2e/specs/` directories for E2E tests
  - **Success**: All directories exist as specified in design.md
  - _Requirements: 1.1, 1.2, 9.3_

### 1.2 Testing Infrastructure

- [ ] 3. Configure Vitest for unit testing
  - **Files**: `vitest.config.ts`, `src/test-setup.ts`
  - Configure Vitest with Angular testing utilities
  - Add `pnpm test` script to package.json
  - **Success**: `pnpm test` runs without errors (no tests yet)
  - _Requirements: 9.5_

- [ ] 4. Configure Playwright for E2E testing
  - **Files**: `playwright.config.ts`, `e2e/` directory structure
  - Configure Playwright with base URL pointing to dev server
  - Add `pnpm e2e` script to package.json
  - Create Page Object base class in `e2e/pages/base.page.ts`
  - **Success**: `pnpm e2e` runs without errors (no tests yet)
  - _Requirements: 9.3, 9.6_

---

## Phase 2: Visual System Setup

- [ ] 5. Configure global styles with Tailwind CSS
  - **File**: `src/styles.css`
  - Import Tailwind CSS v4, CSS reset, global fonts
  - **Success**: Tailwind utilities work globally
  - _Requirements: 2.1, 2.3, 2.4_

- [ ] 6. Configure PrimeNG theme in app.config.ts
  - **File**: `src/app/app.config.ts`
  - Add `providePrimeNG()` with Aura theme
  - **Success**: PrimeNG components render with Aura theme
  - _Requirements: 2.2, 2.5_

---

## Phase 3: Core Services (TDD Workflow)

> **CRITICAL**: Each Service task has TWO sub-tasks:
> 1. **Spec First**: Write the `.spec.ts` file with test cases
> 2. **Implementation**: Write the code to pass the tests

### 3.1 Auth Types (No TDD - Pure Types)

- [ ] 7. Create auth types and interfaces
  - **File**: `src/app/core/auth/auth.types.ts`
  - Define `User`, `LoginCredentials` interfaces
  - **Success**: Types compile without errors
  - _Requirements: 4.1_

### 3.2 AuthService (TDD)

- [ ] 8. **[SPEC FIRST]** Write AuthService unit tests
  - **File**: `src/app/core/auth/auth.service.spec.ts`
  - Test cases:
    - `login()` should update `currentUser` signal with user data
    - `login()` should set `isLoading` to true during operation, false after
    - `logout()` should set `currentUser` to null
    - `isLoggedIn` should return true when currentUser is not null
    - `isLoggedIn` should return false when currentUser is null
  - **Success**: Tests compile but FAIL (no implementation yet)
  - _Requirements: 9.1, 9.2_

- [ ] 9. Implement AuthService to pass tests
  - **File**: `src/app/core/auth/auth.service.ts`
  - Implement Signal-based state management
  - **Success**: All AuthService tests PASS
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

### 3.3 AuthGuard (TDD)

- [ ] 10. **[SPEC FIRST]** Write AuthGuard unit tests
  - **File**: `src/app/core/auth/auth.guard.spec.ts`
  - Test cases:
    - Should return true when user is logged in
    - Should redirect to /auth/login when user is not logged in
  - **Success**: Tests compile but FAIL
  - _Requirements: 9.1, 9.2_

- [ ] 11. Implement AuthGuard to pass tests
  - **File**: `src/app/core/auth/auth.guard.ts`
  - Implement functional guard with AuthService injection
  - **Success**: All AuthGuard tests PASS
  - _Requirements: 7.3_

### 3.4 AuthInterceptor (TDD)

- [ ] 12. **[SPEC FIRST]** Write AuthInterceptor unit tests
  - **File**: `src/app/core/auth/auth.interceptor.spec.ts`
  - Test cases:
    - Should pass through requests when no token
    - Should attach Authorization header when token exists (placeholder)
    - Should handle 401 response by triggering logout (placeholder)
  - **Success**: Tests compile but FAIL
  - _Requirements: 9.1, 9.2_

- [ ] 13. Implement AuthInterceptor to pass tests
  - **File**: `src/app/core/auth/auth.interceptor.ts`
  - Implement functional interceptor
  - **Success**: All AuthInterceptor tests PASS
  - _Requirements: 5.2_

### 3.5 APP_CONFIG (No TDD - Pure Config)

- [ ] 14. Create APP_CONFIG injection token
  - **File**: `src/app/core/config/app-config.ts`
  - Define `AppConfig` interface and InjectionToken
  - **Success**: Token is injectable
  - _Requirements: 6.1, 6.2, 6.3_

### 3.6 Error Handling (TDD)

- [ ] 15. **[SPEC FIRST]** Write GlobalErrorHandler unit tests
  - **File**: `src/app/core/services/error.handler.spec.ts`
  - Test cases:
    - Should log error to console with timestamp
    - Should not throw when handling error
  - **Success**: Tests compile but FAIL
  - _Requirements: 9.1, 9.2_

- [ ] 16. Implement GlobalErrorHandler to pass tests
  - **File**: `src/app/core/services/error.handler.ts`
  - Implement ErrorHandler interface
  - **Success**: All GlobalErrorHandler tests PASS
  - _Requirements: 5.1_

- [ ] 17. **[SPEC FIRST]** Write ErrorInterceptor unit tests
  - **File**: `src/app/core/services/error.interceptor.spec.ts`
  - Test cases:
    - Should pass through successful responses
    - Should log HTTP errors to console
    - Should rethrow errors after logging
  - **Success**: Tests compile but FAIL
  - _Requirements: 9.1, 9.2_

- [ ] 18. Implement ErrorInterceptor to pass tests
  - **File**: `src/app/core/services/error.interceptor.ts`
  - Implement functional interceptor with catchError
  - **Success**: All ErrorInterceptor tests PASS
  - _Requirements: 5.3_

### 3.7 Unit Test Verification Checkpoint

- [ ] 19. Verify all unit tests pass
  - Run `pnpm test`
  - All 5 spec files should pass:
    - `auth.service.spec.ts`
    - `auth.guard.spec.ts`
    - `auth.interceptor.spec.ts`
    - `error.handler.spec.ts`
    - `error.interceptor.spec.ts`
  - **Success**: `pnpm test` exits with code 0, all tests green
  - _Requirements: 9.5_

---

## Phase 4: Layout Components (NO Unit Tests)

> **NOTE**: These components have NO `.spec.ts` files per Two-Pillar Strategy.
> UI correctness is validated by E2E tests in Phase 7.

- [ ] 20. Create NavItem model
  - **File**: `src/app/core/layout/sidebar/nav-item.model.ts`
  - **Success**: Interface compiles
  - _Requirements: 3.2_

- [ ] 21. Create HeaderComponent
  - **File**: `src/app/core/layout/header/header.component.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Component renders header bar
  - _Requirements: 3.2_

- [ ] 22. Create SidebarComponent
  - **File**: `src/app/core/layout/sidebar/sidebar.component.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Component renders nav items
  - _Requirements: 3.2, 3.3, 3.4_

- [ ] 23. Create FooterComponent
  - **File**: `src/app/core/layout/footer/footer.component.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Component renders footer
  - _Requirements: 3.2_

- [ ] 24. Create AdminLayoutComponent
  - **File**: `src/app/core/layout/admin-layout/admin-layout.component.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Layout composes all sections
  - _Requirements: 3.2, 3.3, 3.4_

- [ ] 25. Create BlankLayoutComponent
  - **File**: `src/app/core/layout/blank-layout/blank-layout.component.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Minimal layout renders
  - _Requirements: 3.1_

---

## Phase 5: Feature Pages (NO Unit Tests)

> **NOTE**: Feature components have NO `.spec.ts` files per Two-Pillar Strategy.

- [ ] 26. Create HomeComponent and routes
  - **Files**: `home.component.ts`, `home.routes.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Home page renders
  - _Requirements: 7.1, 7.2_

- [ ] 27. Create LoginComponent and routes
  - **Files**: `login.component.ts`, `auth.routes.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: Login form renders
  - _Requirements: 7.1, 7.2_

- [ ] 28. Create NotFoundComponent
  - **File**: `not-found.component.ts`
  - **NO SPEC FILE** - validated by E2E
  - **Success**: 404 page renders
  - _Requirements: 7.4_

---

## Phase 6: Application Wiring

- [ ] 29. Configure app.routes.ts with complete routing
  - **File**: `src/app/app.routes.ts`
  - Configure layouts, guards, lazy loading
  - **Success**: All routes work correctly
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 30. Update app.config.ts with all providers
  - **File**: `src/app/app.config.ts`
  - Register interceptors, error handler, config
  - **Success**: All providers registered
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1_

- [ ] 31. Update app.component.ts as minimal shell
  - **File**: `src/app/app.component.ts`
  - Template contains only router-outlet
  - **Success**: Clean minimal shell
  - _Requirements: All_

---

## Phase 7: E2E Testing (Pillar 2)

> **CRITICAL**: Now that the feature is complete, write E2E tests to validate user journeys.

### 7.1 Page Objects

- [ ] 32. Create Page Objects for E2E tests
  - **Files**:
    - `e2e/pages/layout.page.ts` - AdminLayout selectors (header, sidebar, footer)
    - `e2e/pages/home.page.ts` - Home page selectors
    - `e2e/pages/login.page.ts` - Login form selectors
    - `e2e/pages/not-found.page.ts` - 404 page selectors
  - **Success**: Page Objects encapsulate all selectors
  - _Requirements: 9.3_

### 7.2 E2E Test Specs

- [ ] 33. Write navigation E2E test
  - **File**: `e2e/specs/navigation.e2e.ts`
  - Test cases:
    - User can navigate from home to login
    - User can navigate back to home
    - Unknown route shows 404 page
    - 404 page has link back to home
  - **Success**: Navigation tests pass
  - _Requirements: 9.3_

- [ ] 34. Write layout E2E test
  - **File**: `e2e/specs/layout.e2e.ts`
  - Test cases:
    - Admin layout shows header with app name
    - Admin layout shows sidebar with navigation items
    - Admin layout shows footer with version
    - Blank layout shows only content (no header/sidebar/footer)
  - **Success**: Layout tests pass
  - _Requirements: 9.3_

- [ ] 35. Write auth flow E2E test
  - **File**: `e2e/specs/auth-flow.e2e.ts`
  - Test cases:
    - User can fill login form
    - User can submit login and navigate to home
    - Home page shows welcome message
  - **Success**: Auth flow tests pass
  - _Requirements: 9.3_

---

## Phase 8: Final Verification

- [ ] 36. Run all unit tests
  - Command: `pnpm test`
  - **Success**: All Service/Guard/Interceptor specs pass
  - _Requirements: 9.5_

- [ ] 37. Run all E2E tests
  - Command: `pnpm e2e`
  - **Success**: All E2E specs pass
  - _Requirements: 9.6_

- [ ] 38. Verify no component spec files exist
  - Check that NO `.spec.ts` files exist for:
    - `HeaderComponent`
    - `SidebarComponent`
    - `FooterComponent`
    - `AdminLayoutComponent`
    - `BlankLayoutComponent`
    - `HomeComponent`
    - `LoginComponent`
    - `NotFoundComponent`
  - **Success**: Zero component spec files
  - _Requirements: 9.4, 9.10_

- [ ] 39. Final smoke test
  - Run `pnpm start`
  - Manually verify:
    - Home page renders with admin layout
    - Login page renders with blank layout
    - 404 page renders for unknown routes
    - Console shows no red errors
  - **Success**: Application fully functional
  - _Requirements: All acceptance tests_

---

## Summary: Task Count by Type

| Category | Tasks | Has Spec? |
|----------|-------|-----------|
| **Infrastructure** | 4 | N/A |
| **Visual System** | 2 | N/A |
| **Services (TDD)** | 12 | ✅ YES - spec first |
| **Layout Components** | 6 | ❌ NO |
| **Feature Components** | 3 | ❌ NO |
| **App Wiring** | 3 | N/A |
| **E2E Tests** | 4 | N/A |
| **Verification** | 4 | N/A |
| **Total** | 39 | |

### Definition of "Done" for This Spec

1. ✅ `pnpm test` passes (all Service/Guard/Interceptor specs green)
2. ✅ `pnpm e2e` passes (all E2E specs green)
3. ✅ Zero `.spec.ts` files for Components
4. ✅ Application runs without console errors
