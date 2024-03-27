import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {MessagesService} from "../messages/messages.service";

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

  authService = inject(AuthService);

  messagesService = inject(MessagesService);

  router = inject(Router);

  async onLogin(email :string, password:string) {

    try {

      if (!email || !password) {
        this.messagesService.showMessage("Enter an email and password.", "error")
        return;
      }

      await this.authService.login(email, password);

      await this.router.navigate(["/home"]);
    }
    catch (error) {
      console.error(error);
      this.messagesService.showMessage("Login failed. Please try again.", "error");
    }

  }

}
