import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { MyValidators } from 'src/app/utils/validators';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {

  @Input()
  set category(data: Category) {
    if (data) {
      this.isNew = false;
      this.form.patchValue(data);
    }
  }
  @Output() create: EventEmitter<Category> = new EventEmitter<Category>();
  @Output() update: EventEmitter<Category> = new EventEmitter<Category>();

  form: FormGroup;
  showProgressBar: boolean;
  isNew = true;

  private progress: number;
  private $destroy = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)], MyValidators.validateCategory(this.categoriesService)],
      image: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      if (!this.isNew) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
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

      task.percentageChanges().pipe(takeUntil(this.$destroy)).subscribe(value => {
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
