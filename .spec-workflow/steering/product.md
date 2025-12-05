# Product Overview

## Product Purpose

This is an Angular v21 enterprise-grade web application built on the **Minimalist Router-First Architecture**. The application serves as a foundation for scalable, maintainable, and high-performance business applications.

## Target Users

- **Enterprise Development Teams**: Building complex, data-driven web applications
- **AI Code Generation Agents**: Following strict architectural rules for consistent code output

## Key Features

1. **Zoneless Architecture**: Leveraging Angular v21's signal-based reactivity for optimal performance
2. **Router-First Design**: URL structure drives application architecture
3. **Hybrid Reactive Pattern**: RxJS for async orchestration, Signals for state and view binding

## Business Objectives

- Deliver a maintainable, scalable codebase that follows enterprise-grade standards
- Enable rapid feature development through consistent patterns and clear boundaries
- Ensure optimal runtime performance through modern Angular v21 features

## Success Metrics

- **Code Consistency**: 100% adherence to architectural rules (no violations)
- **Performance**: All components use OnPush change detection
- **Maintainability**: Zero circular dependencies between modules
- **Quality Assurance**: 100% unit test coverage on Services/Stores; Zero unit tests on Components

## Product Principles

1. **Constitution Over Convention**: Architectural rules are absolute. Violations are bugs.
2. **Signals First**: State management uses Signals; RxJS is internal plumbing only.
3. **Smart/Dumb Separation**: Clear boundaries between container and presentational components.
4. **Modern Syntax Only**: No legacy Angular patterns (decorators, structural directives).
5. **Two-Pillar QA Strategy**: Test logic at the source (TDD for Services), validate UX at the end (E2E for features). **No unit tests for Components** — this is by design, not negligence.

## Future Vision

### Potential Enhancements
- **SSR/Hydration**: Incremental hydration for optimal Core Web Vitals
- **Micro-frontends**: Module federation for team scalability
- **AI-Assisted Development**: Full spec-driven development workflow
