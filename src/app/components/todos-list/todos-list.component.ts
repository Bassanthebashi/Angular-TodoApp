import { Component, Input, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit {
  @Input() AllTodos: any = ['a', 'b']
  AllGroups: any = []
  minimumDatePick = Date.now()
  todoToADD = ""
  groupToADD = ""
  user = localStorage.getItem('userID')
  userName = ""
  expectedDate: any = ''
  Editmode = false;
  EditGroupmode = false;
  todoToEdit: any = ""
  groupToEdit: any = ""
  todoToEditTitle:any=""
  expectedDateUpdate:any=""
  EditTodoWithGroup:any=null;
  constructor(private http: HttpClientService) { }

  ngOnInit(): void {
    this.http.getTodosByUserId(this.user).subscribe({
      next: data => {
        console.log(data.todos);
        this.AllTodos = data.todos
      }
    })
    this.http.getGroupsByUserId(this.user).subscribe({
      next: data => {
        console.log(data.groups);
        this.AllGroups = data.groups
      }
    })

    this.http.getUserById(this.user).subscribe({
      next: (data) => this.userName = data.user.name,
      error: err => console.log(err)
    })
  }
  AddTodo(group = null) {
    console.log(this.todoToADD, this.expectedDate, this.user);
    if (group == null) {
      this.http.AddTodo({ title: this.todoToADD, user: this.user, finishingDate: this.expectedDate }).subscribe({
        next: (data) => {
          console.log(data);
          this.AllTodos.push(data.todo);
        },
        error: (err) => {
          console.log(err);

        }
      })
    }
    else {
      this.http.AddTodo({ title: this.todoToADD, user: this.user, finishingDate: this.expectedDate, group: group }).subscribe({
        next: (data) => {
          console.log(data);
          this.AllGroups.forEach((el: any) => {
            if (el._id == group) el.todos.push(data.todo);
          })
        },
        error: (err) => {
          console.log(err);

        }
      })
    }

  }
  DeleteTodo(todoId: any,group:any=null) {
    this.http.DeleteTodo(todoId).subscribe({
      next: (data) => {
        console.log(data);
        if(group!=null){
          group.todos.forEach((element: any, index: any) => {
            if (element._id == data.todo._id) group.todos.splice(index, 1);
          });
        }
        else{
          this.AllTodos.forEach((element: any, index: any) => {
            if (element._id == data.todo._id) this.AllTodos.splice(index, 1);
          });
        }


      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  DisplayEditTodo(todoId: any,todotitle:any,group:any=null) {
    this.todoToEditTitle=todotitle
    this.Editmode = true;
    this.todoToEdit = todoId;
    console.log("group", group);
    this.EditTodoWithGroup=group;
    console.log(this.EditTodoWithGroup);
  }
  UpdateTodoStatus(todoId: any, Status: any,group:any=null) {
    console.log("mark");

    this.http.UpdateTodo(todoId, { status: Status }).subscribe({
      next: (data) => {
        console.log(data);
        if(group!=null){
          group.todos.forEach((el:any)=>{
            if(el._id==todoId)el.status=Status
          })
        }
        this.AllTodos.forEach((element: any, index: any) => {
          if (element._id == data.todo._id) element.status = "Completed";
        });
      },
      error: (err) => {
        console.log(err);

      }
    })
  }
  EditTodo() {
    let gr=this.EditTodoWithGroup;
    this.http.UpdateTodo(this.todoToEdit, { title: this.todoToEditTitle, user: this.user, finishingDate: this.expectedDateUpdate }).subscribe({
      next: (data) => {
        console.log(data);
        console.log(this.EditTodoWithGroup);
        if(gr!=null){
          gr.todos.forEach((element:any) => {
            if (element._id == data.todo._id) {
              element.title = data.todo.title;
              element.status = data.todo.status;
              element.finishingDate = data.todo.finishingDate;
            };
          });
        }else{
          this.AllTodos.forEach((element: any, index: any) => {
            if (element._id == data.todo._id) {
              element.title = data.todo.title;
              element.status = data.todo.status;
              element.finishingDate = data.todo.finishingDate;
            };
          });
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.Editmode = false;
    this.todoToADD = ''
    this.expectedDate = ""
    this.EditTodoWithGroup=null;

  }

  AddGroup() {

    this.http.AddGroup({ title: this.groupToADD, user: this.user }).subscribe({
      next: (data) => {
        console.log(data);
        this.AllGroups.push(data.group);
      },
      error: (err) => {
        console.log(err);

      }
    })

  }
  DisplayUpdateGroup(groupId: any) {
    this.AllGroups.forEach((element: any, index: any) => {
      if (element._id == groupId) {
        this.groupToADD = element.title;
      };
    });
    this.EditGroupmode = true;
    this.groupToEdit = groupId;
  }
  UpdateGroup() {
    this.http.Updategroup(this.groupToEdit, { title: this.groupToADD }).subscribe({
      next: (data) => {
        console.log(data);
        this.AllGroups.forEach((element: any, index: any) => {
          if (element._id == data.group._id) {
            element.title = data.group.title;
          };
        });

      },
      error: (err) => {
        console.log(err);

      }
    })
    this.EditGroupmode = false;
    this.groupToADD = ''
  }
  DeleteGroup(group: any) {
    this.http.Deletegroup(group).subscribe({
      next: (data) => {
        this.AllGroups.forEach((element: any, index: any) => {
          if (element._id == data.group._id) this.AllGroups.splice(index, 1);
        });
      },
      error: (err) => { }
    })
  }

}
