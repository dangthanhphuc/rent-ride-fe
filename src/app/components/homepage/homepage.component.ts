import { AfterViewInit, Component, ViewChild, input, model, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faLocationDot, faCalendarDays, faCar} from '@fortawesome/free-solid-svg-icons';
import {faUser, faCircleQuestion} from '@fortawesome/free-regular-svg-icons';
import { RentType } from '../../enums/rent.type';
import { CommonModule } from '@angular/common';

import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.scss',
    providers: [provideNativeDateAdapter()],
    imports: [
        ReactiveFormsModule,
        HeaderComponent,
        FooterComponent,
        FontAwesomeModule,
        CommonModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatInputModule,
        FormsModule,
        MatIconModule,
        RouterModule
    ]
})
export class HomepageComponent implements AfterViewInit {
    faUser = faUser;
    faLocationDot = faLocationDot;
    faCalendarDays = faCalendarDays;
    faCircleQuestion = faCircleQuestion;

    RentType = RentType;
    rentTypes = [RentType.SELF_DRIVE, RentType.WITH_DRIVER];
    selectedRentType : RentType | null = null;
    tripMode = signal<string>("city");

    timeStart = model<string>("12:00");
    timeEnd = model<string>("12:00");
    readonly range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
      });

    constructor() {
        this.selectedRentType = RentType.SELF_DRIVE;
    }
    ngAfterViewInit(): void {
        // this.campaignTwoPicker.open();
    }   

    onClickOption(rentType : RentType) {
        this.selectedRentType = rentType;
    }

    getOptionIcon(option: RentType) {
        switch (option) {
          case RentType.SELF_DRIVE:
            return faUser;
          case RentType.WITH_DRIVER:
            return faCar;
        //   case RentType.LONG_TERM:
        //     return faCalendarAlt;
          default:
            return faCar;
        }
    }

    onChangeRadio(changeRadio : string) {
        this.tripMode.set(changeRadio);
    }

    openTimePicker() {
        const timeInput = document.getElementById('meeting-time') as HTMLInputElement;
        timeInput.focus();
        timeInput.click(); // This ensures the native time picker opens
    }
    
    onChangeTimeStart(event : any) {
        this.timeStart.set(event.target.value);
    }

    onChangeTimeEnd(event : any) {
        this.timeStart.set(event.target.value);
    }

    onSearch() {
        
    }
}
