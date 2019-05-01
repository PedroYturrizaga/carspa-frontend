import { MatDialogRef } from '@angular/material';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import * as $ from 'jquery';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.scss']
})
export class ModalPdfComponent implements OnInit {

  @Input() mystring: string;
  url: SafeResourceUrl;
  private urlPdf :any;
  // private url;
  constructor(private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<any>) {
  }
  ngOnInit() {
    
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.mystring);

    // this.urlPdf = "data:application/pdf;base64,"+this.mystring;
    // console.log(this.urlPdf);
        

    // if (this.url != undefined && this.url != null) {
    //   this.dialogRef.updateSize('80%', '95%');
    // }
  }
}
