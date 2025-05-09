import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Course} from "../models/course.model";


@Injectable({
  providedIn: "root"
})
export class CoursesServiceWithFetch {

  env = environment;
  async LoadAllCourses(): Promise<Course[]> {
    const response = await fetch(`${this.env.apiRoot}/courses`)
    const payload = await response.json();
    return Promise.resolve(payload.courses);
  }

  async createCourse(course :Partial<Course>):Promise<Course>{
    const res = await fetch(`${this.env.apiRoot}/courses`,{
      method:"POST",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify(course)
    })
    return await res.json();
  }

  async updateCourse(id:string , changes:Partial<Course>):Promise<Course>{
    const response =await fetch(`${this.env.apiRoot}/courses/${id}`,{
      method:"PUT",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify(changes)
    });
    return response.json() as Promise<Course>
  }
  async deleteCourse(id:string ):Promise<void>{
    const res =await fetch(`${this.env.apiRoot}/courses/${id}`,{
      method:"DELETE",
      headers:{
        'content-type':"application/json"
      },
    });
    return;
  }

}
