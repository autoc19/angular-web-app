import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8">
      <section class="rounded-3xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 py-8 text-white shadow-lg">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p class="text-sm uppercase tracking-wide text-white/80">Welcome back</p>
            <h1 class="text-3xl font-semibold sm:text-4xl">{{ userName() }}</h1>
            <p class="mt-2 text-white/90">Your admin skeleton is ready to explore.</p>
          </div>
          <div class="flex items-center gap-3">
            <a
              routerLink="/home"
              class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/25"
            >
              Dashboard
              <span aria-hidden="true">→</span>
            </a>
            <a
              routerLink="/auth/login"
              class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              Go to Login
            </a>
          </div>
        </div>
      </section>

      <section class="grid gap-4 md:grid-cols-3">
        <article class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p class="text-sm font-semibold text-gray-500">Status</p>
          <p class="mt-2 text-2xl font-semibold text-gray-900">Online</p>
          <p class="mt-1 text-sm text-gray-600">Services are running smoothly.</p>
        </article>

        <article class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p class="text-sm font-semibold text-gray-500">User</p>
          <p class="mt-2 text-2xl font-semibold text-gray-900">{{ userName() }}</p>
          <p class="mt-1 text-sm text-gray-600">Role: {{ userRole() }}</p>
        </article>

        <article class="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p class="text-sm font-semibold text-gray-500">Quick links</p>
          <div class="mt-3 flex flex-wrap gap-2">
            <a
              routerLink="/home"
              class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
            >
              Home
            </a>
            <a
              routerLink="/auth/login"
              class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-200"
            >
              Login
            </a>
          </div>
        </article>
      </section>
    </div>
  `,
})
export class HomeComponent {
  private readonly authService = inject(AuthService);

  private readonly userSignal = computed(() => this.authService.currentUser());

  userName(): string {
    return this.userSignal()?.name ?? 'Guest';
  }

  userRole(): string {
    return this.userSignal() ? 'Administrator' : 'Visitor';
  }
}
