import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./component/common-parts/header/header";
import { MenuComponent } from "./component/common-parts/menu/menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
