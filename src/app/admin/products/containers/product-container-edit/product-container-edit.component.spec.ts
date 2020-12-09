import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContainerEditComponent } from './product-container-edit.component';

describe('ProductContainerEditComponent', () => {
  let component: ProductContainerEditComponent;
  let fixture: ComponentFixture<ProductContainerEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductContainerEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContainerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
