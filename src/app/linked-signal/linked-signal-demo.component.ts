import {Component, effect, linkedSignal, signal} from "@angular/core";

@Component({
  selector: 'linked-signal-demo',
  templateUrl: './linked-signal-demo.component.html',
  styleUrl: "./linked-signal-demo.component.scss"
})
export class LinkedSignalDemoComponent {

  courses = [
    {
      code: "BEGINNERS",
      title: "Angular for Beginners",
      defaultQuantity: 10
    },
    {
      code: "SIGNALS",
      title: "Angular Signals In Depth",
      defaultQuantity: 20
    },
    {
      code: "SSR",
      title: "Angular SSR In Depth",
      defaultQuantity: 30
    }
  ];

  selectedCourse = signal<string | null>("BEGINNERS");

  //quantity = signal(1);

  quantity = linkedSignal({
    source: this.selectedCourse,
    computation: (courseCode, previous) => this.courses.find(c => c.code === courseCode)?.defaultQuantity ?? 1
  });

  constructor() {

/*
    effect(() => {
        const course = this.selectedCourse();
        console.log(`selected course: ${course} effect triggered`)
        this.quantity.set(this.courses.find(c => c.code === course)?.defaultQuantity ?? 1)
      },
      {allowSignalWrites: true}
    );
*/



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
