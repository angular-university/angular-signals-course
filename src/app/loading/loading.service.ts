import {Injectable, signal} from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LoadingService {

  #loadingSignal = signal<boolean>(false);

  loading = this.#loadingSignal.asReadonly();

  loadingOn() {
    console.log(`Loading on`);
    this.#loadingSignal.set(true);
  }

  loadingOff() {
    console.log(`Loading on`);
    this.#loadingSignal.set(false);
  }
}
