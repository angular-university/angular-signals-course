import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
