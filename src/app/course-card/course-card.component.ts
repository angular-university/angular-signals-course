import {Component} from "@angular/core";


@Component({
  selector: 'course-card',
  standalone: true,
  template: `
<div class="course-card">
    <ng-content select=".title">
        Hello World
    </ng-content>
</div>`
})
export class CourseCardComponent {


}
