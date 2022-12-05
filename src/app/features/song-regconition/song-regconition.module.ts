import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SongRegconitionComponent } from './song-regconition.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModalModule, NgbTooltipModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LayoutModule } from 'src/app/common/layout/layout.module';

const routes: Routes = [
  {
    path: '',
    component: SongRegconitionComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FontAwesomeModule,
    ToastrModule,
    NgbModalModule,
    NgbTooltipModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
  ],
  exports: [],
  declarations: [
    SongRegconitionComponent
  ],
  providers: [],
})
export class SongRegconitionModule { }
