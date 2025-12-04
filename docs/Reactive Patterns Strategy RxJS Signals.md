# **Reactive Patterns Strategy: RxJS \+ Signals**

**(Essential Distillation for AI Code Generation)**

**Context:** Angular v21.  
**Goal:** Leverage the best of both worlds — RxJS for complex async orchestration, Signals for synchronous reactivity and view binding.

## **1\. The Golden Rule: Separation of Concerns**

* **RxJS** is for **Events & Streams** (The "How" \- Processing over time).  
* **Signals** are for **State & View** (The "What" \- Current value).  
* **Boundary:** The Service boundary. RxJS stays inside; Signals go outside (to Components).

## **2\. Pattern: Declarative Data Fetching (Read)**

**❌ Anti-Pattern (Imperative):**  
Calling a method to manually subscribe.

typescript  
*`// BAD`*  
`data: any;`  
`ngOnInit() {`  
  `this.service.getData().subscribe(d => this.data = d);`  
`}`

**✅ Pro-Pattern (Declarative):**  
Define the stream source, transform it, and expose it as a Signal.

typescript  
*`// Service`*  
`private refresh$ = new BehaviorSubject<void>(void 0); // Trigger`

*`// Private Stream (RxJS)`*  
`private usersStream$ = this.refresh$.pipe(`  
  `switchMap(() => this.http.get<User[]>('/api/users')),`  
  `shareReplay(1) // Caching strategy`  
`);`

*`// Public Signal (Interop)`*  
*`// component can read this directly: service.users()`*  
`readonly users = toSignal(this.usersStream$, { initialValue: [] });`

## **3\. Pattern: Action Streams (Write/Trigger)**

Handle user interactions as streams to utilize RxJS operators (debounce, distinctUntilChanged).

typescript  
*`// Service`*  
`private searchSubject$ = new Subject<string>();`

*`// Public method for component to call`*  
`search(term: string) {`  
  `this.searchSubject$.next(term);`  
`}`

*`// Private processing stream`*  
`private searchResults$ = this.searchSubject$.pipe(`  
  `debounceTime(300),`  
  `distinctUntilChanged(),`  
  ``switchMap(term => this.http.get(`/api/search?q=${term}`)),``  
  `catchError(err => {`  
    `this.error.set(err.message); // Update error signal`  
    `return of([]); // Recover`  
  `})`  
`);`

*`// Public Signal`*  
`readonly results = toSignal(this.searchResults$, { initialValue: [] });`

## **4\. Pattern: Derived State (Computed)**

Do not use RxJS `map` or `combineLatest` for simple synchronous calculations. Use Signal `computed`.

typescript  
*`// Service or Component`*  
`readonly users = toSignal(...);`  
`readonly filter = signal('');`

*`// Efficient, memoized derivation`*  
`readonly filteredUsers = computed(() => {`  
  `const users = this.users();`  
  `const filter = this.filter().toLowerCase();`  
  `return users.filter(u => u.name.toLowerCase().includes(filter));`  
`});`

## **5\. Summary of Rules for AI**

When implementing a feature:

1. **Input:** Capture user intents via `Subject` or `Signal.set()`.  
2. **Process:** Use **RxJS** pipeline for anything async (HTTP, timers, debouncing).  
3. **Output:** Always convert the final Observable stream to a **Signal** using `toSignal()` before exposing it to the Component.  
4. **View:** The Component template MUST consume the Signal (e.g., `{{ users() }}`), effectively eliminating the need for `AsyncPipe` or manual subscriptions.

---

將這段內容交給 AI，它就會明白：**「啊，原來我要做的是一個將 RxJS 封裝在內部的黑盒子，對外只暴露乾淨的 Signals。」** 這是目前 Angular 開發最高級的形態。

