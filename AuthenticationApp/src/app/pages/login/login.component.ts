import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule ,RouterModule, FormsModule,  ReactiveFormsModule, LottieComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {

  router = inject(Router);
  authService = inject(AuthService);

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    
    });
  }


  ngOnInit(): void {}
  login() {
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next: (res) => {
        alert("User Logged In!")
        localStorage.setItem("user_id", res.data._id); 
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['card']);
        this.loginForm.reset();
      },
      error:(err) => {
        console.log(err);
        alert(err.error)
      }
    })

   console.log(this.loginForm.value);
  }

  options2: AnimationOptions = {
    path: '../../assets/AnimationLogin.json',

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
