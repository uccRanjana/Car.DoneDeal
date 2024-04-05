import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [LottieComponent, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  options2: AnimationOptions = {
    path: '../../assets/ShopByType.json',

  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

}
