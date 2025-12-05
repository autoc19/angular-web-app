# Requirements Document: Fully Functional Skeleton

## Introduction

This specification defines the requirements for a "Fully Functional Skeleton" application, aiming to establish a solid foundation for an Angular v21 enterprise-grade application. This skeleton will include a complete directory structure, visual system, core service framework, routing network, and developer experience optimizations, enabling subsequent feature development on a consistent and stable foundation.

## Alignment with Product Vision

This spec directly supports the core objectives defined in `product.md`:

- **Zoneless Architecture**: All services and components will follow Signal-based reactive patterns
- **Router-First Design**: The routing table serves as the backbone of the application architecture
- **Hybrid Reactive Pattern**: AuthService will demonstrate the standard pattern of internal RxJS processing + external Signal exposure
- **Constitution Over Convention**: Strict adherence to the technical constitution in `tech.md`, no exceptions

---

## Requirements

### Requirement 1: Directory Structure

**User Story:** As a developer, I want the project directory structure to be physically established according to the Steering documents, so that I have clear boundaries for placing code in Core, Shared, and Features layers.

#### Acceptance Criteria

1. WHEN the project is initialized THEN the system SHALL have the following directory structure:
   ```
   src/app/
   ├── core/
   │   ├── auth/
   │   ├── layout/
   │   │   ├── header/
   │   │   ├── sidebar/
   │   │   └── footer/
   │   ├── config/
   │   └── services/
   ├── shared/
   │   ├── ui/
   │   ├── pipes/
   │   ├── directives/
   │   └── utils/
   └── features/
       ├── home/
       ├── auth/
       └── not-found/
   ```

2. IF a developer creates a new file THEN the system SHALL provide clear folder locations based on the file's responsibility (Core for singletons, Shared for reusables, Features for business logic).

3. WHEN importing modules THEN the system SHALL support path aliases `@core/*`, `@shared/*`, `@features/*` without relative path navigation.

---

### Requirement 2: Visual System

**User Story:** As a developer, I want Tailwind CSS and PrimeNG properly configured with global CSS reset and font settings, so that I can build consistent UI without fighting style conflicts.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL apply Tailwind CSS utility classes globally.

2. WHEN the application loads THEN the system SHALL have PrimeNG theme configured and ready for use.

3. WHEN the application loads THEN the system SHALL apply a CSS reset (normalize/modern-normalize) to ensure cross-browser consistency.

4. WHEN the application loads THEN the system SHALL have a default font family configured (Inter or system fonts) applied globally.

5. IF a developer uses Tailwind utilities alongside PrimeNG components THEN the system SHALL NOT have style conflicts.

---

### Requirement 3: Layout System

**User Story:** As a developer, I want two standard layout templates (blank for pre-login, admin shell for post-login), so that I can wrap pages appropriately based on authentication state.

#### Acceptance Criteria

1. WHEN a user visits a pre-login page (e.g., login page) THEN the system SHALL render a blank/minimal layout without navigation elements.

2. WHEN a user visits a post-login page (e.g., dashboard) THEN the system SHALL render an admin layout with:
   - **Header**: Top navigation bar with app logo and user menu placeholder
   - **Sidebar**: Left navigation menu (collapsible)
   - **Footer**: Bottom bar with copyright/version info
   - **Content Area**: Main content slot using `<router-outlet>`

3. WHEN the sidebar is toggled THEN the system SHALL animate the collapse/expand transition smoothly.

4. IF the viewport is mobile-sized THEN the sidebar SHALL be hidden by default and accessible via hamburger menu.

---

### Requirement 4: Core Services - AuthService

**User Story:** As a developer, I want an AuthService shell with Signal-based state management, so that UI components can reactively respond to authentication state changes.

#### Acceptance Criteria

1. WHEN AuthService is initialized THEN the system SHALL expose the following public Signals:
   - `currentUser: Signal<User | null>` - Current authenticated user
   - `isLoggedIn: Signal<boolean>` - Computed from currentUser
   - `isLoading: Signal<boolean>` - Authentication operation in progress

2. WHEN `login()` method is called THEN the system SHALL update the `currentUser` Signal (mock implementation for now).

3. WHEN `logout()` method is called THEN the system SHALL set `currentUser` to `null`.

4. IF a component reads `isLoggedIn()` THEN the system SHALL return `true` when `currentUser` is not null, `false` otherwise.

5. WHEN AuthService is injected THEN it SHALL be a singleton (providedIn: 'root').

---

### Requirement 5: Core Services - Error Handling & Interceptors

**User Story:** As a developer, I want global error handling and HTTP interceptor frameworks in place, so that I have centralized control over error reporting and HTTP request/response processing.

