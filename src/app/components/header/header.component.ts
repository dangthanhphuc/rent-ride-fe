import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserResponse } from '../../responses/user.response';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../services/custom-validators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBell = faBell;
  faChevronDown = faChevronDown;

  userResponse : UserResponse;

  registerForm : FormGroup;

  constructor(
    private localStorageService : LocalStorageService
  ) {
    this.userResponse = this.localStorageService.getValueFromLocalStorage("user");

    this.registerForm = new FormGroup({
      name  : new FormControl("", Validators.required),
      phone_number : new FormControl("", [Validators.required, Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]),
      email : new FormControl("", [Validators.email, Validators.required]),
      date_of_birth: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password : new FormControl("", Validators.required),
      retype_password : new FormControl("", [Validators.required])
    },  { validators: CustomValidators.matchPassword('password', 'retype_password') });
  }

  onSubmitRegister() {
    if(!this.registerForm.invalid){
      console.log(this.registerForm.invalid)
    }
  }

}
