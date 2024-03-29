import {CourseCategory} from "./course-category.model";

export type Course = {
  id: string;
  title: string;
  longDescription: string;
  seqNo: number;
  iconUrl: string;
  price: number;
  uploadedImageUrl: string;
  courseListIcon: string;
  category: CourseCategory;
  lessonsCount: number;
}


export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}
