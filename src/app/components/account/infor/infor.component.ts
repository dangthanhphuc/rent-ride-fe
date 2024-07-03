import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUpload,faRightFromBracket,faPenToSquare,faUser,faHeart,faCar,faCartShopping,faMapLocationDot,faTrash,faGift,faClipboard,faLock} from '@fortawesome/free-solid-svg-icons'

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
}
