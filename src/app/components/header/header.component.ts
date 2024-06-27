import { Component } from '@angular/core';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import { LocalStorageService } from '../../services/local-storage.service';
import { UserResponse } from '../../responses/user.response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  faBell = faBell;
  faChevronDown = faChevronDown;

  userResponse : UserResponse;

  constructor(
    private localStorageService : LocalStorageService
  ) {
    this.userResponse = this.localStorageService.getValueFromLocalStorage("user");
  }


}
