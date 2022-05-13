import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

@NgModule({
  declarations: [AppComponent, PrintInvoiceComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [CurrencyPipe, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
