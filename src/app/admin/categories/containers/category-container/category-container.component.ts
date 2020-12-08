import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';

@Component({
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  styleUrls: ['./category-container.component.scss']
})
export class CategoryContainerComponent implements OnInit {

  category: Category;
  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    });
  }
  createCategory(category) {
    const data: Partial<Category> = category;
    this.categoriesService.createCategory(data).subscribe(rta => this.router.navigate(['./admin/categories']));
  }

  updateCategory(category) {
    const data: Partial<Category> = category;
    this.categoriesService.updateCategory(this.category._id, data).subscribe(rta => this.router.navigate(['./admin/categories']))
  }

  private getCategory(id: string) {
    this.categoriesService.getCategory(id).subscribe(category => {
      console.log('category', category);
      this.category = category;
    });
  }
}
