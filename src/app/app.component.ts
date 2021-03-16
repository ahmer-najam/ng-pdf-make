import { style } from '@angular/animations';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

pdfMake.fonts = {
  Roboto: {
    normal:
      // 'https://fonts.googleapis.com/css2?family=Crimson+Pro&family=Literata',
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics:
      'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private cp: CurrencyPipe, private datePipe: DatePipe) {}

  title = 'ng-pdf-make';
  dataSource = [];
  columnHeader = ['ID', 'Name', 'Dept.', 'Salary'];
  row = ['1001', 'Ahmer Najam', 'IT', '20000'];
  grandTotal;
  data = [
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
    { id: 1001, name: 'Ahmer Najam', department: 'IT', salary: 10000 },
    { id: 1002, name: 'Atif Hussain', department: 'IT', salary: 50000 },
    { id: 1003, name: 'Ahsan Hameed', department: 'IT', salary: 25000 },
    { id: 1004, name: 'Wali Muhammad', department: 'IT', salary: 12500 },
  ];

  generatePDF() {
    let docDefinition = {
      margin: '5px',
      header: {
        columns: [
          { text: 'Report Header', alignment: 'center', margin: [0, 15, 0, 0] },
        ],
      },
      footer: {
        columns: [
          {
            text: this.datePipe.transform(Date.now(), 'dd-MMM-yyyy HH:mm'),
            alignment: 'left',
            margin: [10, 2, 10, 2],
            style: ['footerStyle'],
          },
          {
            text: 'Right part',
            alignment: 'right',
            margin: [10, 2, 10, 2],
            style: ['footerStyle'],
          },
        ],
      },

      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['ID', 'Name', 'Department', 'Salary'],
              ...this.dataSource,
              [
                '',
                '',
                'Grand Total',
                {
                  text: this.cp.transform(
                    this.grandTotal,
                    'PKR. ',
                    'symbol',
                    '1.2-2'
                  ),
                  style: ['totalStyle'],
                },
              ],
            ],
          },
        },
      ],
      styles: {
        defaultStyle: {
          fontSize: 15,
          font: 'Roboto',
        },
        totalStyle: {
          fontSize: 15,
          bold: true,
        },
        footerStyle: {
          fontSize: 8,
        },
      },
    };

    pdfMake.createPdf(docDefinition).open();
  }

  runReport() {
    this.data.forEach((row) => {
      let dataRow = new Array(
        row.id.toString(),
        row.name,
        row.department,
        this.cp.transform(row.salary, 'PKR. ', 'symbol', '1.2-2')
      );
      this.dataSource.push(dataRow);
    });

    this.grandTotal = this.data.reduce((sum, item) => sum + item.salary, 0);

    this.generatePDF();
  }
}
