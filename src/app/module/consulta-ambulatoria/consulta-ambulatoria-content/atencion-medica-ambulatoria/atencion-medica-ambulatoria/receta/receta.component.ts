import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr';
import { RecetaService } from '../../../../services/receta.service';
import { BuscarMedicamentoComponent } from './buscar-medicamento/buscar-medicamento.component';
import { ReporteService } from '../../../../../../shared/services/reporte.service';
import { Router, NavigationExtras, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.scss']
})

export class RecetaComponent implements OnInit {

  private numActoMedico;
  private idPersona: string;
  private idAtencion: any;
  private idCita: string;
  private recetaJsonDatosPaciente: any;

  private activo: any[] = [{ buscarRecetaActive: "links", registroRecetaActive: "links" }];
  private jsonNew: NavigationExtras = {
    queryParams: {
      "idPersona": null,
      "idActoMedico": null
    }
  };

  constructor(private _recetaService: RecetaService,
    private toastr: ToastsManager,
    private modalService: NgbModal,
    private _reporteService: ReporteService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this._route.queryParams.subscribe(params => {
      console.log("parametros  de Receta\n",params)
      this.idPersona = params["idPersona"];
      this.idCita = params["idCita"];
      this.numActoMedico = localStorage.getItem('idActoMedicoEncriptado'); //params["idActoMedicoEncriptado"];
      // this.numActoMedico = 'xv9JS06XPww'
      // this.idAtencion = '95hwvFXv2Yk='
      this.idAtencion = localStorage.getItem('idAtencionEncriptado'); //params["idAtencionEncriptado"];
    });
  }

  goToBuscarReceta() {
    this.activo = [{ buscarRecetaActive: "activeLinks", registroRecetaActive: "links" }];
    this._router.navigate(['principal/consulta-ambulatoria/atencion-medica-ambulatoria/atencion-medica-receta/buscar-receta'], this.jsonNew);
  }
  goToRegistroReceta() {
    this.activo = [{ buscarRecetaActive: "links", registroRecetaActive: "activeLinks" }];
    this._router.navigate(['principal/consulta-ambulatoria/atencion-medica-ambulatoria/atencion-medica-receta/generar-receta'], this.jsonNew);
  }
  
  ngOnInit() {
    this.jsonNew = {
      queryParams: {
        "idPersona": this.idPersona,
        "idCita": this.idCita,
        "idActoMedicoEncriptado": localStorage.getItem('idActoMedicoEncriptado'),
        "idAtencion": localStorage.getItem('idAtencionEncriptado'),
      }
    };
    this.goToBuscarReceta();
  }

}
