# Angular v21 Technical Constitution

> **This document is the supreme law for all code generation. Violations are bugs.**

> ⚡ **ZONELESS APPLICATION**: This application runs without Zone.js. Do not rely on Zone.js for change detection. All async updates must trigger Signals explicitly.

---

## 🚨 Priority 1: The Immutable Core

*Source: Architecture Specification & Reactive Patterns Strategy*

These rules are **absolute**. No exceptions.

### 1.1 Directory Structure (Strict Layering)

```
src/app/
├── core/           # Singleton layer (loaded once)
│   ├── auth/       # AuthService, Guards, Interceptors
│   ├── layout/     # Header, Sidebar, Footer
│   ├── config/     # InjectionTokens, AppConfig
│   └── store/      # Global state (if not feature-specific)
├── shared/         # Reusable layer (zero business logic)
│   ├── ui/         # Dumb/Presentational components
│   ├── pipes/      # Data formatting
│   ├── directives/ # Behavioral modifiers
│   └── utils/      # Pure helper functions
└── features/       # Business layer (lazy-loaded)
    └── {feature}/
        ├── *.routes.ts
        ├── *.component.ts  # Smart/Container components
        └── ui/             # Feature-specific dumb components
```

**Rules:**
- ❌ **FORBIDDEN**: Circular dependencies
- ❌ **FORBIDDEN**: Feature A importing from Feature B
- ❌ **FORBIDDEN**: Core importing from Features
- ❌ **FORBIDDEN**: Shared components injecting Core services

---

### 1.2 State Management: RxJS + Signals Boundary

**The Golden Rule**: RxJS stays inside Services; Signals go outside to Components.

```
┌─────────────────────────────────────────────────────────┐
│  SERVICE (Internal)                                     │
│  ┌─────────────────┐    ┌─────────────────────────────┐ │
│  │ BehaviorSubject │───▶│ RxJS Pipeline               │ │
│  │ Subject         │    │ (switchMap, debounce, etc.) │ │
│  └─────────────────┘    └──────────────┬──────────────┘ │
│                                        │                │
│                              toSignal()│                │
│                                        ▼                │
│                         ┌──────────────────────────────┐│
│                         │ readonly signal = toSignal() ││
│                         └──────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
                                         │
                                         ▼ PUBLIC API
┌─────────────────────────────────────────────────────────┐
│  COMPONENT (External)                                   │
│  service.users()  ◀── Signal consumption only          │
│  {{ users() }}                                          │
└─────────────────────────────────────────────────────────┘
```

#### ✅ DO: Declarative Data Fetching

```typescript
// Service
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private refresh$ = new BehaviorSubject<void>(void 0);

  // Private RxJS stream
  private usersStream$ = this.refresh$.pipe(
    switchMap(() => this.http.get<User[]>('/api/users')),
    shareReplay(1)
  );

  // Public Signal (the ONLY way to expose data)
  readonly users = toSignal(this.usersStream$, { initialValue: [] });

  refresh() {
    this.refresh$.next();
  }
}
```

#### ❌ DO NOT: Manual Subscriptions in Components

```typescript
// FORBIDDEN - Never do this
@Component({...})
export class BadComponent {
  data: any;
  
  ngOnInit() {
    // ❌ VIOLATION: Manual subscribe in component
    this.service.getData().subscribe(d => this.data = d);
  }
}
```

#### ✅ DO: Signal Consumption in Components

```typescript
@Component({...})
export class GoodComponent {
  private userService = inject(UserService);
  
  // Direct signal consumption - no subscribe needed
  users = this.userService.users;
  
  // Derived state with computed
  activeUsers = computed(() => 
    this.users().filter(u => u.isActive)
  );
}
```

---

### 1.3 Smart vs Dumb Components

| Aspect | Smart (Container) | Dumb (Presentational) |
|--------|-------------------|----------------------|
| **Location** | `features/{name}/` | `shared/ui/` |
| **DI** | Injects Services/Stores | No DI (except utils) |
| **State** | Manages data streams | Stateless |
| **Communication** | Reads from Services | Input/Output only |
| **Change Detection** | OnPush | OnPush |

---

## 🚨 Priority 2: Modern Coding Standards

*Source: Angular v21 Distilled Documentation*

These rules define **how** we write code. Legacy patterns are forbidden.

### 2.1 Component Metadata

```typescript
// ✅ REQUIRED for ALL components
@Component({
  selector: 'app-user-card',
  standalone: true,                              // MANDATORY
  changeDetection: ChangeDetectionStrategy.OnPush, // MANDATORY
  imports: [/* only what's needed */],
  templateUrl: './user-card.component.html',
})
export class UserCardComponent {}
```

### 2.2 Signal Inputs & New Outputs

#### ❌ DO NOT: Decorator-based I/O

```typescript
// FORBIDDEN - Legacy decorators
@Input() name: string = '';
@Input({ required: true }) id!: number;
@Output() delete = new EventEmitter<string>();
```

#### ✅ DO: Function-based I/O

```typescript
// REQUIRED - Signal Inputs & New Outputs
name = input('');                    // Signal<string>
id = input.required<number>();       // Signal<number>
delete = output<string>();           // OutputEmitterRef<string>

// With transform
disabled = input(false, {
  transform: (v: string | boolean) => v === '' || v === true
});
```

### 2.3 Control Flow Syntax

#### ❌ DO NOT: Structural Directives

```html
<!-- FORBIDDEN -->
<div *ngIf="isLoggedIn; else loginTpl">Welcome</div>
<li *ngFor="let item of items; trackBy: trackById">{{ item.name }}</li>
<div [ngSwitch]="status">...</div>
```

