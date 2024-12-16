import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import {StoreService} from "../services/store.service";
import {Product} from "../models/product.model";
import {DialogService} from "primeng/dynamicdialog";
import {ModifArticleComponent} from "../modif-article/modif-article.component";
import { Category } from '../models/category.model';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [DialogService] // Add DialogService to providers
})
export class ProductListComponent implements OnInit {
  storeId: string | null = null;
  nameStore: String | undefined;
  products: any[] = [];
  currentUser: any = null;
  selectedProduct: Product | null = null;
  categories: Category[] = [];
  selectedCategoryId: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private storeService: StoreService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
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
    this.loadCategories();
  }

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
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

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  openCreateProductDialog(): void {
    const ref = this.dialogService.open(CreateProductComponent, {
      header: 'Créer un nouveau produit',
      width: '50%',
    });
    ref.onClose.subscribe((newProduct: Product) => {
      if (newProduct) {
        this.products.push(newProduct);
      }
    });
  }
}
