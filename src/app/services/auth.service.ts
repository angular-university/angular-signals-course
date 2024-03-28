import {computed, effect, inject, Injectable, signal} from "@angular/core";
import {User} from "../models/user.model";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

const USER_STORAGE_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);

  #userSignal = signal<User | null>(null);

  user = this.#userSignal.asReadonly();

  isLoggedIn = computed(() => !!this.user());

  constructor() {

    this.loadUserFromStorage();

    effect(() => {
      const user = this.user();
      if (user) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      }
    })

  }

  loadUserFromStorage() {
    const json = localStorage.getItem(USER_STORAGE_KEY);
    if (json) {
      console.log(`Loaded user from storage.`);
      const user = JSON.parse(json) as User;
      this.#userSignal.set(user);
    } else {
      console.log(`No user found in storage.`);
    }
  }

  async login(email: string, password: string): Promise<User> {

    const response = await fetch(`${environment.apiRoot}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });

    const user = await response.json() as User;

    this.#userSignal.set(user);

    return user;
  }

  async logout() {
    localStorage.removeItem(USER_STORAGE_KEY);
    this.#userSignal.set(null);
    await this.router.navigateByUrl('/login');
  }

}
