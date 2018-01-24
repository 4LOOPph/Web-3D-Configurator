import { Routes, CanActivate } from '@angular/router';

import { FurnitureComponent } from './furniture/furniture.component';
import { CarsComponent } from './cars/cars.component';
import { Furniture2Component } from './furniture2/furniture2.component';
import { BasiclayoutComponent } from './layout/basiclayout/basiclayout.component';
import { FbxsampleComponent } from './fbxsample/fbxsample.component';
import { TestComponent } from './test/test.component';
import { Interior1Component } from './interior1/interior1.component';
import { Blueprint3dComponent } from './blueprint3d/blueprint3d.component';
import { CameraCinematicsComponent } from './camera-cinematics/camera-cinematics.component';

export const ROUTES: Routes = [
	// Main redirect
	{ path: '', redirectTo: 'furnitures', pathMatch: 'full' },
	{
		path: '', component: BasiclayoutComponent,
		children: [
			{ path: 'furnitures', component: FurnitureComponent },
			{ path: 'cars', component: CarsComponent },
			{ path: 'furniture2', component: Furniture2Component },
			{ path: 'fbxsample', component: FbxsampleComponent },
			{ path: 'test', component: TestComponent },
			{ path: 'interior1', component: Interior1Component },
			{ path: 'blueprint3d', component: Blueprint3dComponent },
			{ path: 'camera', component: CameraCinematicsComponent },
		]
	},
	// Handle all other routes
	{ path: '**', redirectTo: 'fbxsample' }
];