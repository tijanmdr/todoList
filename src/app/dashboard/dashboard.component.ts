import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { InsertdialogComponent } from './../insertdialog/insertdialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'To Do List';
  tasks !: any[];
  isDataEmpty = 0;

  constructor(private dialog : MatDialog, private api : ApiService, private router : Router) {}

  typesOfTasks:DashboardComponent[] = [];
  ngOnInit(): void {

    // check if the user is logged in or not
    if ( !localStorage.getItem('user')) 
      this.router.navigate(['/login'])
    
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
      if (result === 'delete') {
        this.isDataEmpty = 0
        this.loadTasks()
      } else {
        if (result) {
          this.tasks.forEach(res=>{
            if (res.id === result.id) {
              res.task = result.task
              res.info = result.info
              res._color = result._color
            }
          })
        }
      }
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

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['login']);
  }
}
