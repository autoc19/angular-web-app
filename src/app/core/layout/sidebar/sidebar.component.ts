import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside
      class="bg-white border-r border-gray-100 shadow-sm h-full flex flex-col transition-all duration-200"
      [class.w-64]="!collapsed()"
      [class.w-20]="collapsed()"
      aria-label="Sidebar navigation"
    >
      <div class="px-4 py-4 border-b border-gray-100 flex items-center gap-3">
        <span
          class="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold"
          aria-hidden="true"
        >
          A
        </span>
        @if (!collapsed()) {
          <div class="leading-tight">
            <p class="text-sm font-semibold text-gray-900">Angular Web App</p>
            <p class="text-xs text-gray-500">Navigation</p>
          </div>
        }
      </div>

      <nav class="flex-1 overflow-y-auto px-2 py-3">
        <ul class="space-y-1">
          @for (item of navItems; track item.route) {
            <li>
              <a
                [routerLink]="item.route"
                routerLinkActive="bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                [routerLinkActiveOptions]="{ exact: true }"
                class="group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <span class="text-lg" aria-hidden="true">{{ item.icon }}</span>
                @if (!collapsed()) {
                  <span class="truncate">{{ item.label }}</span>
                } @else {
                  <span class="sr-only">{{ item.label }}</span>
                }
              </a>

              @if (item.children?.length) {
                <ul class="mt-1 space-y-1 pl-3 border-l border-gray-100">
                  @for (child of item.children; track child.route) {
                    <li>
                      <a
                        [routerLink]="child.route"
                        routerLinkActive="text-indigo-700"
                        class="group flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-indigo-700 transition-colors"
                      >
                        <span class="text-base" aria-hidden="true">{{ child.icon }}</span>
                        @if (!collapsed()) {
                          <span class="truncate">{{ child.label }}</span>
                        } @else {
                          <span class="sr-only">{{ child.label }}</span>
                        }
                      </a>
                    </li>
                  }
                </ul>
              }
            </li>
          }
        </ul>
      </nav>

      <div class="px-3 py-3 border-t border-gray-100 flex items-center gap-3">
        <div
          class="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold uppercase"
          aria-hidden="true"
        >
          {{ userInitial() }}
        </div>
        @if (!collapsed()) {
          <div class="leading-tight">
            <p class="text-sm font-semibold text-gray-900">{{ userName() }}</p>
            <p class="text-xs text-gray-500">Online</p>
          </div>
        }
      </div>
    </aside>
  `,
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);

  readonly collapsed = input(false);

  readonly navItems: NavItem[] = [
    { label: 'Home', icon: '🏠', route: '/home' },
    { label: 'Login', icon: '🔐', route: '/auth/login' },
  ];

  userName(): string {
    return this.authService.currentUser()?.name ?? 'Guest';
  }

  userInitial(): string {
    const name = this.userName().trim();
    return name ? name.charAt(0).toUpperCase() : 'G';
  }
}
