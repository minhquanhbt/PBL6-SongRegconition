import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutModule } from './common/layout/layout.module';
import { PrivateLayoutComponent } from './common/layout/private-template/private-layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/song-regconition', pathMatch: 'full' },
  {
    path: 'app',
    component: PrivateLayoutComponent,
    children: [
      {
        path: 'song-regconition',
        loadChildren: () =>
          import('./features/song-regconition/song-regconition.module').then((m) => m.SongRegconitionModule),
      },
      {
        path: 'song-discover',
        loadChildren: () =>
          import('./features/song-discover/song-discover.module').then((m) => m.SongDiscoverModule),
      },
      {
        path: 'song-result/:id',
        loadChildren: () =>
          import('./features/song-result/song-result.module').then((m) => m.SongResultModule),
      },
    ],
  },
];

@NgModule({
  imports: [LayoutModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
