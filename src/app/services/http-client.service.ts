import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
   url:string="http://127.0.0.1:3000/";
  constructor(private http:HttpClient) { }
  getUserById(id: string | null) {
    return this.http.get<any>( this.url+ "user/" + id);
  }
  getTodosByUserId(userId:any) {
    return this.http.get<any>(this.url+ "todo/General/user/" + userId);
  }
  getTodosByUserIdWithStatus(userId:any,status:any) {
    return this.http.get<any>(this.url+ "todo/user/" + userId+"?status="+status);
  }
  getGroupsByUserId(userid: string | null) {
    return this.http.get<any>(this.url + "group/user/" + userid);
  }
  getGroupsByUserIdWithStatus(userId:any,status:any) {
    return this.http.get<any>(this.url+ "group/user/" + userId+"?status="+status);
  }
  gettodosByUserGroup(userid: string | null,group:string|null) {
    return this.http.get<any>(this.url + "todo/General/user/" + userid+'?group='+group);
  }
  AddTodo(body:any) {
    console.log(body);
    return this.http.post<any>(this.url + "todo",body);
  }
  AddGroup(body:any) {
    console.log(body);
    return this.http.post<any>(this.url + "group",body);
  }
  DeleteTodo(todoId:any) {
    console.log(todoId);
    return this.http.delete<any>(this.url + "todo/"+todoId);
  }
  Deletegroup(groupId:any) {
    console.log(groupId);
    return this.http.delete<any>(this.url + "group/"+groupId);
  }
  UpdateTodo(todoId:any,body:any) {
    console.log(todoId);
    return this.http.patch<any>(this.url + "todo/"+todoId,body);
  }
  Updategroup(groupId:any,body:any) {
    console.log(groupId);
    return this.http.patch<any>(this.url + "group/"+groupId,body);
  }

}
