import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule, LottieComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  authService = inject(AuthService);  
  forgetForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.forgetForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]

    });
  }

  options2: AnimationOptions = {
    path: '../../assets/AnimationForgot.json',

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
  
  
  
 

  ngOnInit() : void{}
  submit(){
    this.authService.sendEmailService(this.forgetForm.value.email)
    .subscribe({
      next: (res)=> {
        alert(res.message);
        this.forgetForm.reset();
      },
      error: (err)=> {
        alert(err.error.message)
      }
    })
  }

}
