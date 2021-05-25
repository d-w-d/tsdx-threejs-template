import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxWrapperModule } from 'ngx-wrapper';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxWrapperModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
