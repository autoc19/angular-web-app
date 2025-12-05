import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <app-header (menuToggle)="toggleSidebar()"></app-header>

      <div class="flex flex-1 overflow-hidden">
        <app-sidebar [collapsed]="sidebarCollapsed()" class="hidden md:flex"></app-sidebar>

        <main class="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8">
          <div class="rounded-2xl border border-gray-100 bg-white shadow-sm min-h-full p-4 sm:p-6 lg:p-8">
            <router-outlet />
          </div>
        </main>
      </div>

      <app-footer></app-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLayoutComponent {
  readonly sidebarCollapsed = signal(false);

  toggleSidebar(): void {
    this.sidebarCollapsed.update((value) => !value);
  }
}
