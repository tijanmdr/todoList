import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'http://localhost:3000/'

  constructor(private http : HttpClient) { }

  postTask(data : any) {
    return this.http.post<any>(this.baseUrl+"tasks", data)
  }
  
  updateTask(data : any, id:number) {
    return this.http.put<any>(this.baseUrl+"tasks/"+id, data)
  }

  deleteTask(data : any, id:number) {
    return this.http.delete<any>(this.baseUrl+"tasks/"+id, data)
  }

  getTasks (user:number) {
    return this.http.get<any>(this.baseUrl+"tasks?user="+user)
  }
  
  postUser(data : any) {
    return this.http.post<any>(this.baseUrl+"users", data )
  }

  getUser (email:string, pwd:string) {
    return this.http.get<any>(this.baseUrl+"users?email="+email+"&password="+pwd)
  }

  getAllUsers() {
    return this.http.get<any>(this.baseUrl+"users")
  }

  getUsersTasks() {
    return this.http.get<any>(this.baseUrl+"tasks")
  }
}
