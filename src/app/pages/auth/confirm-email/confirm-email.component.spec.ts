import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailComponent } from './confirm-email.component';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { MockUserService, MockAlertService } from 'src/mocks';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConfirmEmailComponent', () => {
  let component: ConfirmEmailComponent;
  let fixture: ComponentFixture<ConfirmEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailComponent, RouterTestingModule],
      providers: [
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: AlertService,
          useClass: MockAlertService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
