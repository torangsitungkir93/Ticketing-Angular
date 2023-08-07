import { Route, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";


export const roleValidation = (route: Route, segments: UrlSegment[]) => {
    console.log('route=>',route);
}