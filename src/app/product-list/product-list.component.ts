import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  storeId: string | null = null;
  products: any[] = [];
  currentUser: any = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.storeId = this.route.snapshot.paramMap.get('storeId');
    this.currentUser = this.authService.getCurrentUser();

    if (this.storeId) {
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
    alert(`Modifier le produit : ${product.name}`);
  }
}