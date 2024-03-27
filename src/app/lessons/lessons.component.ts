import {Component, inject} from '@angular/core';
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




}
