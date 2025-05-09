import { Component, input, model } from '@angular/core';
import { CourseCategory } from '../models/course-category.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditCourseDialogData } from '../edit-course-dialog/edit-course-dialog.data.model';
import { EditCourseDialogComponent } from '../edit-course-dialog/edit-course-dialog.component';

@Component({
  selector: 'course-category-combobox',
  standalone: true,
  imports: [],
  templateUrl: './course-category-combobox.component.html',
  styleUrl: './course-category-combobox.component.scss',
})
export class CourseCategoryComboboxComponent {

}
