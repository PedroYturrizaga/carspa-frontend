import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cita-examenes-auxiliares',
  templateUrl: './cita-examenes-auxiliares.component.html',
  styleUrls: ['./cita-examenes-auxiliares.component.scss']
})
export class CitaExamenesAuxiliaresComponent implements OnInit {

  private idPersona: string;
  private idActoMedico: string;
  private idAtencionEncriptado: string;

  private IPRESS: any;

  constructor(private _route: ActivatedRoute, ) {
    this._route.queryParams.subscribe(params => {
    this.idActoMedico = localStorage.getItem("idActoMedicoEncriptado");// "1HpgSovibAc="//localStorage.getItem("idActoMedicoEncriptado");
      this.idAtencionEncriptado =  localStorage.getItem("idAtencionEncriptado"); //"95hwvFXv2Yk="// localStorage.getItem("idAtencionEncriptado");
      this.idPersona = params["idPersona"]; //"NNre+FmOTEBVHK0PDT6cwA=="// params["idPersona"];
    });
  }

  ngOnInit() {
    console.log("Acto Medico", this.idActoMedico)
    console.log("Atencion", this.idAtencionEncriptado)
    console.log("idPersona", this.idPersona)

  }
}
