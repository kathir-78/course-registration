import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buttons',
  imports: [RouterLink],
  standalone: true,
  template: `
  
  <div>
  @if (route()) {
        <button 
          [routerLink]="route()" 
          class="bg-sky-300 hover:bg-sky-600 px-1.5 py-2 rounded-md w-full text-sm sm:text-base md:text-lg lg:text-xl my-4 cursor-pointer"
        >
          {{ label() }}
        </button>
      } @else {
        <button 
          (click)="onClick()"
          class="bg-sky-300 hover:bg-sky-600 px-1.5 py-2 rounded-md w-full text-sm sm:text-base md:text-lg lg:text-xl my-4 cursor-pointer"
        >
          {{ label() }}
        </button>
      }  </div>
  `,
})
export class ButtonsComponent {
  label = input.required<string>();
  route = input<string>('');
  buttonClicked = output<void>();

  onClick() {
    this.buttonClicked.emit();
  }
}
