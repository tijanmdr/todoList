import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthenticateComponent } from './authenticate.component';
import { MatDividerModule } from '@angular/material/divider';

describe('AuthenticateComponent', () => {
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticateComponent ],
      imports: [ 
        MatDialogModule, 
        MatSnackBarModule, 
        HttpClientModule, 
        MatCardModule, 
        MatDividerModule, 
        MatFormFieldModule, 
        FormsModule, 
        ReactiveFormsModule, 
        MatInputModule, 
        BrowserAnimationsModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
