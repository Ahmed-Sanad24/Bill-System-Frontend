import { Component, NgModule, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { NavbareComponent } from "./components/navbare/navbare.component";
import { SideNavbareComponent } from "./components/side-navbare/side-navbare.component";
import { MainComponent } from "./components/main/main.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanyFormComponent } from './components/Company/company-form/company-form.component';
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AllClientsComponent } from './components/clients/all-clients/all-clients.component';
import { LoginComponent } from "./components/login/login.component";
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbareComponent, SideNavbareComponent, MainComponent, RouterLink, 
    RouterModule, CommonModule, CompanyFormComponent, ReactiveFormsModule, 
    ClientFormComponent, ClientsComponent, AllClientsComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Bill';
  isLoggedIn: boolean = false;
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    // Check initial auth state from localStorage
    this.isLoggedIn = !!localStorage.getItem('usertoken');
    
    // Subscribe to auth state changes
    this.authService.authChanged().subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
    });
  }
}
