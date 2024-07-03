import { Component, OnInit, input } from '@angular/core';
import { CarResponse } from '../../responses/car.response';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faSuitcaseRolling, faLocationDot, faWallet, faBolt } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';;

import { Gearbox } from '../../enums/grearbox.enum';
import { CommonModule } from '@angular/common';
import { CarImageService } from '../../services/car.image.service';
import { ResponseObject } from '../../responses/api.response';
import { CarImageResponse } from '../../responses/car.image.response';

@Component({
  selector: 'app-car-item',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule
  ],
  templateUrl: './car-item.component.html',
  styleUrl: './car-item.component.scss'
})
export class CarItemComponent implements OnInit {
  faStar = faStar;
  faSuitcaseRolling = faSuitcaseRolling;
  faLocationDot = faLocationDot;
  faHeart = faHeart;
  faWallet = faWallet;
  faBolt = faBolt;

  car = input.required<CarResponse>();
  carImages!: CarImageResponse[];

  constructor(
    private carImageService: CarImageService
  ) {
  }

  ngOnInit(): void {
    debugger
    this.getImageFromCar(this.car().id);
    debugger
  }

  getBackgroundColor(gearbox: Gearbox): string {
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

  getGearboxContent(gearbox: Gearbox): string {
    switch (gearbox) {
      case Gearbox.AT:
        return 'Số tự động';
      case Gearbox.MT:
        return 'Số sàn';
      case Gearbox.SAT:
        return 'Số bán tự động';
      case Gearbox.CVT:
        return 'Số vô cấp';
      case Gearbox.DCT:
        return 'Số ly hợp kép';
      default:
        return 'Unknown status';
    }
  }

  getImageFromCar(id: number) {
    this.carImageService.getImageFromCar$(id).subscribe({
      next: (response: ResponseObject) => {
        this.carImages = response.data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

}
