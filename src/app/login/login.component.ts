import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MessagesService } from '../messages/messages.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: [''],
  });

  messagesService = inject(MessagesService);
  authService = inject(AuthService);
  router = inject(Router);

  onLogin() {
    try {
      const { email, password } = this.form.value;
      if (!email || !password) {
        this.messagesService.showMessage(
          'Please enter an email and password',
          'error'
        )        
      } else {
        this.authService.login(email, password);
        this.router.navigateByUrl('/api/courses');
      }
    } catch (error) {
      this.messagesService.showMessage(
        'Login failed',
        'error'
      )
    }
  }
}
