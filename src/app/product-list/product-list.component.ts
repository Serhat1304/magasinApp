import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {AuthService} from '../services/auth.service';
import {StoreService} from "../services/store.service";
import {Product} from "../models/product.model";
import {DialogService} from "primeng/dynamicdialog";
import {Category} from '../models/category.model';
import {CreateProductComponent} from '../create-product/create-product.component';
import {PrimeNGConfig} from "primeng/api";
import {CategorieService} from "../services/categorie.service";
import {ListMagasinsComponent} from "../list-magasins/list-magasins.component";

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
  categories: Category[] = [];
  selectedStore: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private authService: AuthService,
    private storeService: StoreService,
    private dialogService: DialogService,
    private primengConfig: PrimeNGConfig,
    private categorieService: CategorieService
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

    this.loadCategories();
    this.storeId = this.route.snapshot.paramMap.get('storeId');
    this.currentUser = this.authService.getCurrentUser();

    if (this.storeId) {
      this.getNameStore(this.storeId);
      this.getProductStore(this.storeId);
    }
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

  getNameStore(storeId: string): void {
    this.storeService.getStoreById(storeId).subscribe({
      next: (data) => {
        this.nameStore = data.name;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }

  getProductStore(storeId: string): void {
    this.productService.getProductsByStoreId(storeId).subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des produits :', err);
      }
    });
  }

  canModify(productStoreId: string | null): boolean {
    return (
      this.currentUser?.role === 'admin' || this.currentUser?.storeId === productStoreId
    );
  }

  openCreateProductDialog(): void {
    const ref = this.dialogService.open(CreateProductComponent, {
      header: 'Créer un nouveau produit',
      width: '50%',
      data: {storeId: this.storeId},
    });
    ref.onClose.subscribe((newProduct: Product) => {
      if (newProduct) {
        this.products.push(newProduct);
      }
    });
  }

  openChangeMagasin(): void {
    const ref = this.dialogService.open(ListMagasinsComponent, {
      header: 'Liste des magasins ',
      width: '50%',
      data: {isDialog: true},
    });
    ref.onClose.subscribe((store: any) => {
      if (store) {
        this.selectedStore = store;
        this.getProductStore(store);
        this.getNameStore(store);
      }
    });
  }
}
