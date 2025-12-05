# Project Structure

## Directory Organization

```
angular-web-app/
├── src/
│   ├── app/
│   │   ├── core/                    # 🔒 Singleton Layer
│   │   │   ├── auth/
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── auth.interceptor.ts
│   │   │   ├── layout/
│   │   │   │   ├── header/
│   │   │   │   ├── sidebar/
│   │   │   │   └── footer/
│   │   │   ├── config/
│   │   │   │   └── app.config.ts
│   │   │   └── store/               # Global state (if needed)
│   │   │
│   │   ├── shared/                  # 🔄 Reusable Layer
│   │   │   ├── ui/                  # Dumb/Presentational components
│   │   │   │   ├── button/
│   │   │   │   ├── card/
│   │   │   │   ├── modal/
│   │   │   │   └── table/
│   │   │   ├── pipes/
│   │   │   ├── directives/
│   │   │   └── utils/
│   │   │
│   │   ├── features/                # 📦 Business Layer (Lazy-loaded)
│   │   │   ├── dashboard/
│   │   │   │   ├── dashboard.routes.ts
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   └── ui/              # Feature-specific components
│   │   │   ├── users/
│   │   │   │   ├── users.routes.ts
│   │   │   │   ├── user-list.component.ts
│   │   │   │   ├── user-detail.component.ts
│   │   │   │   └── user.service.ts
│   │   │   └── settings/
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   ├── styles/
│   └── index.html
│
├── docs/                            # Knowledge base
├── e2e/                             # 🧪 E2E Tests (Playwright/Cypress)
│   ├── pages/                       # Page Object Models
│   │   ├── user-list.page.ts
│   │   └── login.page.ts
│   ├── specs/                       # E2E Test Specs
│   │   ├── user-management.e2e.ts
│   │   └── authentication.e2e.ts
│   └── fixtures/                    # Test data
├── .spec-workflow/                  # Spec-driven development
│   ├── steering/
│   ├── specs/
│   └── templates/
└── package.json
```

---

## Naming Conventions

### Files

| Type | Pattern | Example |
|------|---------|---------|
| **Component** | `kebab-case.component.ts` | `user-card.component.ts` |
| **Service** | `kebab-case.service.ts` | `user.service.ts` |
| **Guard** | `kebab-case.guard.ts` | `auth.guard.ts` |
| **Interceptor** | `kebab-case.interceptor.ts` | `auth.interceptor.ts` |
| **Pipe** | `kebab-case.pipe.ts` | `date-format.pipe.ts` |
| **Directive** | `kebab-case.directive.ts` | `highlight.directive.ts` |
| **Routes** | `kebab-case.routes.ts` | `users.routes.ts` |
| **Harness** | `kebab-case.harness.ts` | `user-card.harness.ts` |
| **Spec (Service)** | `kebab-case.service.spec.ts` | `user.service.spec.ts` |
| **Spec (Util/Pipe)** | `kebab-case.spec.ts` | `date-format.pipe.spec.ts` |
| **E2E Test** | `kebab-case.e2e.ts` | `user-management.e2e.ts` |
| **Page Object** | `kebab-case.page.ts` | `user-list.page.ts` |

### Code

| Type | Pattern | Example |
|------|---------|---------|
| **Classes** | `PascalCase` | `UserCardComponent` |
| **Interfaces** | `PascalCase` | `User`, `UserForm` |
| **Functions** | `camelCase` | `calculateTotal()` |
| **Signals** | `camelCase` | `users`, `isLoading` |
| **Constants** | `UPPER_SNAKE_CASE` | `API_URL`, `MAX_RETRIES` |
| **Selectors** | `app-kebab-case` | `app-user-card` |

---

## Import Patterns

### Import Order (Enforced)

```typescript
// 1. Angular core
import { Component, inject, signal } from '@angular/core';

// 2. Angular modules
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 3. Third-party libraries
import { ButtonModule } from 'primeng/button';

// 4. Core layer
import { AuthService } from '@core/auth/auth.service';

// 5. Shared layer
import { CardComponent } from '@shared/ui/card/card.component';

// 6. Feature-local (relative)
import { UserService } from './user.service';
```

### Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@shared/*": ["src/app/shared/*"],
      "@features/*": ["src/app/features/*"]
    }
  }
}
```

---

## Code Structure Patterns

### Component File Structure

```typescript
// 1. Imports
import { Component, ChangeDetectionStrategy, inject, input, output, signal, computed } from '@angular/core';

// 2. Component metadata
@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [/* dependencies */],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'article',
    '[class.selected]': 'isSelected()'
  }
})
export class UserCardComponent {
  // 3. Dependency Injection
  private userService = inject(UserService);

  // 4. Inputs
  user = input.required<User>();
  showActions = input(true);

  // 5. Outputs
  delete = output<string>();
  edit = output<User>();

  // 6. Queries
  avatar = viewChild<ElementRef>('avatar');

  // 7. Internal State (Signals)
  isSelected = signal(false);

  // 8. Computed/Derived State
  fullName = computed(() => 
    `${this.user().firstName} ${this.user().lastName}`
  );

  // 9. Lifecycle (if needed)
  constructor() {
    afterNextRender(() => {
      // DOM-dependent initialization
    });
  }

  // 10. Public Methods (for template)
  onDelete() {
    this.delete.emit(this.user().id);
  }

  // 11. Private Methods
  private validate() { /* ... */ }
}
```

### Service File Structure

```typescript
// ⚠️ TDD REQUIRED: Write user.service.spec.ts FIRST before implementing this file

// 1. Imports
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, switchMap, shareReplay } from 'rxjs';

