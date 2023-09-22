import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ForumComponent} from "./forum/forum.component";
import {SplashComponent} from "./splash/splash.component";

const routes: Routes = [
  {
    path: '',
    component: SplashComponent,
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forum/:topicId',
    component: ForumComponent
  },
  {
    path: 'forum',
    component: ForumComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
