import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
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
  constructor() {}
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
  ngOnInit(): void {}

  runReport() {
    this.generateReport('open');
  }

  generateReport(action) {
    let docDefinition = {
      header: 'Argonic Shoes',
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
                text: `Date: ${new Date().toLocaleString()}`,
                style: 'customerContact',
              },
              {
                text: `Bill No : ${(Math.random() * 1000).toFixed(0)}`,
                style: 'customerContact',
              },
            ],
          ],
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
