import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home.routing';

import { SharedModule } from '@app/shared';
import { BankListComponent } from './modals/bank-list/bank-list.component';
import { IndexComponent } from './pages/index/index.component';

@NgModule({
    declarations: [
        BankListComponent,
        IndexComponent
    ],
    imports: [
        SharedModule,

        HomeRoutingModule
    ],
    exports: [],
    providers: [],
  entryComponents: [BankListComponent]
})
export class HomeModule {}
