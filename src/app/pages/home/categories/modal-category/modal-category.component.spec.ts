import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCategoryComponent } from './modal-category.component';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import {
  MockUserService,
  MockCategoryService,
  MockAlertService,
  mockErrorsConfig,
} from 'src/mocks';
import { ErrorTailorConfigProvider } from '@ngneat/error-tailor';

describe('ModalCategoryComponent', () => {
  let component: ModalCategoryComponent;
  let fixture: ComponentFixture<ModalCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCategoryComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: AlertService, useClass: MockAlertService },
        { provide: ErrorTailorConfigProvider, useValue: mockErrorsConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
