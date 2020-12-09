import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { ProductsService } from 'src/app/core/services/products/products.service';

@Component({
  selector: 'app-product-container-edit',
  templateUrl: './product-container-edit.component.html',
  styleUrls: ['./product-container-edit.component.scss']
})
export class ProductContainerEditComponent implements OnInit {

  product: Product;
  categories$: Observable<Category[]>;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.categories$ = this.categoriesService.getAllCategories();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      map((params: Params) => params.id),
      switchMap(id => this.productsService.getProduct(id))
    ).subscribe(product => this.product = product)
  }

  updateProduct(product: Product) {
    this.productsService.updateProduct(product._id, product).subscribe(newProduct => this.router.navigate(['./admin/products']))
  }
}
