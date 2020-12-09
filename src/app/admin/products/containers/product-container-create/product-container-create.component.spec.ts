import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductContainerCreateComponent } from './product-container-create.component';

describe('ProductContainerCreateComponent', () => {
  let component: ProductContainerCreateComponent;
  let fixture: ComponentFixture<ProductContainerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductContainerCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductContainerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
