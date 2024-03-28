import {Component, effect, ElementRef, inject, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";

@Component({
  selector: 'lessons',
  standalone: true,
  imports: [],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

  lessonsService = inject(LessonsService);

  search = viewChild.required<ElementRef>('search');

  async onSearch() {

    const query = this.search().nativeElement.value;

    console.log(`search query: ${query}`);

  }

}
