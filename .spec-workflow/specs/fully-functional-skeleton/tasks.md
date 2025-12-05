# Tasks Document: Fully Functional Skeleton

## Phase 1: Project Foundation & Developer Experience

- [ ] 1. Configure path aliases in tsconfig
  - **Files**: `tsconfig.json`, `tsconfig.app.json`
  - Configure `@core/*`, `@shared/*`, `@features/*` path aliases
  - Ensure IDE autocomplete and navigation support
  - **Purpose**: Enable clean imports throughout the application
  - _Leverage: Existing tsconfig.json structure_
  - _Requirements: 8.1, 8.2, 8.3, 8.4_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Configuration Specialist | Task: Configure path aliases in tsconfig.json and tsconfig.app.json for @core/*, @shared/*, @features/* resolving to src/app/core/*, src/app/shared/*, src/app/features/* respectively | Restrictions: Do not modify other compiler options, ensure baseUrl is set correctly, maintain existing tsconfig structure | _Leverage: Existing tsconfig.json configuration | _Requirements: 8.1, 8.2, 8.3, 8.4 | Success: Path aliases resolve correctly, IDE provides autocomplete for aliased imports, no TypeScript compilation errors | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 2. Create directory structure with placeholder files
  - **Files**: Multiple `.gitkeep` files across `core/`, `shared/`, `features/` directories
  - Create all directories as specified in design.md
  - Add `.gitkeep` files to empty directories
  - **Purpose**: Establish physical directory structure for layered architecture
  - _Leverage: design.md File Creation Checklist_
  - _Requirements: 1.1, 1.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Project Structure Architect | Task: Create the complete directory structure for core/, shared/, and features/ layers with all subdirectories as specified in design.md, adding .gitkeep files to empty directories | Restrictions: Do not create any actual component files yet, only directories and .gitkeep placeholders, follow exact structure from design.md | _Leverage: design.md Project Structure section | _Requirements: 1.1, 1.2 | Success: All directories exist as specified, .gitkeep files present in empty directories, structure matches design.md exactly | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

---

## Phase 2: Visual System Setup

- [ ] 3. Configure global styles with Tailwind CSS
  - **File**: `src/styles.css`
  - Import Tailwind CSS v4
  - Add CSS reset (via Tailwind preflight)
  - Configure global font family (Inter/system fonts)
  - Set base body styles
  - **Purpose**: Establish consistent visual foundation
  - _Leverage: Tailwind CSS v4 already in package.json_
  - _Requirements: 2.1, 2.3, 2.4_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: CSS Architecture Specialist | Task: Configure src/styles.css with Tailwind CSS v4 import, CSS reset via preflight, global font-family using Inter/system fonts, and base body styles (bg-gray-50, text-gray-900) | Restrictions: Use Tailwind v4 syntax (@import "tailwindcss"), do not add component-specific styles, keep global styles minimal | _Leverage: Tailwind CSS v4 in package.json, @tailwindcss/postcss plugin | _Requirements: 2.1, 2.3, 2.4 | Success: Tailwind utilities work globally, CSS reset applied, fonts render correctly, no style conflicts | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 4. Configure PrimeNG theme in app.config.ts
  - **File**: `src/app/app.config.ts`
  - Add `providePrimeNG()` with Aura theme
  - Configure animations provider
  - **Purpose**: Enable PrimeNG components with consistent theming
  - _Leverage: @primeuix/themes package, existing app.config.ts_
  - _Requirements: 2.2, 2.5_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Configuration Specialist | Task: Update src/app/app.config.ts to add providePrimeNG() with Aura theme from @primeuix/themes, and provideAnimationsAsync() for PrimeNG animations | Restrictions: Do not remove existing providers, use Aura theme specifically, follow Angular v21 standalone configuration patterns | _Leverage: @primeuix/themes package, primeng 21.0.0-rc.1 | _Requirements: 2.2, 2.5 | Success: PrimeNG components render with Aura theme, animations work, no console errors | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

---

## Phase 3: Core Services

- [ ] 5. Create auth types and interfaces
  - **File**: `src/app/core/auth/auth.types.ts`
  - Define `User` interface (id, email, name, avatar?)
  - Define `LoginCredentials` interface (email, password)
  - **Purpose**: Establish type safety for authentication
  - _Leverage: design.md Data Models section_
  - _Requirements: 4.1_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer | Task: Create src/app/core/auth/auth.types.ts with User interface (id: string, email: string, name: string, avatar?: string) and LoginCredentials interface (email: string, password: string) | Restrictions: Use strict TypeScript types, no any types, follow project naming conventions | _Leverage: design.md Data Models section | _Requirements: 4.1 | Success: Interfaces compile without errors, types are exported and importable | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 6. Implement AuthService with Signal-based state
  - **File**: `src/app/core/auth/auth.service.ts`
  - Create singleton service with `providedIn: 'root'`
  - Implement `currentUser` WritableSignal
  - Implement `isLoggedIn` computed Signal
  - Implement `isLoading` WritableSignal
  - Add `login()` and `logout()` methods (mock implementation)
  - **Purpose**: Central authentication state management
  - _Leverage: tech.md Signal patterns, auth.types.ts_
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Service Developer specializing in Signals | Task: Create src/app/core/auth/auth.service.ts as singleton service with WritableSignal for currentUser and isLoading, computed Signal for isLoggedIn, and mock login()/logout() methods following tech.md patterns | Restrictions: Use inject() function not constructor injection, expose only readonly Signals publicly, use WritableSignal internally, follow Zoneless patterns | _Leverage: tech.md Section 1.2 State Management, auth.types.ts | _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5 | Success: Service is injectable, Signals update correctly on login/logout, isLoggedIn computed from currentUser | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 7. Create auth guard (placeholder)
  - **File**: `src/app/core/auth/auth.guard.ts`
  - Implement functional `authGuard` using `CanActivateFn`
  - Return `true` for now (placeholder)
  - Add TODO comment for future implementation
  - **Purpose**: Route protection framework
  - _Leverage: Angular Router guards, design.md_
  - _Requirements: 7.3_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Router Specialist | Task: Create src/app/core/auth/auth.guard.ts with functional authGuard using CanActivateFn that returns true (placeholder), with TODO comment for future AuthService.isLoggedIn() integration | Restrictions: Use functional guard pattern not class-based, do not inject AuthService yet, keep implementation minimal | _Leverage: Angular Router CanActivateFn | _Requirements: 7.3 | Success: Guard exports correctly, returns true, can be used in route configuration | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 8. Create auth interceptor (placeholder)
  - **File**: `src/app/core/auth/auth.interceptor.ts`
  - Implement functional `authInterceptor` using `HttpInterceptorFn`
  - Pass through requests unchanged (placeholder)
  - Add TODO comments for token attachment and 401 handling
  - **Purpose**: HTTP authentication framework
  - _Leverage: Angular HttpClient interceptors_
  - _Requirements: 5.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular HTTP Specialist | Task: Create src/app/core/auth/auth.interceptor.ts with functional authInterceptor using HttpInterceptorFn that passes requests through unchanged, with TODO comments for future token attachment and 401/403 handling | Restrictions: Use functional interceptor pattern, do not modify requests yet, keep as passthrough placeholder | _Leverage: Angular HttpInterceptorFn | _Requirements: 5.2 | Success: Interceptor exports correctly, requests pass through unchanged, can be registered in app.config.ts | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 9. Create APP_CONFIG injection token
  - **File**: `src/app/core/config/app-config.ts`
  - Define `AppConfig` interface
  - Create `APP_CONFIG` InjectionToken
  - Export default configuration values
  - **Purpose**: Centralized application configuration
  - _Leverage: Angular InjectionToken pattern_
  - _Requirements: 6.1, 6.2, 6.3_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular DI Specialist | Task: Create src/app/core/config/app-config.ts with AppConfig interface (apiUrl, appName, version), APP_CONFIG InjectionToken, and DEFAULT_APP_CONFIG constant with placeholder values | Restrictions: Use InjectionToken pattern, make config values environment-agnostic placeholders, export all types | _Leverage: Angular InjectionToken | _Requirements: 6.1, 6.2, 6.3 | Success: Token is injectable, interface is exported, default config provides all required values | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 10. Create GlobalErrorHandler
  - **File**: `src/app/core/services/error.handler.ts`
  - Implement `ErrorHandler` interface
  - Log errors to console
  - Add TODO for future logging service integration
  - **Purpose**: Centralized error handling
  - _Leverage: Angular ErrorHandler interface_
  - _Requirements: 5.1_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Error Handling Specialist | Task: Create src/app/core/services/error.handler.ts implementing Angular ErrorHandler interface, logging errors to console with timestamp and stack trace, with TODO for future logging service (Sentry/LogRocket) | Restrictions: Implement ErrorHandler interface exactly, do not throw errors, keep logging simple for now | _Leverage: Angular ErrorHandler interface | _Requirements: 5.1 | Success: Handler catches unhandled errors, logs to console, can be registered as provider | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 11. Create error interceptor (placeholder)
  - **File**: `src/app/core/services/error.interceptor.ts`
  - Implement functional `errorInterceptor` using `HttpInterceptorFn`
  - Catch HTTP errors and log to console
  - Add TODO for error transformation and notifications
  - **Purpose**: HTTP error handling framework
  - _Leverage: Angular HttpInterceptorFn, RxJS catchError_
  - _Requirements: 5.3_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular HTTP Error Specialist | Task: Create src/app/core/services/error.interceptor.ts with functional errorInterceptor using HttpInterceptorFn that catches HTTP errors, logs to console, and rethrows, with TODO for error transformation and toast notifications | Restrictions: Use functional interceptor pattern, use RxJS catchError operator, rethrow errors after logging | _Leverage: Angular HttpInterceptorFn, RxJS catchError | _Requirements: 5.3 | Success: Interceptor catches HTTP errors, logs details, errors still propagate to callers | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

---

## Phase 4: Layout Components

- [ ] 12. Create NavItem model
  - **File**: `src/app/core/layout/sidebar/nav-item.model.ts`
  - Define `NavItem` interface (label, icon, route, children?)
  - **Purpose**: Type-safe navigation configuration
  - _Leverage: design.md Data Models_
  - _Requirements: 3.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer | Task: Create src/app/core/layout/sidebar/nav-item.model.ts with NavItem interface (label: string, icon: string, route: string, children?: NavItem[]) | Restrictions: Keep interface simple, support nested navigation, use strict types | _Leverage: design.md Data Models | _Requirements: 3.2 | Success: Interface compiles, supports recursive children, exportable | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 13. Create HeaderComponent
  - **File**: `src/app/core/layout/header/header.component.ts`
  - Standalone component with OnPush change detection
  - Display app logo/name, menu toggle button, user menu placeholder
  - Use `output()` for menuToggle event
  - Style with Tailwind CSS
  - **Purpose**: Top navigation bar for admin layout
  - _Leverage: tech.md component patterns, AuthService, APP_CONFIG_
  - _Requirements: 3.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Component Developer | Task: Create src/app/core/layout/header/header.component.ts as standalone component with OnPush, displaying app logo, hamburger menu toggle button (output() for menuToggle event), and user menu placeholder, styled with Tailwind CSS | Restrictions: Use standalone: true, OnPush change detection, output() not @Output, inject() not constructor, use @if/@for control flow | _Leverage: tech.md Section 2.1-2.5, AuthService, APP_CONFIG | _Requirements: 3.2 | Success: Component renders header bar, menu toggle emits event, responsive design, no console errors | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 14. Create SidebarComponent
  - **File**: `src/app/core/layout/sidebar/sidebar.component.ts`
  - Standalone component with OnPush change detection
  - Use `input()` for collapsed state
  - Display navigation items using NavItem model
  - Highlight active route
  - Style with Tailwind CSS, support collapse animation
  - **Purpose**: Left navigation menu
  - _Leverage: tech.md component patterns, Router, NavItem model_
  - _Requirements: 3.2, 3.3, 3.4_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Component Developer | Task: Create src/app/core/layout/sidebar/sidebar.component.ts as standalone component with OnPush, input() for collapsed state, displaying NavItem array with routerLink, active route highlighting via routerLinkActive, collapse/expand animation with Tailwind CSS | Restrictions: Use standalone: true, OnPush, input() not @Input, inject() for Router, use @for control flow with track, responsive collapse behavior | _Leverage: tech.md Section 2.1-2.5, Router, NavItem model | _Requirements: 3.2, 3.3, 3.4 | Success: Component renders nav items, highlights active route, collapses smoothly, responsive | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 15. Create FooterComponent
  - **File**: `src/app/core/layout/footer/footer.component.ts`
  - Standalone component with OnPush change detection
  - Display copyright and version from APP_CONFIG
  - Style with Tailwind CSS
  - **Purpose**: Bottom bar with app info
  - _Leverage: tech.md component patterns, APP_CONFIG_
  - _Requirements: 3.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Component Developer | Task: Create src/app/core/layout/footer/footer.component.ts as standalone component with OnPush, injecting APP_CONFIG to display copyright year and app version, styled with Tailwind CSS | Restrictions: Use standalone: true, OnPush, inject() for APP_CONFIG, keep footer simple and minimal | _Leverage: tech.md Section 2.1-2.5, APP_CONFIG | _Requirements: 3.2 | Success: Component renders footer with version, copyright displays current year, styled correctly | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 16. Create AdminLayoutComponent
  - **File**: `src/app/core/layout/admin-layout/admin-layout.component.ts`
  - Standalone component with OnPush change detection
  - Compose Header, Sidebar, Footer with router-outlet
  - Manage sidebar collapsed state with Signal
  - Responsive behavior for mobile/tablet/desktop
  - **Purpose**: Post-login shell layout
  - _Leverage: tech.md component patterns, layout child components_
  - _Requirements: 3.2, 3.3, 3.4_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Layout Architect | Task: Create src/app/core/layout/admin-layout/admin-layout.component.ts as standalone component with OnPush, composing HeaderComponent, SidebarComponent, FooterComponent with router-outlet, managing sidebar collapsed state via Signal, responsive breakpoints (mobile: hidden, tablet: collapsed, desktop: expanded) | Restrictions: Use standalone: true, OnPush, signal() for collapsed state, import child components, use @if for responsive logic | _Leverage: tech.md Section 2.1-2.5, Header/Sidebar/Footer components | _Requirements: 3.2, 3.3, 3.4 | Success: Layout renders all sections, sidebar toggles correctly, responsive behavior works, router-outlet displays content | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 17. Create BlankLayoutComponent
  - **File**: `src/app/core/layout/blank-layout/blank-layout.component.ts`
  - Standalone component with OnPush change detection
  - Minimal layout with only router-outlet
  - Center content vertically and horizontally
  - **Purpose**: Pre-login shell layout
  - _Leverage: tech.md component patterns_
  - _Requirements: 3.1_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Component Developer | Task: Create src/app/core/layout/blank-layout/blank-layout.component.ts as standalone component with OnPush, containing only router-outlet centered vertically and horizontally using Tailwind CSS flex utilities | Restrictions: Use standalone: true, OnPush, minimal template, no business logic | _Leverage: tech.md Section 2.1 | _Requirements: 3.1 | Success: Component renders centered content area, router-outlet works, clean minimal design | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

---

## Phase 5: Feature Pages

- [ ] 18. Create HomeComponent
  - **File**: `src/app/features/home/home.component.ts`
  - Standalone component with OnPush change detection
  - Display welcome message with user name from AuthService
  - Simple dashboard placeholder content
  - **Purpose**: Landing page after login
  - _Leverage: tech.md component patterns, AuthService_
  - _Requirements: 7.1_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Feature Developer | Task: Create src/app/features/home/home.component.ts as standalone component with OnPush, injecting AuthService to display welcome message with user name (or "Guest"), simple dashboard placeholder cards styled with Tailwind CSS | Restrictions: Use standalone: true, OnPush, inject() for AuthService, consume Signals directly in template, use @if control flow | _Leverage: tech.md Section 2.1-2.5, AuthService | _Requirements: 7.1 | Success: Component renders welcome message, shows user name when logged in, placeholder content displays | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 19. Create home routes
  - **File**: `src/app/features/home/home.routes.ts`
  - Define `HOME_ROUTES` with lazy-loaded HomeComponent
  - **Purpose**: Feature routing configuration
  - _Leverage: structure.md route patterns_
  - _Requirements: 7.1, 7.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Router Developer | Task: Create src/app/features/home/home.routes.ts exporting HOME_ROUTES array with default path loading HomeComponent via loadComponent, setting title to 'Home' | Restrictions: Use loadComponent for lazy loading, follow structure.md route patterns, keep routes simple | _Leverage: structure.md Route Configuration Pattern | _Requirements: 7.1, 7.2 | Success: Routes export correctly, lazy loading works, title set correctly | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 20. Create LoginComponent
  - **File**: `src/app/features/auth/login/login.component.ts`
  - Standalone component with OnPush change detection
  - Simple login form with email/password fields
  - Call AuthService.login() on submit (mock)
  - Navigate to /home on success
  - Style with Tailwind CSS and PrimeNG inputs
  - **Purpose**: Authentication entry point
  - _Leverage: tech.md component patterns, AuthService, Router_
  - _Requirements: 7.1_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Feature Developer | Task: Create src/app/features/auth/login/login.component.ts as standalone component with OnPush, simple login form with email/password using PrimeNG InputText and Button, calling AuthService.login() on submit, navigating to /home on success via Router | Restrictions: Use standalone: true, OnPush, inject() for services, use Reactive Forms or template-driven, style with Tailwind + PrimeNG | _Leverage: tech.md Section 2.1-2.5, AuthService, Router, PrimeNG | _Requirements: 7.1 | Success: Form renders correctly, login triggers AuthService, navigation works, styled properly | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 21. Create auth routes
  - **File**: `src/app/features/auth/auth.routes.ts`
  - Define `AUTH_ROUTES` with login path
  - **Purpose**: Auth feature routing
  - _Leverage: structure.md route patterns_
  - _Requirements: 7.1, 7.2_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Router Developer | Task: Create src/app/features/auth/auth.routes.ts exporting AUTH_ROUTES array with 'login' path loading LoginComponent via loadComponent, setting title to 'Login' | Restrictions: Use loadComponent for lazy loading, follow structure.md patterns | _Leverage: structure.md Route Configuration Pattern | _Requirements: 7.1, 7.2 | Success: Routes export correctly, lazy loading works | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 22. Create NotFoundComponent
  - **File**: `src/app/features/not-found/not-found.component.ts`
  - Standalone component with OnPush change detection
  - Display 404 message with link back to home
  - Style with Tailwind CSS
  - **Purpose**: Handle unknown routes gracefully
  - _Leverage: tech.md component patterns, Router_
  - _Requirements: 7.4_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Feature Developer | Task: Create src/app/features/not-found/not-found.component.ts as standalone component with OnPush, displaying styled 404 message with "Page Not Found" heading and routerLink back to /home, using Tailwind CSS for centered layout | Restrictions: Use standalone: true, OnPush, routerLink not navigate(), keep design simple but polished | _Leverage: tech.md Section 2.1, Router | _Requirements: 7.4 | Success: Component renders 404 message, link navigates to home, styled appropriately | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

---

## Phase 6: Application Wiring

- [ ] 23. Configure app.routes.ts with complete routing
  - **File**: `src/app/app.routes.ts`
  - Configure root redirect to /home
  - Set up AdminLayout with protected routes (home)
  - Set up BlankLayout with auth routes (login)
  - Add wildcard route for 404
  - Apply authGuard to protected routes
  - **Purpose**: Complete application routing
  - _Leverage: design.md Routing Design, layout components, guards_
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Router Architect | Task: Update src/app/app.routes.ts with complete routing: redirect '' to '/home', AdminLayoutComponent wrapper with authGuard for /home (lazy load HOME_ROUTES), BlankLayoutComponent wrapper for /auth (lazy load AUTH_ROUTES), wildcard ** for NotFoundComponent | Restrictions: Use loadChildren for feature routes, apply authGuard to admin routes, follow design.md routing structure exactly | _Leverage: design.md Routing Design, AdminLayout, BlankLayout, authGuard | _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5 | Success: All routes work correctly, layouts apply to correct routes, lazy loading works, 404 catches unknown routes | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 24. Update app.config.ts with all providers
  - **File**: `src/app/app.config.ts`
  - Add provideHttpClient with interceptors
  - Add APP_CONFIG provider with default values
  - Add GlobalErrorHandler provider
  - Ensure PrimeNG and animations are configured
  - **Purpose**: Complete application configuration
  - _Leverage: All core services and interceptors_
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Configuration Architect | Task: Update src/app/app.config.ts to include provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])), APP_CONFIG provider with DEFAULT_APP_CONFIG, ErrorHandler provider with GlobalErrorHandler, ensure providePrimeNG and provideAnimationsAsync are present | Restrictions: Maintain existing providers, use withInterceptors() for functional interceptors, follow Angular v21 patterns | _Leverage: All core services, interceptors, APP_CONFIG | _Requirements: 5.1, 5.2, 5.3, 5.4, 6.1 | Success: All providers registered, interceptors chain correctly, error handler catches errors, PrimeNG works | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

- [ ] 25. Update app.component.ts as minimal shell
  - **File**: `src/app/app.component.ts`
  - Standalone component with OnPush
  - Template contains only router-outlet
  - Remove default Angular template content
  - **Purpose**: Clean application entry point
  - _Leverage: tech.md component patterns_
  - _Requirements: All_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Angular Component Developer | Task: Update src/app/app.component.ts to be minimal standalone component with OnPush, template containing only <router-outlet />, remove all default Angular boilerplate content | Restrictions: Use standalone: true, OnPush, minimal imports (RouterOutlet only), no styles needed | _Leverage: tech.md Section 2.1 | _Requirements: All | Success: Component renders router-outlet only, no default content, clean minimal shell | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_

---

## Phase 7: Verification

- [ ] 26. Final verification and smoke test
  - Run `pnpm start` and verify no errors
  - Test navigation between routes
  - Verify layouts apply correctly
  - Check console for errors
  - Verify path aliases work in imports
  - **Purpose**: Validate acceptance criteria
  - _Leverage: All implemented components_
  - _Requirements: All acceptance tests_
  - _Prompt: Implement the task for spec fully-functional-skeleton, first run spec-workflow-guide to get the workflow guide then implement the task: Role: QA Engineer | Task: Run pnpm start, verify application starts without errors, test navigation (home, login, 404), verify AdminLayout shows for /home, BlankLayout for /auth/login, check console for red errors, verify all imports use @core/@shared/@features aliases | Restrictions: Do not modify code, only verify and document issues, create bug list if any failures | _Leverage: All implemented components and routes | _Requirements: All acceptance tests from requirements.md | Success: App starts, all routes work, layouts correct, no console errors, aliases resolve | After implementation: 1) Mark task as in-progress [-] in tasks.md before starting, 2) Use log-implementation tool to record artifacts after completion, 3) Mark task as complete [x] in tasks.md_
