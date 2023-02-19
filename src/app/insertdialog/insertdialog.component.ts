import { ApiService } from './../services/api.service';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insertdialog',
  templateUrl: './insertdialog.component.html',
  styleUrls: ['./insertdialog.component.scss']
})
export class InsertdialogComponent {
  taskForm !: FormGroup;
  actionBtn:String = 'Insert';

  user = {
    id: null, 
    email: null
  };

  tileColors : any[] = [
    {'color':'lightblue', 'name':'Light Blue'},
    {'color':'lightgreen', 'name':'Light Green'},
    {'color':'lightpink', 'name':'Light Pink'},
    {'color':'#DDBDF1', 'name':'Light Purple'},
  ];

  selectedOption: String = 'lightblue';

  constructor (private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<InsertdialogComponent>, 
    private _snackBar : MatSnackBar) {}

  ngOnInit() : void {
    let userCheck = JSON.parse(localStorage.getItem('user') as string)
    this.user.id = userCheck.id
    this.user.email = userCheck.email

    this.taskForm = this.formBuilder.group({
      task: ['', Validators.required], 
      info: [''],
      _color: ['', Validators.required]
    })

    if (this.editData) {
      console.log(this.editData);
      this.actionBtn = 'Update'
      this.taskForm.controls['task'].setValue(this.editData.task)
      this.taskForm.controls['info'].setValue(this.editData.info)
      this.taskForm.controls['_color'].setValue(this.editData._color)
    }
  }
  deleteTask() {
      if (this.editData.id) {
        this.api.deleteTask(this.editData, this.editData.id)
        .subscribe({
          next:(res)=> {
            this.taskForm.reset()
            this.dialogRef.close('delete')
            this.openSnackBar('Task deleted!')
          },
          error: () => {
            this.openSnackBar('There was some error while deleting a task!')
          }
        })
      }
  }
  insertTask() {
    if (this.taskForm.valid) {
      if (this.editData) {
        this.api.updateTask(this.taskForm.value, this.editData.id)
        .subscribe({
          next:(res) => {
            this.taskForm.reset()
            this.dialogRef.close(res)
            this.openSnackBar('Task updated!')
          },
          error: () => {
            this.openSnackBar('There was some error while adding a task!')
          }
        })  
      } else {
        this.taskForm.value.user = this.user.id
        this.api.postTask(this.taskForm.value)
        .subscribe({
          next:(res) => {
            this.taskForm.reset()
            this.dialogRef.close(res)
            this.openSnackBar('Task added!')
          },
          error: () => {
            this.openSnackBar('There was some error while adding a task!')
          }
        })
      }
    } else {
      this.openSnackBar('You need to fill the required fields!')
    }
  }

  openSnackBar(msg:string) {
    this._snackBar.open(msg, "OK", {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
