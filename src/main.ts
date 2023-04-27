import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { provideErrorTailorConfig } from '@ngneat/error-tailor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'Este campo es requerido',
          minlength: ({ requiredLength }) => `El campo debe tener mínimo ${requiredLength} carácteres`,
          pattern: 'El valor ingresado es inválido',
          passwordsMatch: 'Las contraseñas no coinciden'
        },
      },
    }),
    MessageService,
  ],
}).catch((err) => console.error(err));
