import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './../../material/material.module';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { ProductContainerCreateComponent } from './containers/product-container-create/product-container-create.component';
import { ProductContainerEditComponent } from './containers/product-container-edit/product-container-edit.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductContainerCreateComponent,
    ProductContainerEditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
