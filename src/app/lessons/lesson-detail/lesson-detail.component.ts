import {Component, inject, input, output} from '@angular/core';
import {Lesson} from "../../models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";
import {LessonsService} from "../../services/lessons.service";
import {MessagesService} from "../../messages/messages.service";

@Component({
    selector: 'lesson-detail',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();
  cancel = output();

  lessonsService = inject(LessonsService);
  messagesService = inject(MessagesService);

  onCancel() {
    this.cancel.emit();
  }

  async onSave(description:string) {
    try {
      const lesson = this.lesson();
      const updatedLesson =
        await this.lessonsService.saveLesson(lesson!.id, {description});
     this.lessonUpdated.emit(updatedLesson);
    }
    catch(err) {
      console.error(err);
      this.messagesService.showMessage(`
      Error saving lesson!`, 'error')
    }

  }
}
