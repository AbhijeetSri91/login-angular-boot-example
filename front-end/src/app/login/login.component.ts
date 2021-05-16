import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute,
    private http: HttpClient) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
  }

  login() {
    let url = 'http://localhost:8080/login';
    let result = this.http.post(url, {
      userName: this.model.username,
      password: this.model.password
    }).subscribe(isValid => {
      this.loading = true;
      if (isValid) {
        sessionStorage.setItem('token', btoa(this.model.username + ':' + this.model.password));
        this.router.navigate(['']);
      } else {
        alert('authentication failed.')
      }
    })
  }

}
