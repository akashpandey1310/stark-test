import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestServiceService } from './test-service.service';

@Injectable({
  providedIn: 'root'
})
export class BearerService implements HttpInterceptor {

  constructor(private testService:TestServiceService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.testService.getToken();
    const authRequest = req.clone({headers: req.headers.set('Authorization', "Bearer "+ authToken)});
      return next.handle(authRequest);
  }
}
