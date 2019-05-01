import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-examenes-auxiliares-content',
  templateUrl: './examenes-auxiliares-content.component.html',
  styleUrls: ['./examenes-auxiliares-content.component.scss']
})
export class ExamenesAuxiliaresContentComponent implements OnInit {

  private activo: any[] = [{ laboActive: "active", imagActive: "" }];
  private arrayFlag: any[] = [{ laboFlag: false, imagFlag: false }];

  constructor() { }

  private activarTab(tab) {
    if (tab == 1) {
      this.quitarActive();
      this.activo[0].laboActive = "active";
      this.quitarFlag();
      this.arrayFlag[0].laboFlag = true;
    } else if (tab == 2) {
      this.quitarActive();
      this.activo[0].imagActive = "active";
      this.quitarFlag();
      this.arrayFlag[0].imagFlag = true;
    }
  }

  private quitarFlag() {
    this.arrayFlag[0].laboFlag = false;
    this.arrayFlag[0].imagFlag = false;
  }

  private quitarActive() {
    this.activo[0].laboActive = "";
    this.activo[0].imagActive = "";
  }
  ngOnInit() {

  }
}
