import { ApiService } from './services/api.service';
import { InsertdialogComponent } from './insertdialog/insertdialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  title = 'To Do List';
  tasks !: any[];
  isDataEmpty = 0;

  constructor(private dialog : MatDialog, private api : ApiService) {}

  typesOfTasks:AppComponent[] = [];
  ngOnInit(): void {
    this.loadTasks()
  }
  
  loadTasks() {
    this.api.getTasks()
    .subscribe({
      next : (res) => {
        this.tasks = res
        setTimeout(()=>{
          if (res.length !== 0)
            this.isDataEmpty = 1
        }, 500)
        // console.log(typeof(this.tasks));
      }, error: (res) => {
        this.isDataEmpty = 1;
      }
    })
  }

  viewTaskDialog(data : any) {
    const dialogRef = this.dialog.open(InsertdialogComponent, {
      width: '30%', 
      data: data
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.tasks.map(res=>{
        if (res.id === result.id) {
          res.task = result.task
          res.info = result.info
          res._color = result._color
        }
      })
      this.isDataEmpty = 1
    });
  }

  addListDialog() {
    const dialogRef = this.dialog.open(InsertdialogComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.tasks.push(result)
      this.isDataEmpty = 1
    });
  }
}
