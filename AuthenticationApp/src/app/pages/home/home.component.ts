import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LottieComponent, CommonModule, RouterModule, CardComponent], 
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  options: AnimationOptions = {
    path: '../../assets/Animationcar.json',
  };
 

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
 
}
