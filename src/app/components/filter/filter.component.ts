import { Component, OnInit, model } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarItemComponent } from "../car-item/car-item.component";
import { CarService } from '../../services/car.service';

import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronRight ,faCircleInfo, faPassport, faAddressCard , faArrowsRotate, faShield,faGasPump, faChair,faSuitcaseRolling, faIndustry, faStar, faPaperclip, faCarSide, faMicrochip, faSliders, faChargingStation, faGlobe, faCrown, faBoltLightning, faWallet, faMapLocationDot, faPercent} from '@fortawesome/free-solid-svg-icons';
import {faHeart, faMap} from '@fortawesome/free-regular-svg-icons';

import { ResponseObject } from '../../responses/api.response';
import { CarResponse } from '../../responses/car.response';
import { Gearbox } from '../../enums/grearbox.enum';
import { Fuel } from '../../enums/fuel.enum';
import { UtilityService } from '../../services/utility.service';
import { UtilityResponse } from '../../responses/utility.response';
import { UtilityDetailResponse } from '../../responses/utility.detail.response';
import { RateService } from '../../services/rate.service';
import { RateResponse } from '../../responses/rate.response';
import { CarFilter } from '../../models/car.filter';

@Component({
    selector: 'app-filter',
    standalone: true,
    templateUrl: './filter.component.html',
    styleUrl: './filter.component.scss',
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
        CarItemComponent,
        FontAwesomeModule
    ]
})
export class FilterComponent implements OnInit{
    faArrowsRotate = faArrowsRotate;
    faSuitcaseRolling = faSuitcaseRolling;
    faChevronRight = faChevronRight;
    faPassport = faPassport;
    faAddressCard = faAddressCard;
    faIndustry = faIndustry;
    faShield = faShield;
    faCircleInfo = faCircleInfo;
    faChair = faChair;
    faStar = faStar;
    faPaperclip = faPaperclip;
    faMap = faMap;
    faGasPump = faGasPump;
    faCarSide = faCarSide;
    faGlobe = faGlobe;
    faCrown = faCrown;
    faBoltLightning = faBoltLightning;
    faWallet = faWallet;
    faMapLocationDot = faMapLocationDot;
    faPercent = faPercent;
    faChargingStation = faChargingStation;
    faMicrochip = faMicrochip;
    faSliders = faSliders;
    faHeart = faHeart;

    timeStart = model<string>("12:00");
    timeEnd = model<string>("12:00");
    readonly range = new FormGroup({
        start: new FormControl<Date | null>(null),
        end: new FormControl<Date | null>(null)
    });

    cars : CarResponse[] = [];
    filterCars!: CarResponse[];
    selectedCar?: CarResponse;
    ratesByCarSelected : RateResponse[] = [];

    carFilter : CarFilter = 
    {
      mortgage: false,
      instant: false,
      delivery: false,
      electric_car: false
    };

    utilities : UtilityResponse[] = [];

    constructor(
        private carService : CarService,
        private utilityService : UtilityService,
        private rateService : RateService
    ) {
      
    }

    ngOnInit(): void {
        this.getCars();
        this.getUtilities();
    }

    onChangeTimeStart(event : any) {
        this.timeStart.set(event.target.value);
    }

    onChangeTimeEnd(event : any) {
        this.timeStart.set(event.target.value);
    }


    getCars() : void {
        this.carService.getCars$.subscribe({
            next: (response : ResponseObject) => {
                this.cars = response.data;
                this.filterCars = this.cars;
            },
            error : (error : any) => {
                console.log(error);
            }
        })
    }

    getUtilities() : void {
      this.utilityService.utilities$.subscribe({
        next: (response : ResponseObject) => {
          this.utilities = response.data;
          debugger
        },
        error : (error : any) => {
          console.log(error);
        }
      })
    }

    getRatesByCarId(id : number) {
      this.rateService.ratesByCarId$(id).subscribe({
        next: (response : ResponseObject) => {
          this.ratesByCarSelected = response.data;
          debugger
        },
        error : (error : any) => {
          console.log(error);
        }
      });
    }

    onSelectedCar(car : CarResponse) {
        this.selectedCar = car;
        this.getRatesByCarId(car.id);
    }
    
