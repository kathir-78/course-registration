import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  template:`
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Error!</strong>
      <span class="block sm:inline">An unexpected error has occurred. Please try again later.</span>
    </div>
  `
})
export class ErrorComponent {

}
