import {HttpContextToken} from "@angular/common/http";

export const SkipLoading = new HttpContextToken<boolean>(() => false);
