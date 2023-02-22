import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { InsertdialogComponent } from './../insertdialog/insertdialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks !: any[]; // to store tasks list after api call on ngInit()
  isDataEmpty = 0; // to check if the task list is empty or not 
  
  user = { // user object to store user data parsed from localstorage
    id: 0, 
    email: null,
    admin: 1
  };
  langs = [ // language options to show to the user for user preferred language translations
    {name: 'English', code: 'en'},
    {name: 'Spanish', code: 'es'},
    {name: 'French', code: 'fr'},
    {name: 'Italian', code: 'it'},
    {name: 'Nepali', code: 'ne'},
    {name: 'Hindi', code: 'hi'},
  ];

  selectedLang: String = 'en'; // user selected language for translation
  users !: any[]; // user list that is only accessible for admins only 

  showUserList = false // boolean to check if the admin is on task or user interface

  /**
   * 
   * @param dialog MatDialog instance for dialog functionality
   * @param api API service to call api functions 
   * @param router to manage navigation
   */
  constructor(private dialog : MatDialog, private api : ApiService, private router : Router) {}

  /**
   * triggers ngOnInit() as the page opens
   */
  ngOnInit(): void {
    // check if the user is logged in or not using previously saved data in localstorage during login process
    if ( !localStorage.getItem('user')) // check if the user data is saved in localstorage during login or not
      this.router.navigate(['/login'])
    else { // parse user data from localstorage and update in user object
      let userCheck = JSON.parse(localStorage.getItem('user') as string)
      this.user.id = userCheck.id
      this.user.email = userCheck.email
      this.user.admin = userCheck.admin
      this.loadTasks(userCheck.id) // load tasks of the current user
    }
  }
  
  /**
   * Load user data
   * @param user user id 
   */
  loadTasks(user:number) {
    this.api.getTasks(user)
    .subscribe({
      next : (res) => {
        this.tasks = res
        setTimeout(()=>{
          if (res.length !== 0)
            this.isDataEmpty = 1 // actually working as a loader but just with the text
        }, 500)
      }, error: (res) => {
        this.isDataEmpty = 0;
      }
    })
  }

  /**
   * To translate task with user preferred language
   * @param data task data like task title and info
   */
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
    })
  }

  /**
   * view task dialog and show data with update form as well
   * @param data task data of the selected to show in the dialog
   */
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

  /**
   * Show user lists along with tasks number for admin access
   */
  showUserLists() {
    this.api.getAllUsers().subscribe(users=>{
      this.users = users;
      this.api.getUsersTasks().subscribe((tasks:any[])=>{
        this.users.forEach(user=>{
          user.task = 0;
          tasks.forEach(task => {
            if (task.user === user.id) {
              user.task++
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

  /**
   * Open task add dialog
   */
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

  /**
   * Logout function. Just remove from localstorage and navigate
   */
  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['login']);
  }
}
