import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { response } from 'express';
import { ResponseObject } from '../../responses/api.response';
import { CarResponse } from '../../responses/car.response';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-rent',
    standalone: true,
    templateUrl: './rent.component.html',
    styleUrl: './rent.component.scss',
    imports: [HeaderComponent, FooterComponent]
})
export class RentComponent implements OnInit {

  car!: CarResponse;

  constructor(
    private route: ActivatedRoute,
    private carService : CarService
  ) {

  }

  ngOnInit(): void {
    const carId : number = Number(this.route.snapshot.paramMap.get('id'));
    this.getCarById(carId);
  }

  getCarById(carId : number) {
    this.carService.getCar$(carId).subscribe({
      next: (response : ResponseObject) => {
        this.car = response.data;
        debugger
      },
      error: (error : any) => {
        console.log(error);
      }
    })
  }

}
