import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-white border-t border-gray-100 px-4 py-3">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-600">
        <div class="flex items-center gap-2">
          <span
            class="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold"
            aria-hidden="true"
          >
            A
          </span>
          <div class="leading-tight">
            <p class="font-semibold text-gray-900">Angular Web App</p>
            <p class="text-xs text-gray-500">Admin skeleton</p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <a routerLink="/home" class="hover:text-indigo-700 transition-colors">Home</a>
          <a routerLink="/auth/login" class="hover:text-indigo-700 transition-colors">Login</a>
          <span class="text-xs text-gray-400">© {{ currentYear }}</span>
        </div>
      </div>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
}
