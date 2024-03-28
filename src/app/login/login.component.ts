import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  authService = inject(AuthService);

  messagesService = inject(MessagesService);

  router = inject(Router);

  async onLogin() {

    try {

      const {email, password} = this.form.value;

      if (!email || !password) {
        this.messagesService.showMessage("Enter an email and password.", "error")
        return;
      }

      await this.authService.login(email, password);

      await this.router.navigate(["/home"]);
    } catch (error) {
      console.error(error);
      this.messagesService.showMessage("Login failed. Please try again.", "error");
    }

  }

}
