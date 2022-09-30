import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MaterialModule } from 'src/app/core/material.module';
import { PrincipalPageRoutingModule } from 'src/app/modules/principal-page/principal-page-routing.module';

import { HeaderComponent } from './header.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../../../../assets/i18n/', '.json');
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        PrincipalPageRoutingModule,
        HttpClientModule,
        TranslateModule,
        ReactiveFormsModule,
        InfiniteScrollModule,
        MaterialModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        }),
      ],
      declarations: [HeaderComponent],

    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



});
