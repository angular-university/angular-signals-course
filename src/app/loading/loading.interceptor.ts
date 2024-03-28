import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {LoadingService} from "./loading.service";
import {finalize} from "rxjs";
import {SkipLoading} from "./skip-loading.component";

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  const loadingService = inject(LoadingService);

  // Check for a custom attribute to avoid showing loading spinner
  if (req.context.get(SkipLoading)) {
    // Pass the request directly to the next handler
    return next(req);
  }

  // Turn on the loading spinner
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      // Turn off the loading spinner
      loadingService.loadingOff();
    })
  );

}
