import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Lesson} from "../models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
  selector: 'lessons',
  standalone: true,
  imports: [
    LessonDetailComponent
  ],
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.scss'
})
export class LessonsComponent {

  lessonsService = inject(LessonsService);

  search = viewChild.required<ElementRef>('search');

  lessons = signal<Lesson[]>([]);

  mode = signal<'search' | 'detail'>('search');

  selectedLesson = signal<Lesson | null>(null);

  constructor() {

  }

  async onSearch() {

    const query = this.search().nativeElement.value;

    const results = await this.lessonsService.searchLessons(query);

    this.lessons.set(results);

  }

  onDetailSelected(lesson: Lesson) {
    this.mode.set('detail');
    this.selectedLesson.set(lesson);
  }

  onCancel() {
    this.mode.set('search');
    this.selectedLesson.set(null);
  }


  onLessonUpdated(lesson: Lesson) {
    this.lessons.update(lessons => lessons.map(l => l.id === lesson.id ? lesson : l));
    this.mode.set('search');
  }

}
