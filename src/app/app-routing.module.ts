import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinderComponent } from './components/finder/finder.component';

const routes: Routes = [
  { path: '', component: FinderComponent },
  { path: 'personfinder', component: FinderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
