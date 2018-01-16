import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-basiclayout',
	templateUrl: './basiclayout.component.html',
	styleUrls: ['./basiclayout.component.css']
})
export class BasiclayoutComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	activeRoute(routename: string): boolean {
		return this.router.url.indexOf(routename) > -1;
	}
}
