import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';
import { AuthInterceptor } from './app/core/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength }) =>
            `El campo debe tener mínimo ${requiredLength} carácteres`,
          min: ({ min }) => `El valor debe ser mayor a ${min}`,
          pattern: 'El valor ingresado es inválido',
          passwordsMatch: 'Las contraseñas no coinciden',
        },
      },
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    MessageService,
    ConfirmationService,
  ],
}).catch((err) => console.error(err));
