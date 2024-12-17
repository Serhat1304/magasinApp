import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ButtonModule} from "primeng/button";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import { EuroCurrencyDirective } from './shared/directive/euro-currency.directive';
import { ModifArticleComponent } from './modif-article/modif-article.component';
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";
import {ProductService} from "./services/product.service";
import {CreateProductComponent} from "./create-product/create-product.component";
import { TableProductComponent } from './table-product/table-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    ProductListComponent,
    EuroCurrencyDirective,
    ModifArticleComponent,
    CreateProductComponent,
    TableProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    PaginatorModule,
    ToastModule,
    DialogModule
  ],
  exports: [
    EuroCurrencyDirective
  ],
  providers: [DialogService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
