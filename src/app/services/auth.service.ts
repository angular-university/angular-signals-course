import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  #userSignal = signal<User | null>(null);
  user = this.#userSignal.asReadonly();

  router = inject(Router);

  isLoggedIn = computed(() => !!this.user());

  http = inject(HttpClient);

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    })
  }

  loadUserFromStorage() {
    const storagedUser = localStorage.getItem(USER_STORAGE_KEY);
    if (storagedUser) {
      const user = JSON.parse(storagedUser);
      this.#userSignal.set(user);
    }
  }

  async login(email: string, password: string): Promise<User> {
    const login$ = this.http.post<User>(`${environment.apiRoot}/login`, {
      email, password
    });
    const user = await firstValueFrom(login$);
    this.#userSignal.set(user);
    return user;
  }

  async logout() {
    this.#userSignal.set(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    await this.router.navigateByUrl('/login');
  }

}
