import {Component, Input, OnInit} from '@angular/core';
import {ModifArticleComponent} from "../modif-article/modif-article.component";
import {Product} from "../models/product.model";
import {DialogService} from "primeng/dynamicdialog";
import {MessageService, PrimeNGConfig} from "primeng/api";
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
    private messageService: MessageService
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
      data: {product},
      header: 'Modifier l\'article',
      width: '50%',
    });
    ref.onClose.subscribe((result: { product: Product; message: string }) => {
      if (result) {
        const index = this.product.findIndex(product => product.id === result.product.id);
        if (index !== -1) {
          this.product[index] = result.product;
        }
        this.showSuccessMessage(result.message);
      }
    });
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  }

  showSuccessMessage(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Succès',
      detail: message,
      life: 3000
    });  }

}
