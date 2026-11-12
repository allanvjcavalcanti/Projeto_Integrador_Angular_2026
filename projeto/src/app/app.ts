import { Component } from '@angular/core';
import { Gerenciador } from './components/gerenciador/gerenciador';

@Component({
  selector: 'app-root',
  imports: [Gerenciador],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
