import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { CustomValidators } from '../../../services/custom-validators';
import { UpdatePassDTO } from '../../../dtos/update.pass';
import { LocalStorageService } from '../../../services/local-storage.service';
import { UserResponse } from '../../../responses/user.response';
import { ResponseObject } from '../../../responses/api.response';
import { TokenService } from '../../../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpw',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './resetpw.component.html',
  styleUrl: './resetpw.component.scss'
})
export class ResetpwComponent {

  resetPasswordForm : FormGroup;

  userResponse : UserResponse;

  constructor(
    private userService : UserService,
    private localStorageService : LocalStorageService,
    private tokenService : TokenService,
    private router : Router
  ){

    this.userResponse = this.localStorageService.getValueFromLocalStorage("user");

    this.resetPasswordForm = new FormGroup({
      oldPass: new FormControl("", Validators.required),
      newPass: new FormControl("", Validators.required),
      retypePass : new FormControl("", Validators.required)
    }, { validators: CustomValidators.matchPassword('newPass', 'retypePass') });
  }

  onSubmit() {
    const updatePassDTO : UpdatePassDTO = {
      old_pass : this.resetPasswordForm.value.oldPass,
      new_pass : this.resetPasswordForm.value.newPass,
      confirm_pass : this.resetPasswordForm.value.retypePass
    }
    this.resetPass(this.userResponse.id, updatePassDTO);
  }

  resetPass(id: number, updatePassDTO : UpdatePassDTO) {
    this.userService.resetPass$(id, updatePassDTO).subscribe({
      next: (response : ResponseObject) => {
        this.tokenService.removeToken();
        this.localStorageService.removeValueFromLocalStorage("user");
        this.router.navigate(['/homepage']);
      },
      error: (error : any) =>{
        console.log(error);
      }
    })
  }
}
