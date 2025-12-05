import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-[60vh] grid place-items-center px-6 py-12">
      <div class="max-w-xl space-y-6 text-center">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600"
          aria-live="polite"
        >
          <span class="h-2 w-2 rounded-full bg-rose-500"></span>
          404 · Page not found
        </span>

        <div class="space-y-3">
          <h1 class="text-4xl font-semibold text-gray-900 sm:text-5xl">Lost in space.</h1>
          <p class="text-base text-gray-600">
            The page you are looking for doesn’t exist or was moved. Use the links below to return to a safe place.
          </p>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <a
            routerLink="/home"
            class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Return home
            <span aria-hidden="true">→</span>
          </a>
          <a
            routerLink="/auth/login"
            class="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            Go to login
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NotFoundComponent {}
