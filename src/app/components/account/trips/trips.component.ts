import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
})
export class TripsComponent implements OnInit {
  faFilter = faFilter;
  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const filterButton = document.querySelector('.button-filter') as HTMLElement;
      const filterModal = document.querySelector('.filter-modal') as HTMLElement;
      const closeFilterButton = document.getElementById('closeFilterButton') as HTMLElement;
      filterModal.style.display = 'none';

      filterButton.addEventListener('click', () => {
        filterModal.style.display = 'block';
      });

      closeFilterButton.addEventListener('click', () => {
        filterModal.style.display = 'none';
      });
    });
  }
}
