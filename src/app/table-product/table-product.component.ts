import {Component, Input, OnInit} from '@angular/core';
import {ModifArticleComponent} from "../modif-article/modif-article.component";
import {Product} from "../models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {AuthService} from "../services/auth.service";
import {StoreService} from "../services/store.service";
import {DialogService} from "primeng/dynamicdialog";
import {PrimeNGConfig} from "primeng/api";
import {CategorieService} from "../services/categorie.service";
import {Category} from "../models/category.model";

@Component({
  selector: 'app-table-product',
  templateUrl: './table-product.component.html',
  styleUrls: ['./table-product.component.scss']
})
export class TableProductComponent implements OnInit {

  selectedProduct: Product | null = null;

  @Input() product!: Product[];
  @Input() categories!: Category[];
  @Input() canModify!: boolean;


  constructor(
              private dialogService: DialogService,
              private primengConfig: PrimeNGConfig,
              ) {
  }

  ngOnInit(): void {
    this.primengConfig.setTranslation({
      accept: 'Oui',
      reject: 'Non',
      choose: 'Sélectionner',
      upload: 'Télécharger',
      cancel: 'Annuler',
      startsWith: 'Commence par',
      contains: 'Contient',
      notContains: 'Ne contient pas',
      endsWith: 'Se termine par',
      equals: 'Égal à',
      notEquals: 'Différent de',
      noFilter: 'Aucun filtre',
      lt: 'Moins que',
      lte: 'Inférieur ou égal à',
      gt: 'Plus grand que',
      gte: 'Supérieur ou égal à',
      dateIs: 'Date égale à',
      dateIsNot: 'Date différente de',
      dateBefore: 'Date avant',
      dateAfter: 'Date après',
      clear: 'Effacer',
      apply: 'Appliquer',
      matchAll: 'Correspond à tous',
      matchAny: 'Correspond à un',
      addRule: 'Ajouter une règle',
      removeRule: 'Supprimer une règle',
    });
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
        this.product.push(updatedProduct);
      }
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

}
