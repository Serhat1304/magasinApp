import {Component, EventEmitter, OnInit, Optional, Output} from '@angular/core';
import {StoreService} from "../services/store.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-list-magasins',
  templateUrl: './list-magasins.component.html',
  styleUrls: ['./list-magasins.component.scss']
})
export class ListMagasinsComponent implements OnInit {

  stores: any[] = [];
  isDialog = false;

  constructor(private storeService: StoreService,
              @Optional()private ref: DynamicDialogRef,
              @Optional()private config: DynamicDialogConfig) {
    if (this.config?.data) {
      this.isDialog = this.config.data.isDialog || false;
    }
  }

  ngOnInit(): void {
    console.log(this.isDialog);
    this.storeService.getStores().subscribe({
      next: (data) => {
        this.stores = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des magasins :', err);
      }
    });
  }

  selectStore(store: any): void {
    if (this.isDialog && this.ref) {
      this.ref.close(store);
    }
  }
}
