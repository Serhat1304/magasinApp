import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Product } from "../models/product.model";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProductService } from "../services/product.service";
import {CategorieService} from "../services/categorie.service"; // Import ProductService

@Component({
  selector: 'app-modif-article',
  templateUrl: './modif-article.component.html',
  styleUrls: ['./modif-article.component.scss']
})
export class ModifArticleComponent implements OnInit {
  articleForm: FormGroup;
  product: Product;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private productService: ProductService,
    private categorieService: CategorieService
  ) {
    this.product = config.data.product;
    this.articleForm = this.fb.group({
      name: [this.product.name, [Validators.required, Validators.minLength(3)]],
      categoryId: [this.product.categoryId, [Validators.required]],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      quantity: [this.product.quantity, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const updatedProduct: Product = {
        ...this.product,
        ...this.articleForm.value
      };
      this.productService.updateProduct(updatedProduct.id, updatedProduct).subscribe({
        next: (updateProduct: Product) => {
          this.dialogRef.close(updatedProduct);
        }
      })
    } else {
      console.log('Formulaire invalide');
    }
  }

  get formControls() {
    return this.articleForm.controls;
  }
}
