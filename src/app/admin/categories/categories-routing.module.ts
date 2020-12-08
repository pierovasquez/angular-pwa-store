import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryContainerComponent } from './containers/category-container/category-container.component';


const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent
  },
  {
    path: 'create',
    component: CategoryContainerComponent
  },
  {
    path: 'edit/:id',
    component: CategoryContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
