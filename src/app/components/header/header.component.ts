import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserResponse } from '../../responses/user.response';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../services/custom-validators';
import { RegisterDTO } from '../../dtos/register.dto';
import { UserService } from '../../services/user.service';
import { ResponseObject } from '../../responses/api.response';
import { LoginDTO } from '../../dtos/login.dto';
import { TokenService } from '../../services/token.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBell = faBell;
  faChevronDown = faChevronDown;

  userResponse : UserResponse;

  registerForm : FormGroup;
  loginForm : FormGroup;

  constructor(
    private localStorageService : LocalStorageService,
    private userService : UserService,
    private tokenService : TokenService
  ) {
    this.userResponse = this.localStorageService.getValueFromLocalStorage("user");

    this.registerForm = new FormGroup({
      name  : new FormControl("", Validators.required),
      phone_number : new FormControl("", [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]),
      email : new FormControl("", [Validators.email, Validators.required]),
      date_of_birth: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password : new FormControl("", Validators.required),
      retype_password : new FormControl("", Validators.required)
    },  { validators: CustomValidators.matchPassword('password', 'retype_password') });

    this.loginForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password : new FormControl("", Validators.required)
    });
  }

  onSubmitRegister() {
    if(!this.registerForm.invalid){
      const registerDTO : RegisterDTO = new RegisterDTO(this.registerForm.value);
      this.register(registerDTO);
    }
  }

  onSubmitLogin(){
    if(!this.loginForm.invalid){
      const loginDTO : LoginDTO = new LoginDTO(this.loginForm.value);
      this.login(loginDTO);
    }
  }

  register(registerDTO : RegisterDTO) {
    this.userService.register$(registerDTO).subscribe({
      next: (response : ResponseObject) => {
        console.log(response);
      },
      error: (error : any) => {
        console.log(error);
      }
    })
  }

  login(loginDTO : LoginDTO) {
    this.userService.login$(loginDTO).subscribe({
      next: (response : ResponseObject) => {
        this.tokenService.setToken(response.data.token);
        this.localStorageService.saveValueToLocalStorage("user", response.data.user_detail);
        this.userResponse = response.data.user_detail;
        debugger
      },
      error: (error : any) => {
        console.log(error);
      }
    })
  }
 
}
