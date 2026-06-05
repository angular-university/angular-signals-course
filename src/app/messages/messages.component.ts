import {Component, inject, ChangeDetectionStrategy} from "@angular/core";
import {MessagesService} from "./messages.service";
import {NgClass} from "@angular/common";

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        NgClass
    ]
})
export class MessagesComponent {


}
