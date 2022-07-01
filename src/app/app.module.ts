import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InventoryMainComponent } from './inventory-main/inventory-main.component';
import { InventoryHeaderComponent } from './inventory-header/inventory-header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipModule } from 'ng2-tooltip-directive';
import { GetMypartComponent } from './get-mypart/get-mypart.component';
import { FilterPartPipe } from './filters/filter-part.pipe';
import { NgToastModule } from 'ng-angular-popup';
import { FilterPartnamePipe } from './filters/filter-partname.pipe'

@NgModule({
  declarations: [
    AppComponent,
    InventoryMainComponent,
    InventoryHeaderComponent,
    GetMypartComponent,
    FilterPartPipe,
    FilterPartnamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    FlexLayoutModule,
    DragDropModule,
    MatTooltipModule,
    TooltipModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
