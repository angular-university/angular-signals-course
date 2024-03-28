import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";

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

  lessons = signal<Lesson[]>([]);

  async onSearch() {

    const query = this.search().nativeElement.value;

    const results = await this.lessonsService.searchLessons(query);

    this.lessons.set(results);

  }

}
