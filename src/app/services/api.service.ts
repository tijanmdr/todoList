import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseURI for http calls
  baseUrl = 'https://dry-wave-16087.herokuapp.com/' // comment if use in local machine
  // baseUrl = 'http://localhost:3000/' // uncomment if use in local machine

  // base url for microsoft translation
  translationUri = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to='

  constructor(private http : HttpClient) { }
  
  /**
   * To post task 
   * @param data Form data
   * @returns array
   */
  postTask(data : any) {
    return this.http.post<any>(this.baseUrl+"tasks", data)
  }
  
  /**
   * To update a task
   * @param data Form data
   * @param id task ID
   * @returns array
   */
  updateTask(data : any, id:number) {
    return this.http.put<any>(this.baseUrl+"tasks/"+id, data)
  }

  /**
   * To delete a task
   * @param data Form data
   * @param id task ID
   * @returns array
   */
  deleteTask(data : any, id:number) {
    return this.http.delete<any>(this.baseUrl+"tasks/"+id, data)
  }

  /**
   * Get tasks respective to user
   * @param user User ID
   * @returns array
   */
  getTasks (user:number) {
    return this.http.get<any>(this.baseUrl+"tasks?user="+user)
  }
  
  /**
   * Register a user
   * @param data user data
   * @returns array
   */
  postUser(data : any) {
    return this.http.post<any>(this.baseUrl+"users", data )
  }

  /**
   * login user
   * @param email user email
   * @param pwd user password
   * @returns array
   */
  getUser (email:string, pwd:string) {
    return this.http.get<any>(this.baseUrl+"users?email="+email+"&password="+pwd)
  }

  /**
   * get all users from the database
   * @returns array
   */
  getAllUsers() {
    return this.http.get<any>(this.baseUrl+"users")
  }

  /**
   * get all the tasks list of all users
   * @returns array
   */
  getUsersTasks() {
    return this.http.get<any>(this.baseUrl+"tasks")
  }

  /**
   * Get translations for the task and their info
   * @param lang language type
   * @param data task data to be translated
   * @param headers API key, regions and content type 
   * @returns array
   */
  getTranslations(lang:any, data: any, headers:any) {
    return this.http.post<any>(this.translationUri+lang, data, headers)
  }
}
