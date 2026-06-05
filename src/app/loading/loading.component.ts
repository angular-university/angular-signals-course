import {Component, inject, Signal, ChangeDetectionStrategy} from "@angular/core";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoadingService} from "./loading.service";
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
    selector: "loading",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatProgressSpinner]
})
export class LoadingIndicatorComponent {

  loadingService = inject(LoadingService);

  loading = this.loadingService.loading;

}
