import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {CategorieService} from "../services/categorie.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
  productForm: FormGroup;
  categories: Category[] = [];
  storeId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private categorieService: CategorieService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.storeId = this.config.data?.storeId || null;
    console.log(this.storeId);
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        ...this.productForm.value,
        storeId: this.storeId
      };

      this.productService.addProduct(product).subscribe({
        next: (createdProduct) => {
          this.dialogRef.close(createdProduct);
        },
        error: (err) => {
          console.error('Erreur lors de la création du produit:', err);
        },
      });
    } else {
      console.log('Le formulaire est invalide.');
    }
  }

}
