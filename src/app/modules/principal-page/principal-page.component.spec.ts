import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/core/material.module';
import { PrincipalPageRoutingModule } from './principal-page-routing.module';

import { PrincipalPageComponent } from './principal-page.component';

describe('PrincipalPageComponent', () => {
  let component: PrincipalPageComponent;
  let fixture: ComponentFixture<PrincipalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PrincipalPageRoutingModule,
        HttpClientModule,
        TranslateModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MaterialModule
      ],
      declarations: [PrincipalPageComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PrincipalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
