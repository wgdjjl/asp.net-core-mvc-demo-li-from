import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule, NZ_I18N, ja_JP } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import ja from '@angular/common/locales/ja';

registerLocaleData(ja);

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { HomeModule } from './modules/home/home.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // angular
    BrowserModule,

    // 3rd party
    NgZorroAntdModule,

    // core & shared
    CoreModule,
    SharedModule,

    // features
    HomeModule,

    // app
    AppRoutingModule
  ],
  providers: [{ provide: NZ_I18N, useValue: ja_JP }],
  bootstrap: [AppComponent]
})
export class AppModule { }
