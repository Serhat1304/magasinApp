import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  stores: any[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getStores().subscribe({
      next: (data) => {
        this.stores = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des magasins :', err);
      }
    });
  }
}