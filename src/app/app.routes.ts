import { Routes, CanActivate } from '@angular/router';

import { FurnitureComponent } from './furniture/furniture.component';
import { CarsComponent } from './cars/cars.component';

import { BasiclayoutComponent } from './layout/basiclayout/basiclayout.component';


export const ROUTES: Routes = [
	// Main redirect
	{ path: '', redirectTo: 'furnitures', pathMatch: 'full' },
	{
		path: '', component: BasiclayoutComponent,
		children: [
			{ path: 'furnitures', component: FurnitureComponent }
		]
	},
	{
		path: '', component: BasiclayoutComponent,
		children: [
			{ path: 'cars', component: CarsComponent },
		]
	},
	// Handle all other routes
	{ path: '**', redirectTo: 'furnitures' }
];