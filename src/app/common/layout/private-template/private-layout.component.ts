import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../layout.service';
import { menuItems } from '../../../menu-items';

@Component({
    selector: 'm-private-layout',
    templateUrl: 'private-layout.component.html',
    styleUrls: ['./private-layout.component.scss']
})

export class PrivateLayoutComponent implements OnInit {
    constructor(
        private layoutService: LayoutService
    ) { }

    ngOnInit() {
        const userMenuItems = this.layoutService.getUserRecursiveMenu([...menuItems]);
        this.layoutService.setState('menuItems', userMenuItems)
    }
}
