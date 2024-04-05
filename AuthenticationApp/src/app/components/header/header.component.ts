import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,RouterModule, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;

  router = inject(Router);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.authService.isLoggedIn();

    this.authService.isLoggedIn$.subscribe(res =>{
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }

  logout(){
    localStorage.removeItem("user_id");
    this.authService.isLoggedIn$.next(false);
    this.router.navigate(['home']);
  }
}