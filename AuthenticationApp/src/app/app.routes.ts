import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ResetComponent } from './pages/reset/reset.component';
import { CardComponent } from './pages/card/card.component';
import { FooterComponent } from './components/footer/footer.component';

export const routes: Routes = [
    {path:'', component:HomeComponent },
    {path:'home', component:HomeComponent },
    {path:'header', component:HeaderComponent },
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'forget-pass', component:ForgotPasswordComponent},
    {path: 'reset/:token', component:ResetComponent},
    {path: 'card', component:CardComponent},
    {path: 'footer', component:FooterComponent},
    
    


];
