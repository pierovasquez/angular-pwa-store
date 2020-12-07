import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take, tap } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  showProgressBar: boolean;

  private progress: number;
  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
    });
  }

  private createCategory() {
    const data: Partial<Category> = this.form.value;
    this.categoriesService.createCategory(data).subscribe(category => this.router.navigate(['./admin/categories']));
  }

  save() {
    if (this.form.valid) {
      this.createCategory();
    } else {
      this.form.markAllAsTouched();
    }
  }

  uploadFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.showProgressBar = true;
      const image = event.target.files[0];
      const name = `${uuidv4()}.png`;
      const ref = this.storage.ref(name);
      const task = this.storage.upload(name, image);

      task.percentageChanges().pipe(take(1)).subscribe(value => {
        this.progress = value;
        if (value === 100) {
          setTimeout(() => {
            this.showProgressBar = false;
          }, 200);
        }
      });
      task.snapshotChanges().pipe(
        finalize(() => {
          const urlImage$ = ref.getDownloadURL();
          urlImage$.pipe(tap(console.log)).subscribe(url => this.imageField.setValue(url));
        })
      ).subscribe();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  get imageField() {
    return this.form.get('image');
  }

  get progressValue() {
    return this.progress;
  }

}