#### ✅ DO: Built-in Control Flow

```html
<!-- REQUIRED -->
@if (user(); as u) {
  <user-profile [data]="u" />
} @else if (loading()) {
  <spinner />
} @else {
  <login-form />
}

<!-- @for MUST have track expression -->
@for (item of items(); track item.id; let i = $index) {
  <li>{{ i + 1 }}. {{ item.name }}</li>
} @empty {
  <li>No items found.</li>
}

@switch (status()) {
  @case ('active') { <span class="badge-green">Active</span> }
  @case ('pending') { <span class="badge-yellow">Pending</span> }
  @default { <span class="badge-gray">Unknown</span> }
}
```

### 2.4 Signal Queries

#### ❌ DO NOT: Decorator Queries

```typescript
// FORBIDDEN
@ViewChild('chart') chartEl!: ElementRef;
@ContentChildren(TabComponent) tabs!: QueryList<TabComponent>;
```

#### ✅ DO: Signal Queries

```typescript
// REQUIRED
chartEl = viewChild<ElementRef>('chart');           // Signal<ElementRef | undefined>
requiredChart = viewChild.required<ElementRef>('chart'); // Signal<ElementRef>
items = viewChildren(ListItemComponent);            // Signal<ListItemComponent[]>
header = contentChild(HeaderComponent);             // Signal<HeaderComponent | undefined>
```

### 2.5 Dependency Injection

```typescript
// ✅ REQUIRED: Use inject() function
@Component({...})
export class UserComponent {
  private http = inject(HttpClient);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
}

// ❌ FORBIDDEN: Constructor injection
constructor(private http: HttpClient) {} // DO NOT USE
```

### 2.6 Lifecycle & Cleanup

```typescript
// ✅ REQUIRED: Use DestroyRef for cleanup
constructor() {
  inject(DestroyRef).onDestroy(() => {
    // cleanup logic
  });
}

// ✅ REQUIRED: Use afterNextRender for DOM access
constructor() {
  afterNextRender(() => {
    // Safe to access DOM here (SSR-compatible)
    this.chart.init();
  });
}

// ✅ REQUIRED: Use takeUntilDestroyed for subscriptions
constructor() {
  interval(1000).pipe(
    takeUntilDestroyed()
  ).subscribe(console.log);
}
```

---

## ⚠️ Priority 3: Quality & Consistency

*Source: QA Testing Standards & Angular v21 Testing Guide*

### 3.1 Testing Strategy: Two-Pillar Approach

| Phase | Target | Tool | Action |
|-------|--------|------|--------|
| Logic Design | Services, Stores, Utils | **Vitest** | TDD - Write spec first |
| UI Construction | Dumb Components | **Skip** | No unit tests |
| Feature Integration | Smart Components | **Manual** | Developer verification |
| Feature Completion | Critical Paths | **Playwright/Cypress** | E2E tests |

### 3.2 Component Testing with Harnesses

```typescript
// ✅ REQUIRED: Use Component Harness, not querySelector
it('should display user name', async () => {
  const loader = TestbedHarnessEnvironment.loader(fixture);
  const card = await loader.getHarness(UserCardHarness);
  
  expect(await card.getName()).toBe('John Doe');
});

// ❌ FORBIDDEN: Direct DOM queries in tests
fixture.nativeElement.querySelector('.name').textContent; // DO NOT USE
```

### 3.3 Global Error Handler

```typescript
// REQUIRED: Implement in app.config.ts
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('Unhandled error:', error);
    // Send to logging service (Sentry, LogRocket, etc.)
  }
}

// providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }]
```

---

## ℹ️ Priority 4: UI & Styling

*Reference guidance only*

### 4.1 Technology Stack

- **Layout & Spacing**: Tailwind CSS (utility-first)
- **Complex Components**: PrimeNG (DataGrid, Datepicker, Dialogs)
- **Customization**: Override via Tailwind utilities or CSS variables

### 4.2 Image Optimization

```html
<!-- ✅ REQUIRED: Use NgOptimizedImage -->
<img 
  ngSrc="user.jpg" 
  width="400" 
  height="400"
  priority  <!-- Add for LCP images -->
/>

<!-- ❌ FORBIDDEN -->
<img src="user.jpg" alt="User">
```

### 4.3 Accessibility

- Use semantic HTML (`<button>`, `<input>`) over `<div>`
- Bind ARIA attributes to Signals: `[attr.aria-expanded]="isOpen()"`
- Ensure keyboard navigation for all interactive elements

### 4.4 Performance Checklist

- [ ] All components use `ChangeDetectionStrategy.OnPush`
- [ ] All images use `ngSrc` with `width`/`height`
- [ ] Heavy components wrapped in `@defer (on viewport)`
- [ ] No expensive functions in template expressions (use `computed()`)

---

## Quick Reference: Forbidden vs Required

| Category | ❌ Forbidden | ✅ Required |
|----------|-------------|-------------|
| **Inputs** | `@Input()` | `input()` / `input.required()` |
| **Outputs** | `@Output()` + `EventEmitter` | `output()` |
| **Queries** | `@ViewChild` / `@ContentChild` | `viewChild()` / `contentChild()` |
| **Control Flow** | `*ngIf` / `*ngFor` / `*ngSwitch` | `@if` / `@for` / `@switch` |
| **DI** | Constructor injection | `inject()` function |
| **Subscriptions** | Manual `.subscribe()` in components | `toSignal()` / Signal consumption |
| **Change Detection** | Default | `OnPush` |
| **Components** | NgModule-based | `standalone: true` |
| **Images** | `<img src="">` | `<img ngSrc="">` |
