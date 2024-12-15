import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../models/product.model";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-modif-article',
  templateUrl: './modif-article.component.html',
  styleUrls: ['./modif-article.component.scss']
})
export class ModifArticleComponent{

  articleForm: FormGroup;
  product: Product;
  isModalVisible = false;

  constructor(private fb: FormBuilder,
              public dialogRef: DynamicDialogRef,
              public config: DynamicDialogConfig
  ) {
    this.product = config.data.product;
    this.articleForm = this.fb.group({
      name: [this.product.name, [Validators.required, Validators.minLength(3)]],
      category: [this.product.category, [Validators.required]],
      price: [this.product.quantity, [Validators.required, Validators.min(0)]],
      quantity: [this.product.price, [Validators.required, Validators.min(1)]],
    })
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const updatedProduct: Product = this.articleForm.value;
      this.dialogRef.close(updatedProduct);
    } else {
      console.log('Formulaire invalide');
    }
  }

  get formControls() {
    return this.articleForm.controls;
  }
}
