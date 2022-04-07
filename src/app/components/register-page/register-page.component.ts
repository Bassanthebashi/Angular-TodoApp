import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerForm:any=FormGroup;
  constructor( private FB:FormBuilder,private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.registerForm=this.FB.group({
      name:['', Validators.required],
      email:['', Validators.compose([Validators.required,Validators.email])],
      password:['', Validators.required],
    })
  }
signup(){
  if(this.registerForm.status==='VALID'){
    console.log(this.registerForm.value);
    
    this.auth.register(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.router.navigate(['signin']);
      }
    })
  }
}
}
