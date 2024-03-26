import {HttpContextToken, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {LoadingService} from "./loading.service";
import {finalize} from "rxjs";

export const SkipLoading = new HttpContextToken<boolean>(() => false);

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  loadingService = inject(LoadingService);

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // Check for a custom attribute to avoid showing loading spinner
    if (req.context.get(SkipLoading)) {
      // Pass the request directly to the next handler
      return next.handle(req);
    }

    // Turn on the loading spinner
    this.loadingService.loadingOn();

    return next.handle(req).pipe(
      finalize(() => {
        // Turn off the loading spinner
        this.loadingService.loadingOff();
      })
    );
  }
}
