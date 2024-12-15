import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import {StoreService} from "../services/store.service";
import {Product} from "../models/product.model";
import {DialogService} from "primeng/dynamicdialog";
import {ModifArticleComponent} from "../modif-article/modif-article.component";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  storeId: string | null = null;
  nameStore: String | undefined;
  products: any[] = [];
  currentUser: any = null;
  selectedProduct: Product | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private storeService: StoreService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.paramMap.get('storeId');
    this.currentUser = this.authService.getCurrentUser();

    if (this.storeId) {
      this.storeService.getStoreById(this.storeId).subscribe({
        next: (data) => {
          this.nameStore = data.name;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des produits :', err);
        }
      });
      this.productService.getProductsByStoreId(this.storeId).subscribe({
        next: (data) => {
          this.products = data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des produits :', err);
        }
      });
    }
  }

  canModify(productStoreId: string): boolean {
    return (
      this.currentUser?.role === 'admin' || this.currentUser?.storeId === productStoreId
    );
  }

  editProduct(product: any): void {
    this.selectedProduct = product;
    const ref = this.dialogService.open(ModifArticleComponent, {
      data: { product },
      header: 'Modifier l\'article',
      width: '50%',
    });
    ref.onClose.subscribe((updatedProduct: Product) => {
      if (updatedProduct) {
        console.log('Produit modifié:', updatedProduct);
      }
    });
  }
}
