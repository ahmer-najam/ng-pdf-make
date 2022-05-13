import { style } from '@angular/animations';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Pdf } from '../shared/pdf.model';
import { PdfService } from '../shared/pdf.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Roboto: {
    normal:
      // 'https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata',
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.css'],
})
export class PrintInvoiceComponent implements OnInit {
  money: any = '';
  newArr: Pdf[] = [];
  constructor(
    private datePipe: DatePipe,
    public currencyPipe: CurrencyPipe,
    public services: PdfService
  ) {
    this.money = this.invoice.products.reduce(
      (sum, p) => sum + p.qty * p.price,
      0
    );
  }
  invoice: Invoice = {
    customerName: 'Ahmer Najam',
    address: 'Scheme-33 Karachi',
    contactNo: '03040008757',
    email: 'ahmer.najam@gmail.com',
    additionalDetails: 'Payment would be done in USD',
    products: [
      { name: 'Nike', price: 15.25, qty: 3 },
      { name: 'Rebok', price: 20.25, qty: 5 },
      { name: 'Puma', price: 17.25, qty: 2 },
    ],
  };
  ngOnInit(): void {
    console.log(this.getData());
  }
  getData() {
    this.services.getAlldata().subscribe(
      (res) => {
        this.newArr = res as Pdf[];
        alert('Data is coming');
      },
      (err) => {
        console.log('Error');
      }
    );
  }
  runReport() {
    this.generateReport('open');

    // onclick download
  }

  generateReport(action) {
    // Create Method
    let docDefinition = {
      // Define footer Page etc : 1 of 1 , 1 of 2

      footer: function (currentPage, pageCount) {
        // every object will be  return parameter {Compulsory}
        return {
          text: currentPage.toString() + ' of ' + pageCount.toString(),
          style: 'footer',
        };
      },
      header: function (currentPage, pageCount, pageSize) {
        // you can apply any logic and return any valid pdfmake element

        return [
          {
            text: 'INVOICE',
            alignment: 'center',
            margin: [0, 20],
            //alignment: currentPage % 2 ? 'left' : 'right',
          },
          {
            canvas: [
              { type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 },
            ],
          },
        ];
      },

      content: [
        {
          text: 'SHOE SHOP',
          style: 'subHeader',
          margin: [5, 20],
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold: true,
              },
              { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo },
            ],
            [
              {
                text: `Date: ${this.datePipe.transform(
                  Date.now(),
                  'dd-MMM-yyyy'
                )}`,
                style: 'customerContact',
              },
              {
                text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
                style: 'customerContact',
              },
            ],
          ],
        },
        {
          text: '\r\r\r',
        },
        {
          layout: 'lightHorizontalLines',
          style: 'tableStyle',
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Product', style: 'tableHeader' },
                { text: 'Price', style: 'tableHeader' },
                { text: 'Quantity', style: 'tableHeader' },
                { text: 'Amount', style: 'tableHeader' },
              ],
              ...this.invoice.products.map((p) => [
                p.name,
                p.price,
                p.qty,
                (p.price * p.qty).toFixed(2),
              ]),

              [
                { text: ' Total Amount ', colSpan: 2 },
                {},
                {},
                {
                  text: `${this.currencyPipe.transform(this.money)}`,
                },
              ],
            ],
          },
        },
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15],
        },
        subHeader: {
          fontSize: 16,
          alignment: 'center',
          color: '#047886',
        },
        customerContact: {
          alignment: 'right',
        },
        tableStyle: {
          margin: [0, 25],
        },
        tableHeader: {
          bold: true,
          fillColor: '#EcEcEc',
        },
        footer: {
          alignment: 'center',
        },
      },
    };

    //Open/Download/Print Report
    if (action === 'download') {
      pdfMake.createPdf(docDefinition).download();
    } else if (action === 'print') {
      pdfMake.createPdf(docDefinition).print();
    } else {
      pdfMake.createPdf(docDefinition).open();
    }
  }
}

class Product {
  name: string;
  price: number;
  qty: number;
}
class Invoice {
  customerName: string;
  address: string;
  contactNo: string;
  email: string;
  products: Product[] = [];
  additionalDetails: string;
}
