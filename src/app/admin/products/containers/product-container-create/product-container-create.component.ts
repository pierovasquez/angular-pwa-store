import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-container-create',
  templateUrl: './product-container-create.component.html',
  styleUrls: ['./product-container-create.component.scss']
})
export class ProductContainerCreateComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(
    private productService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
  ) {
    this.categories$ = this.categoriesService.getAllCategories();
  }

  ngOnInit(): void {
  }


  saveProduct(product) {
    this.productService.createProduct(product).subscribe(newProduct => this.router.navigate(['./admin/products']));
  }
}
