import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/common-parts/header/header';
import { MenuComponent } from './component/common-parts/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  router = inject(Router);

  hideLayout(): boolean {
    const url = this.router.url;

    return url.startsWith('/auth');
  }
}
