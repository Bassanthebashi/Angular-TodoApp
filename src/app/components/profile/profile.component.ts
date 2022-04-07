import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/services/http-client.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = '';
  AllTodos:any=""
  statusCategorized=false;
  constructor(private http: HttpClientService, private router: Router, private auth:AuthService) { }

  ngOnInit(): void {
    this.user = localStorage.getItem('userID');
  }
  logout() {
    this.auth.logout();
  }
  getTodosByStatus(status:any){
    console.log('hi');
    
    this.http.getTodosByUserIdWithStatus(this.user,status).subscribe({
      next:data=>{
        console.log(data.todos);
        this.AllTodos=data.todos
        this.statusCategorized=true;
      }
    })
  }
  getTodos(){
    this.http.getTodosByUserId(this.user).subscribe({
      next:data=>{
        console.log(data.todos);
        this.AllTodos=data.todos
        this.statusCategorized=false;

      }
    })
  }
  getTodayTodos(){
    function WithoutTime(dateTime:any) {
      var date = new Date(dateTime.getTime());
      date.setHours(0, 0, 0, 0);
      return date;
  }

    let todos:any;
    this.http.getTodosByUserId(this.user).subscribe({
      next:data=>{
        console.log(data.todos);
        data.todos.forEach((element:any,index:any)=>{
          if(element.finishingDate==WithoutTime(Date.now())) todos.push(element);
       });
        this.AllTodos=todos

      }
    })
  }
}
