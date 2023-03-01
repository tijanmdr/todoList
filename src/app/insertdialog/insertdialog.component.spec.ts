import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertdialogComponent } from './insertdialog.component';

describe('InsertdialogComponent', () => {
  let component: InsertdialogComponent;
  let fixture: ComponentFixture<InsertdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertdialogComponent ], 
      imports: [ HttpClientModule ],
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
