import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUpload,faRightFromBracket,faPenToSquare,faUser,faHeart,faCar,faCartShopping,faMapLocationDot,faTrash,faGift,faClipboard,faLock} from '@fortawesome/free-solid-svg-icons'
import { UserResponse } from '../../../responses/user.response';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-infor',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './infor.component.html',
  styleUrl: './infor.component.scss'
})
export class InforComponent {
  faUpload = faUpload;
  faPenToSquare = faPenToSquare;

  userResponse : UserResponse;

  constructor(
    private localStorageService : LocalStorageService
  ){
    this.userResponse = this.localStorageService.getValueFromLocalStorage("user");
  }
}
