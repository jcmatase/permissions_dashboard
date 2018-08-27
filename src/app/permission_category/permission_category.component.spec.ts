import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionCategoryComponent } from './permission_category.component';

describe('PermissionCategoryComponent', () => {
  let component: PermissionCategoryComponent;
  let fixture: ComponentFixture<PermissionCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermissionCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
