import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/auth/service/auth.service';
import { UserModel } from 'src/app/pages/auth/model/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: UserModel;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.signOut();
  }
}
