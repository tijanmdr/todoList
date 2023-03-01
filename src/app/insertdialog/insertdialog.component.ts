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
  actionBtn:String = 'Insert'; // default button as string. will be changed according to user action

  user = { // user object to store user data parsed from localstorage
    id: null, 
    email: null
  };

  // task can be labelled in colors as well. Different options of colors for users
  tileColors : any[] = [
    {'color':'lightblue', 'name':'Light Blue'},
    {'color':'lightgreen', 'name':'Light Green'},
    {'color':'lightpink', 'name':'Light Pink'},
    {'color':'#DDBDF1', 'name':'Light Purple'},
  ];

  selectedOption: String = 'lightblue'; // selected default color

  constructor (private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editData:any,
    private dialogRef: MatDialogRef<InsertdialogComponent>, 
    private _snackBar : MatSnackBar) {}

  ngOnInit() : void { // parse user data from localstorage and update in user object
    if ( localStorage.getItem('user')) {
      let userCheck = JSON.parse(localStorage.getItem('user') as string)
      this.user.id = userCheck.id
      this.user.email = userCheck.email
    }

    this.taskForm = this.formBuilder.group({ // creating a form data with validation
      task: ['', Validators.required], 
      info: [''],
      _color: ['', Validators.required]
    })

    if (this.editData) { // check if the data is injected from clicking the view button 
      this.actionBtn = 'Update'
      this.taskForm.controls['task'].setValue(this.editData.task)
      this.taskForm.controls['info'].setValue(this.editData.info)
      this.taskForm.controls['_color'].setValue(this.editData._color)
    }
  }

  /**
   * Insert or udpate task
   */
  insertTask() {
    if (this.taskForm.valid) {
      if (this.editData) { // update data
        this.taskForm.value.user = this.user.id
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
      } else { // insert data
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

  /**
   * Delete task
   */
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
  
  /**
   * Snack bar to show mesage that is dismissible
   * @param msg message to show
   */
  openSnackBar(msg:string) {
    this._snackBar.open(msg, "OK", {
      horizontalPosition: "right",
      verticalPosition: "bottom",
      duration: 5000
    });
  }
}
