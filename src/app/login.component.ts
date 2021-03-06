import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginService } from './Login/login.component.service';
import { LoginModel, LoginPayLoad } from './Login/login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [LoginService]
})

export class LoginComponent {
    @Input() username: string;
    @Input() password: string;
    loginSuceed: boolean;
    errorMessage: string;
    title: string;
    payLoad = new LoginPayLoad();
    response = 0;
    constructor(private router: Router, private service: LoginService) {
        this.loginSuceed = true;
        this.errorMessage = 'Bad UserName / Password';
        this.title = 'Database Documentation Management';
    }

    onSubmit(f: NgForm) {

        if (f.valid) {
            this.payLoad.username = this.username;
            this.payLoad.password = this.password;
            console.log(this.payLoad);
            this.service.postLogin(this.payLoad)
                .subscribe((res) => {
                    if (res === 200) {
                        console.log('Enterd here');
                        this.loginSuceed = true;
                        this.router.navigate(['dashboard']);
                        sessionStorage.setItem('Token', JSON.stringify(res));
                    } else {
                        this.loginSuceed = false;
                    }
                });

        }

    }
}
