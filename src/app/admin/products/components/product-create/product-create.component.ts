import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';

import { finalize, takeUntil } from 'rxjs/operators';

import { MyValidators } from './../../../../utils/validators';

import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit, OnDestroy {

  @Input()
  set categories(data: Category[]) {
    if (data) {
      this._categories = data;
    }
  }
  get categories(): Category[] {
    return this._categories;
  }
  @Output() save: EventEmitter<Product> = new EventEmitter<Product>();

  private progress: number;
  private _categories: Category[];
  form: FormGroup;
  showProgressBar: boolean;
  image$: Observable<any>;

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

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.save.emit(product);
    } else {
      this.form.markAllAsTouched();
    }
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
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe(url => {
            console.log(url);
            this.form.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      category_id: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: [4, Validators.required]
    });
  }

  get imageField() {
    return this.form.get('image');
  }

  get nameField() {
    return this.form.get('name');
  }

  get descriptionField() {
    return this.form.get('description');
  }

  get priceField() {
    return this.form.get('price');
  }

  get categoryField() {
    return this.form.get('category_id');
  }

  get progressValue() {
    return this.progress;
  }

}
