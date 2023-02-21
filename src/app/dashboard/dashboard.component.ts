import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { InsertdialogComponent } from './../insertdialog/insertdialog.component';
import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title = 'To Do List';
  tasks !: any[];
  isDataEmpty = 0;
  user = {
    id: 0, 
    email: null,
    admin: 1
  };
  translates !: any[]
  langs = [
    {name: 'English', code: 'en'},
    {name: 'Spanish', code: 'es'},
    {name: 'French', code: 'fr'},
    {name: 'Italian', code: 'it'},
    {name: 'Hindi', code: 'hi'},
  ];

  selectedLang: String = 'en';
  users !: any[];
  userTasks !: any[];

  showUserList = false

  constructor(private dialog : MatDialog, private api : ApiService, private router : Router) {}

  typesOfTasks:DashboardComponent[] = [];
  ngOnInit(): void {
    // check if the user is logged in or not
    if ( !localStorage.getItem('user')) 
      this.router.navigate(['/login'])
    else {
      let userCheck = JSON.parse(localStorage.getItem('user') as string)
      this.user.id = userCheck.id
      this.user.email = userCheck.email
      this.user.admin = userCheck.admin
      this.loadTasks(userCheck.id)
    }
  }
  
  loadTasks(user:number) {
    this.api.getTasks(user)
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

  translateTask(data : any) {
    let header = new HttpHeaders({'Ocp-Apim-Subscription-Region': 'australiaeast', 'Ocp-Apim-Subscription-Key': '1e86c5add19d47c5a446f91bbf8dde5b'});

    const requestOptions = {  headers: header};                                                                                                                                                                            
 
    let _data = [{'Text': data.task}, {'Text': data.info}]
    this.api.getTranslations(this.selectedLang, _data, requestOptions)
    .subscribe((result:any)=>{
      data.translations = []
      result.forEach((res:any) => {
        data.translations.push(res.translations[0].text)
      });
      console.log(data);
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
        this.loadTasks(this.user.id)
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

  showUserLists() {
    this.api.getAllUsers().subscribe(users=>{
      this.users = users;
      this.api.getUsersTasks().subscribe((tasks:any[])=>{
        this.users.forEach(user=>{
          user.task = 0;
          tasks.forEach(task => {
            if (task.user === user.id) {
              user.task++
              console.log(this.users);
            }
          });
        })  
        this.showUserList = true
      })
    })    
  }

  navigateHome() {
    this.showUserList = false
  }

  addListDialog() {
    const dialogRef = this.dialog.open(InsertdialogComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.push(result)
        this.isDataEmpty = 1
      }
    });
  }

  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['login']);
  }
}
