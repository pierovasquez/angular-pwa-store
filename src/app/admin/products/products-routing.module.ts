import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ProductContainerCreateComponent } from './containers/product-container-create/product-container-create.component';
import { ProductContainerEditComponent } from './containers/product-container-edit/product-container-edit.component';


const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'create',
    component: ProductContainerCreateComponent
  },
  {
    path: 'edit/:id',
    component: ProductContainerEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
