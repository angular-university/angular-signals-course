import { inject, Injectable, signal} from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class LoadingService {

  #loadingSignal = signal<boolean>(false);

  loading = this.#loadingSignal.asReadonly();

  router = inject(Router);


  loadingOn() {
    this.#loadingSignal.set(true);
  }

  loadingOff() {
    this.#loadingSignal.set(false);
  }

}
