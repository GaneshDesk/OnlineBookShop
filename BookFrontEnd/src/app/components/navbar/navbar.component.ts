//import { Router } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FlashMessage } from 'angular2-flash-messages/module/flash-message';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {
      cssClass: 'alert-success', timeout: 3000
    });
    this.router.navigate(['/login']);
    return false;
   }
}
