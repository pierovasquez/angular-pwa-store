import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyValidators } from './../../../../utils/validators';
import { Product } from 'src/app/core/models/product.model';
import { Category } from 'src/app/core/models/category.model';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  @Input()
  set product(data: Product) {
    if (data) {
      this.form.patchValue(data);
    }
  }

  @Input()
  set categories(data: Category[]) {
    if (data) {
      this._categories = data;
    }
  }
  get categories(): Category[] {
    return this._categories;
  }

  @Output() update: EventEmitter<Product> = new EventEmitter<Product>();

  form: FormGroup;
  showProgressBar: boolean;

  private progress: number;
  private _categories: Category[];
  private $destroy = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

  uploadFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.showProgressBar = true;
      const file = event.target.files[0];
      const name = 'image.png';
      const fileRef = this.storage.ref(name);
      const task = this.storage.upload(name, file);
      this.subscribeToPercentChanges(task);
      this.subscribeToSnapshotChanges(task, fileRef);

    }
  }

  private subscribeToPercentChanges(task: AngularFireUploadTask) {
    task.percentageChanges().pipe(takeUntil(this.$destroy)).subscribe(value => {
      this.progress = value;
      if (value === 100) {
        setTimeout(() => {
          this.showProgressBar = false;
        }, 400);
      }
    });
  }

  private subscribeToSnapshotChanges(task: AngularFireUploadTask, fileRef: AngularFireStorageReference) {
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.form.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.update.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      _id: ['', [Validators.required]],
      category_id: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  get nameField() {
    return this.form.get('name');
  }
  get categoryField(){
    return this.form.get('category_id');
  }
  get priceField() {
    return this.form.get('price');
  }

  get imageField() {
    return this.form.get('image');
  }

  get descriptionField() {
    return this.form.get('description');
  }
  get progressValue() {
    return this.progress;
  }

}
