import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesComponent } from './categories.component';
import { UserService } from 'src/app/services/user.service';
import { CategoryService } from 'src/app/services/category.service';
import {
  MockAlertService,
  MockCategoryService,
  MockUserService,
  mockErrorsConfig,
} from 'src/mocks';
import { AlertService } from 'src/app/services/alert.service';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';
import { ConfirmationService } from 'primeng/api';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: ErrorTailorConfigProvider, useValue: mockErrorsConfig },
        ConfirmationService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
