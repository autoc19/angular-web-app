import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-blank-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-gray-900">
      <main class="min-h-screen flex items-center justify-center px-4 py-10">
        <div class="w-full max-w-3xl">
          <router-outlet />
        </div>
      </main>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankLayoutComponent {}
