import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onLoginWithGoogleClick() {
    this.auth.googleSignin();
  }
}
