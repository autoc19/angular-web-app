import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="space-y-6">
      <div class="space-y-2 text-center">
        <p class="text-sm font-semibold text-indigo-600">Welcome back</p>
        <h1 class="text-3xl font-semibold text-gray-900">Sign in to continue</h1>
        <p class="text-sm text-gray-600">Use your email and password to access the dashboard.</p>
      </div>

      <div class="rounded-3xl border border-gray-100 bg-white/90 shadow-lg shadow-indigo-50">
        <div class="grid gap-0 lg:grid-cols-2">
          <div class="relative overflow-hidden rounded-t-3xl border-b border-gray-100 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 text-white lg:rounded-l-3xl lg:border-b-0">
            <div class="absolute inset-0 opacity-30">
              <div class="absolute inset-12 rounded-2xl border border-white/20 blur-3xl"></div>
            </div>

            <div class="relative space-y-4">
              <span class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium">
                <span class="h-2 w-2 rounded-full bg-emerald-300"></span>
                Secure access enabled
              </span>
              <h2 class="text-2xl font-semibold leading-tight">Stay focused and productive</h2>
              <p class="text-sm text-white/80">
                Manage your admin skeleton with a clean, minimal interface crafted for speed and clarity.
              </p>
              <div class="flex items-center gap-3">
                <div class="h-12 w-12 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-lg font-semibold">
                  🔐
                </div>
                <div>
                  <p class="text-sm font-semibold">Your session is protected</p>
                  <p class="text-xs text-white/75">We use client-side signals to keep your state consistent.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-8">
            <form class="space-y-6" [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="space-y-2">
                <label for="email" class="block text-sm font-semibold text-gray-800">Email address</label>
                <div class="relative">
                  <input
                    id="email"
                    type="email"
                    formControlName="email"
                    autocomplete="email"
                    class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    placeholder="you@example.com"
                  />
                  <span class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">@</span>
                </div>
                <p *ngIf="hasError('email', 'required')" class="text-sm text-rose-600">Email is required.</p>
                <p *ngIf="hasError('email', 'email')" class="text-sm text-rose-600">Enter a valid email.</p>
              </div>

              <div class="space-y-2">
                <label for="password" class="block text-sm font-semibold text-gray-800">Password</label>
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  autocomplete="current-password"
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  placeholder="••••••••"
                />
                <p *ngIf="hasError('password', 'required')" class="text-sm text-rose-600">Password is required.</p>
                <p *ngIf="hasError('password', 'minlength')" class="text-sm text-rose-600">
                  Minimum 6 characters required.
                </p>
              </div>

              <button
                type="submit"
                class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300"
                [disabled]="form.invalid || isLoading()"
              >
                <span *ngIf="isLoading(); else signInText" class="flex items-center gap-2">
                  <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"></span>
                  Signing in...
                </span>
                <ng-template #signInText>Sign in</ng-template>
              </button>

              <p class="text-center text-sm text-gray-600">
                Not a member?
                <a routerLink="/home" class="font-semibold text-indigo-600 hover:text-indigo-700">Return home</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly isLoading = this.authService.isLoading;

  hasError(controlName: 'email' | 'password', errorCode: string): boolean {
    const control = this.form.controls[controlName];
    return control.touched && control.hasError(errorCode);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    await this.authService.login(this.form.getRawValue());
    await this.router.navigateByUrl('/home');
  }
}