#### Acceptance Criteria

1. WHEN an unhandled error occurs anywhere in the application THEN the system SHALL catch it via GlobalErrorHandler and log it to console (extensible for future logging services).

2. WHEN an HTTP request is made THEN the system SHALL pass through an AuthInterceptor that can:
   - Attach authorization headers (placeholder)
   - Handle 401/403 responses (placeholder)

3. WHEN an HTTP error occurs THEN the system SHALL pass through an ErrorInterceptor that can:
   - Transform error responses into a consistent format
   - Optionally trigger global error notifications (placeholder)

4. IF interceptors are configured THEN they SHALL be registered in `app.config.ts` using `provideHttpClient(withInterceptors([...]))`.

---

### Requirement 6: Core Services - Configuration

**User Story:** As a developer, I want application configuration centralized and injectable, so that I can access environment-specific settings without hardcoding values.

#### Acceptance Criteria

1. WHEN the application starts THEN the system SHALL provide an `APP_CONFIG` InjectionToken with:
   - `apiUrl: string` - Base API URL
   - `appName: string` - Application name
   - `version: string` - Application version

2. WHEN a service needs configuration THEN it SHALL inject `APP_CONFIG` token instead of importing environment files directly.

3. IF configuration values need to change per environment THEN the system SHALL support overriding via environment-specific providers.

---

### Requirement 7: Routing System

**User Story:** As a developer, I want a complete routing table with lazy loading, guards, and essential pages, so that navigation works correctly from day one.

#### Acceptance Criteria

1. WHEN the application loads THEN the system SHALL have routes configured for:
   - `/` - Redirects to `/home`
   - `/home` - Home page (lazy-loaded)
   - `/auth/login` - Login page (lazy-loaded, blank layout)
   - `/**` - 404 Not Found page

2. WHEN navigating to a feature route THEN the system SHALL lazy-load the feature module using `loadChildren` or `loadComponent`.

3. WHEN a protected route is accessed THEN the system SHALL check `authGuard` (returns `true` for now, placeholder for future implementation).

4. WHEN an unknown route is accessed THEN the system SHALL display a styled 404 page with navigation back to home.

5. IF route transitions occur THEN the system SHALL support future animation hooks via route data.

---

### Requirement 8: Developer Experience

**User Story:** As a developer, I want path aliases configured in tsconfig, so that I can use clean imports like `@core/auth/auth.service` instead of relative paths.

#### Acceptance Criteria

1. WHEN importing from Core layer THEN the system SHALL support `@core/*` alias resolving to `src/app/core/*`.

2. WHEN importing from Shared layer THEN the system SHALL support `@shared/*` alias resolving to `src/app/shared/*`.

3. WHEN importing from Features layer THEN the system SHALL support `@features/*` alias resolving to `src/app/features/*`.

4. IF IDE (VS Code) is used THEN path aliases SHALL provide autocomplete and navigation support.

---

## Non-Functional Requirements

### Code Architecture and Modularity

- **Single Responsibility Principle**: Each file has one purpose (e.g., `auth.service.ts` only handles auth state)
- **Modular Design**: Core, Shared, Features are strictly separated with no circular dependencies
- **Dependency Management**: Features can import from Core and Shared; Shared cannot import from Core; Core cannot import from Features
- **Clear Interfaces**: Services expose Signals as public API; internal RxJS streams are private

### Performance

- **OnPush Change Detection**: All components MUST use `ChangeDetectionStrategy.OnPush`
- **Lazy Loading**: All feature modules MUST be lazy-loaded
- **Zoneless Ready**: No Zone.js dependencies; all state changes via Signals

### Security

- **Interceptor Framework**: HTTP interceptors ready for token attachment and error handling
- **Guard Framework**: Route guards ready for authentication/authorization checks

### Reliability

- **Global Error Handling**: Unhandled errors are caught and logged
- **Consistent Error Format**: HTTP errors transformed to predictable structure

### Usability

- **Responsive Layout**: Admin layout adapts to mobile/tablet/desktop
- **Accessible Navigation**: Keyboard navigable sidebar and header

---

## Acceptance Test

**Final Validation**: After implementing this spec, the following MUST be true:

1. `pnpm start` successfully starts the dev server without errors
2. Browser shows a styled home page with admin layout (header, sidebar, footer)
3. Clicking navigation items switches routes without page reload
4. Console shows no red error messages
5. Visiting `/auth/login` shows blank layout
6. Visiting `/unknown-route` shows styled 404 page
7. All imports use path aliases (`@core/`, `@shared/`, `@features/`)
