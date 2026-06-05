import {Component, input, model, ChangeDetectionStrategy} from '@angular/core';
import {CourseCategory} from "../models/course-category.model";

@Component({
    selector: 'course-category-combobox',
    imports: [],
    templateUrl: './course-category-combobox.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './course-category-combobox.component.scss'
})
export class CourseCategoryComboboxComponent {

  label = input.required<string>();

  value = model.required<CourseCategory>();

  onCategoryChanged(category: string) {
    this.value.set(category as CourseCategory);
  }

}
