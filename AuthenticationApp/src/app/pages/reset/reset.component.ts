import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { confirmPasswordValidators } from '../../validators/confirm-password.validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset',
  standalone: true,
  imports: [CommonModule ,RouterModule, FormsModule, ReactiveFormsModule,],

  templateUrl: './reset.component.html',
  styleUrl: './reset.component.css'
})
export class ResetComponent implements OnInit{


  authService = inject(AuthService);  

  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  resetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.resetForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: [confirmPasswordValidators('password', 'confirmPassword')] });
    }
  

  token!: string; 

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val=>{
      this.token = val['token'];
      console.log(this.token)
    })
  }
  reset() {
  
    let resetObj = {
      token: this.token,
      password: this.resetForm.value.password
    }
    this.authService.resetPasswordService(resetObj)
    .subscribe({
      next: (res)=> {
        alert(res.message);
        this.resetForm.reset();
        this.router.navigate(['login']);
      },
      error: (err) => {
        alert(err.error.message)
      }

    })
  }
}