    inView(elementId: string): void {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    getBackgroundColor(gearbox: Gearbox | undefined): string {
        if(gearbox != undefined) {
            switch (gearbox) {
                case Gearbox.AT:
                  return '#eef7ff';
                case Gearbox.MT:
                  return '#fce0d3';
                case Gearbox.SAT:
                  return '#d9a8e0';
                case Gearbox.CVT:
                  return '#b7a9f7';
                case Gearbox.SAT:
                  return '#83e2f4';
                default:
                  return 'Unknown';
              }
        }
        return 'Unknown';
      }
    
      getGearboxContent(gearbox: Gearbox | undefined): string {
        if(gearbox != undefined) {
            switch (gearbox) {
                case Gearbox.AT:
                  return 'Số tự động';
                case Gearbox.MT:
                  return 'Số sàn';
                case Gearbox.SAT:
                  return 'Số bán tự động';
                case Gearbox.CVT:
                  return 'Số vô cấp';
                case Gearbox.SAT:
                  return 'Số ly hợp kép';
                default:
                  return 'Unknown status';
              }
        }
        return 'Unknown status';
      }

      getContentFuel(fuel : Fuel | undefined): string {
        if(fuel != undefined) {
            switch (fuel) {
                case Fuel.DIESEL:
                  return 'Dầu Diesel';
                case Fuel.ELECTRICITY:
                  return 'Điện';
                case Fuel.PETROL:
                  return 'Xăng';
                default:
                  return 'Unknown status';
              }
        }
        return 'Unknown status';
      }

      formatPrice(price: number | undefined): string {
        if(price)
          return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price).replace(/,/g, ' ');
        return "Unknown";
      }

      getIconForUtility(utilityDetailResponse : UtilityDetailResponse): string  {
        const utilityResponse: UtilityResponse | undefined = this.utilities.find(utilityResponse => utilityResponse.id === utilityDetailResponse.utility_id);
        if(utilityResponse) {
          switch(utilityResponse.name) {
            case "Bản đồ":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/map-v2.png";
            case "Camera cập lề":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/parking_camera-v2.png";
            case "Cảm biến lốp":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/tpms-v2.png";
              case "Cửa sổ trời":
                return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/sunroof-v2.png";
            case "Khe cắm USB":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/usb-v2.png";
            case "Nắp thùng xe bán tải":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/bonnet-v2.png";
            case "Bluetooth":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/bluetooth-v2.png";
            case "Camera hành trình":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/dash_camera-v2.png";
            case "Cảm biến va chạm":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/impact_sensor-v2.png";
            case "Định vị GPS":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/gps-v2.png";
            case "Lốp dự phòng":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/spare_tire-v2.png";
            case "ETC":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/etc-v2.png";
            case "Camera 360":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/360_camera-v2.png";
            case "Camera lùi":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/reverse_camera-v2.png";
            case "Cảnh báo tốc độ":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/head_up-v2.png"
            case "Ghế trẻ em":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/babyseat-v2.png";
            case "Màn hình DVD":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/dvd-v2.png";
            case "Túi khí an toàn":
              return "https://n1-cstg.mioto.vn/v4/p/m/icons/features/airbags-v2.png";
          }
        }
        return "Unknown";
      }

      getNameUtilityById(id : number) : string{
        const utilityResponse: UtilityResponse | undefined = this.utilities.find(utilityResponse => utilityResponse.id === id);
        if(utilityResponse)
          return utilityResponse.name;
        return "Unknown";
      }

      updateFilter(filterKey: string, value: any) {
        (this.carFilter as any)[filterKey] = value;
        this.applyFilters();
      }


      applyFilters() {
        this.filterCars = this.cars.filter(car => {
          let matchesMortgage = true;
          let matchesInstant = true;
          let matchesBrand = true;
          let matchesModel = true;
          debugger
          if (this.carFilter.mortgage) {
            matchesMortgage = !car.mortgage;
          }
    
          if (this.carFilter.instant) {
            matchesInstant = car.instant;
          }
    
          if (this.carFilter.brandId !== undefined) {
            matchesBrand = car.model.brand.id === this.carFilter.brandId;
          }
    
          if (this.carFilter.categoryId !== undefined) {
            matchesModel = car.model.category.id === this.carFilter.categoryId;
          }
    
          return matchesMortgage && matchesInstant && matchesBrand && matchesModel;
        });
      }
}


