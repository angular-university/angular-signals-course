import {Component, effect, signal} from "@angular/core";


@Component({
  selector: 'linked-signal-demo',
  templateUrl: './linked-signal-demo.component.html',
  styleUrl: "./linked-signal-demo.component.scss"
})
export class LinkedSignalDemoComponent {

  selectedCourse = signal<string | null>("BEGINNERS");

  quantity = signal<number>(1);

  constructor() {
    effect(() => {
        const course = this.selectedCourse();
        console.log(`selected course: ${course} effect triggered`)
        this.quantity.set(1)
      },
      {allowSignalWrites: true}
    );
  }

  onQuantityChanged(quantity: string) {
    this.quantity.set(parseInt(quantity));
  }

  onArticleAdded() {
    alert(`${this.quantity()} licenses added for ${this.selectedCourse()}`)

  }

  onCourseSelected(courseCode: string) {
    this.selectedCourse.set(courseCode);
  }
}
