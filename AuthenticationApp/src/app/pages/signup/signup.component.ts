


import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { confirmPasswordValidators } from '../../validators/confirm-password.validators';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule , RouterModule, FormsModule,  ReactiveFormsModule, LottieComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService);
  signupForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      city: ['', Validators.required],
    }, { validators: [confirmPasswordValidators('password', 'confirmPassword')] });
  }

  ngOnInit(): void {}

  register(){
    this.authService.registerService(this.signupForm.value)
    .subscribe({
      next: (res) => {
        alert("User Created!")
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  options2: AnimationOptions = {
    path: '../../assets/Animationsignup.json',

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}