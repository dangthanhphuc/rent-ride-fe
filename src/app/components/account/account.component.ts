import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faUpload,faRightFromBracket,faPenToSquare,faUser,faHeart,faCar,faCartShopping,faMapLocationDot,faTrash,faGift,faClipboard,faLock} from '@fortawesome/free-solid-svg-icons'
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
   FontAwesomeModule,
    HeaderComponent,
    FooterComponent,
    RouterModule,
    CommonModule
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
  
})
export class AccountComponent {
  faPenToSquare = faPenToSquare;
  faUser = faUser;
  faHeart = faHeart;
  faCar = faCar;
  faMapLocationDot = faMapLocationDot;
  faCartShopping = faCartShopping;
  faGift = faGift;
  faClipboard = faClipboard;
  faLock = faLock;
  faTrash = faTrash;
  faRightFromBracket = faRightFromBracket;
  faUpload = faUpload;


  selectIndex = 0;
  constructor(
    private tokenService : TokenService,
    private localStorageService : LocalStorageService,
    private router : Router
  ){}

  onLogout() {
    this.tokenService.removeToken();
    this.localStorageService.removeValueFromLocalStorage("user");
    this.router.navigate(['/homepage']);
  }


  onSelected(index : number) {
    this.selectIndex = index;
  }

}

