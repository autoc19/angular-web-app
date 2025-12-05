import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center justify-center w-10 h-10 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
          (click)="onToggleMenu()"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <div class="flex items-center gap-2 select-none">
          <span class="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold">
            A
          </span>
          <div class="leading-tight">
            <p class="text-sm font-semibold text-gray-900">Angular Web App</p>
            <p class="text-xs text-gray-500">Skeleton</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 text-sm text-gray-700">
          <span class="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>Online</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="hidden sm:flex flex-col items-end leading-tight">
            <span class="text-sm font-medium text-gray-900">{{ userName() }}</span>
            <span class="text-xs text-gray-500">Administrator</span>
          </div>
          <div class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold uppercase">
            {{ userInitial() }}
          </div>
        </div>
      </div>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);

  @Output() readonly menuToggle = new EventEmitter<void>();

  onToggleMenu(): void {
    this.menuToggle.emit();
  }

  userName(): string {
    return this.authService.currentUser()?.name ?? 'Guest';
  }

  userInitial(): string {
    const name = this.userName().trim();
    return name ? name.charAt(0).toUpperCase() : 'G';
  }
}
