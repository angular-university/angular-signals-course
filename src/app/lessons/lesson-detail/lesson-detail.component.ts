import {Component, input, model, output} from '@angular/core';
import {Lesson} from "../../models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'lesson-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './lesson-detail.component.html',
  styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {

  lesson = model<Lesson | null>();

  cancel = output();

  async onSave() {

  }

  onCancel() {
    this.cancel.emit();
  }
}
