import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { ResponseObject } from '../../responses/api.response';
import { CarResponse } from '../../responses/car.response';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CarImageService } from '../../services/car.image.service';
import { CarImageResponse } from '../../responses/car.image.response';

@Component({
  selector: 'app-rent',
  standalone: true,
  templateUrl: './rent.component.html',
  styleUrl: './rent.component.scss',
  imports: [HeaderComponent, FooterComponent]
})
export class RentComponent implements OnInit {

  car!: CarResponse;
  carImages!: CarImageResponse[];

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private carImageService: CarImageService
  ) {

  }

  ngOnInit(): void {
    const carId: number = Number(this.route.snapshot.paramMap.get('id'));
    this.getCarById(carId);
    this.getImageFromCar(carId);
  }

  getCarById(carId: number) {
    this.carService.getCar$(carId).subscribe({
      next: (response: ResponseObject) => {
        this.car = response.data;
        debugger
      },
      error: (error: any) => {
        console.log(error);
      }
    })
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