// 2. Injectable decorator
@Injectable({ providedIn: 'root' })
export class UserService {
  // 3. Dependency Injection
  private http = inject(HttpClient);

  // 4. Private RxJS Subjects (triggers)
  private refresh$ = new BehaviorSubject<void>(void 0);
  private searchTerm$ = new BehaviorSubject<string>('');

  // 5. Private RxJS Streams (processing)
  private usersStream$ = this.refresh$.pipe(
    switchMap(() => this.http.get<User[]>('/api/users')),
    shareReplay(1)
  );

  // 6. Public Signals (exposed to components)
  readonly users = toSignal(this.usersStream$, { initialValue: [] });
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // 7. Computed Signals
  readonly activeUsers = computed(() => 
    this.users().filter(u => u.isActive)
  );

  // 8. Public Methods (actions)
  refresh() {
    this.refresh$.next();
  }

  search(term: string) {
    this.searchTerm$.next(term);
  }

  // 9. Private Methods
  private handleError(err: any) { /* ... */ }
}
```

---

## Module Boundaries

### Dependency Rules

```
┌─────────────────────────────────────────────────────────────┐
│                         FEATURES                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐                     │
│  │Dashboard│  │  Users  │  │Settings │  ← Lazy-loaded      │
│  └────┬────┘  └────┬────┘  └────┬────┘                     │
│       │            │            │                           │
│       │    ❌ No cross-feature imports                      │
│       │            │            │                           │
└───────┼────────────┼────────────┼───────────────────────────┘
        │            │            │
        ▼            ▼            ▼
┌─────────────────────────────────────────────────────────────┐
│                         SHARED                              │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │   UI   │  │ Pipes  │  │Directiv│  │ Utils  │            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
│                                                             │
│  ⚠️ No business logic | No Core service injection          │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                          CORE                               │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐            │
│  │  Auth  │  │ Layout │  │ Config │  │ Store  │            │
│  └────────┘  └────────┘  └────────┘  └────────┘            │
│                                                             │
│  🔒 Singleton services | Global state | App shell          │
└─────────────────────────────────────────────────────────────┘
```

### Allowed Imports Matrix

| From ↓ / To → | Core | Shared | Features |
|---------------|------|--------|----------|
| **Core** | ✅ | ✅ | ❌ |
| **Shared** | ❌ | ✅ | ❌ |
| **Features** | ✅ | ✅ | ❌ (same feature only) |

---

## Code Size Guidelines

| Metric | Limit | Action if Exceeded |
|--------|-------|-------------------|
| **File size** | 300 lines | Split into smaller units |
| **Function size** | 30 lines | Extract helper functions |
| **Component template** | 100 lines | Extract child components |
| **Nesting depth** | 3 levels | Flatten with early returns |
| **Imports per file** | 15 | Consider splitting |

---

## Route Configuration Pattern

### Feature Routes

```typescript
// features/users/users.routes.ts
export const USERS_ROUTES: Routes = [
  {
    path: '',
    component: UserListComponent,
    title: 'Users',
    data: { animation: 'UsersPage' }
  },
  {
    path: ':id',
    loadComponent: () => import('./user-detail.component')
      .then(m => m.UserDetailComponent),
    title: resolveUserTitle,
    canActivate: [authGuard]
  }
];
```

### App Routes (Lazy Loading)

```typescript
// app.routes.ts
export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes')
      .then(m => m.USERS_ROUTES),
    canMatch: [authGuard]
  },
  { path: '**', redirectTo: '/dashboard' }
];
```

---

## Testing File Guidelines (Two-Pillar Strategy)

### What MUST Have `.spec.ts` Files (TDD)

| Artifact | Spec Required | Reason |
|----------|---------------|--------|
| **Services** | ✅ **YES** | Business logic, Signal state, RxJS streams |
| **Stores** | ✅ **YES** | State management logic |
| **Utils** | ✅ **YES** | Pure functions, algorithms |
| **Pipes** | ✅ **YES** | Data transformation logic |
| **Validators** | ✅ **YES** | Form validation rules |
| **Guards** | ✅ **YES** | Route protection logic |

### What MUST NOT Have `.spec.ts` Files

| Artifact | Spec Required | Reason |
|----------|---------------|--------|
| **Dumb Components** | ❌ **NO** | TestBed overhead too high, value too low |
| **Smart Components** | ❌ **NO** | Logic tested via Service specs |
| **Routes Config** | ❌ **NO** | Validated by E2E |
| **Templates** | ❌ **NO** | Validated by E2E |

### AI Directive for Test File Generation

```
When generating code:
1. For *.service.ts → ALWAYS generate *.service.spec.ts FIRST (TDD)
2. For *.pipe.ts → ALWAYS generate *.pipe.spec.ts FIRST
3. For *.component.ts → NEVER generate *.component.spec.ts
4. For completed features → Generate e2e/*.e2e.ts with Page Objects
```

---

## Documentation Standards

### Required Documentation

| Artifact | Documentation |
|----------|---------------|
| **Public Service Methods** | JSDoc with `@param` and `@returns` |
| **Complex Algorithms** | Inline comments explaining logic |
| **Shared Components** | README.md with usage examples |
| **Feature Modules** | README.md with business context |

### JSDoc Example

```typescript
/**
 * Fetches users with optional filtering.
 * 
 * @param filter - Optional filter criteria
 * @returns Signal containing filtered user list
 * 
 * @example
 * const users = userService.getUsers({ role: 'admin' });
 */
getUsers(filter?: UserFilter): Signal<User[]> {
  // implementation
}
```
