import {Component, inject, Inject, signal} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Course} from "../models/course.model";
import {EditCourseDialogData} from "./edit-course-dialog.data.model";
import {CoursesService} from "../services/courses.service";

@Component({
  selector: 'edit-course-dialog',
  standalone: true,
  imports: [],
  templateUrl: './edit-course-dialog.component.html',
  styleUrl: './edit-course-dialog.component.scss'
})
export class EditCourseDialogComponent {

  dialogRef = inject(MatDialogRef<EditCourseDialogComponent>);

  coursesService = inject(CoursesService);

  data: EditCourseDialogData = inject(MAT_DIALOG_DATA);

  onCancel() {
    this.dialogRef.close();
  }

  async onSave() {
    if (this.data?.mode == 'create') {
      //TODO
    }
    else if (this.data?.mode == 'update') {
      //TODO
    }
  }

}

function createDefaultDialogConfig() {
  const config = new MatDialogConfig();
  config.disableClose = true;
  config.autoFocus = true;
  config.width = "400px";
  return config;
}

export function openEditCourseDialog(dialog: MatDialog, data: EditCourseDialogData) {
  const config = createDefaultDialogConfig();
  config.data = data;
  return dialog.open(EditCourseDialogComponent, config);
}
