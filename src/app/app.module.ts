import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';


import { AppComponent } from './app.component';
import { FurnitureComponent } from './furniture/furniture.component';
import { CarsComponent } from './cars/cars.component';
import { BasiclayoutComponent } from './layout/basiclayout/basiclayout.component';
import { Furniture2Component } from './furniture2/furniture2.component';
<<<<<<< HEAD
import { FbxsampleComponent } from './fbxsample/fbxsample.component';
=======
import { TestComponent } from './test/test.component';
>>>>>>> 66e68183a97208d52544b60e3023747aeb855d47


@NgModule({
  declarations: [
    AppComponent,
    FurnitureComponent,
    CarsComponent,
    BasiclayoutComponent,
    Furniture2Component,
<<<<<<< HEAD
    FbxsampleComponent
=======
    TestComponent
>>>>>>> 66e68183a97208d52544b60e3023747aeb855d47
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
