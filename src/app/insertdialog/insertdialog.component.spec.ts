import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertdialogComponent } from './insertdialog.component';

describe('InsertdialogComponent', () => {
  let component: InsertdialogComponent;
  let fixture: ComponentFixture<InsertdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertdialogComponent ], 
      imports: [ 
        HttpClientModule, 
        MatSnackBarModule,
        MatToolbarModule, 
        MatDialogModule, 
        MatFormFieldModule, 
        MatSelectModule, 
        MatIconModule, 
        FormsModule, 
        ReactiveFormsModule
        
      ],
      providers: [{ provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {} }, ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
