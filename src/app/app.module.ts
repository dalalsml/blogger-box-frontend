import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { PostListItemComponent } from './components/post-list-item/post-list-item.component';
import { AddPostComponent } from './components/add-post/add-post.component';

@NgModule({
  declarations: [AppComponent, TopBarComponent, PostsListComponent, PostListItemComponent, AddPostComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
