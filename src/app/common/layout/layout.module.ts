import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbDropdownModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { MatSliderModule } from '@angular/material/slider';

import { HeaderComponent } from './header/header.component';
import { PageContainerComponent } from './page/page-container/page-container.component';
import { PageHeaderComponent } from './page/page-header/page-header.component';
import { PageTitleComponent } from './page/page-title/page-title.component';
import { PrivateLayoutComponent } from './private-template/private-layout.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        TranslateModule,
        NgbDropdownModule,
        NgbPopoverModule,
        FontAwesomeModule,
        MatSliderModule
    ],
    exports: [
        HeaderComponent,
        PrivateLayoutComponent,
        PageTitleComponent,
        PageHeaderComponent,
        PageContainerComponent,
        FooterComponent,
        FontAwesomeModule
    ],
    declarations: [
        HeaderComponent,
        PrivateLayoutComponent,
        PageTitleComponent,
        PageHeaderComponent,
        PageContainerComponent,
        FooterComponent
    ],
    providers: [],
})
export class LayoutModule { }
