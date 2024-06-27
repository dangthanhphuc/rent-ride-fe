import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faFacebook,faTiktok,faTwitter} from '@fortawesome/free-brands-svg-icons'
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  faFacebook = faFacebook;
  faTiktok = faTiktok;
  faTwitter = faTwitter;
}
