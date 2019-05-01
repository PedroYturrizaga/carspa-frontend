import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfirmacionComponent } from '../../../../../shared/others/modal-confirmacion/modal-confirmacion.component';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { setInputPattern } from '../../../../../shared/helpers/custom-validators/validators-messages/validators-messages.component';
import { RegistrarMedicamentoMaterialComponent } from './registrar-medicamento-material/registrar-medicamento-material.component';
import { MedicamentoMaterialService } from './../services/medicamento-material.service';
import { log } from 'util';

@Component({
  selector: 'app-medicamento-material',
  templateUrl: './medicamento-material.component.html',
  styleUrls: ['./medicamento-material.component.scss']
})
export class MedicamentoMaterialComponent implements OnInit {
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  @ViewChild(MatSort) matSort: MatSort;

  private displayedColumns: string[];
  private displayedSizes: number[];
  private pageSize: number;

  private matDataSource: MatTableDataSource<any>;

  private grupoMedicamentoSelected: any;

  private paramsBusqueda: any;
  private combosLista: any;
  private toolTipClearOptions: any;

  private gruposMedicamentos: any[];
  private combosGenerales: any[];

  private prodFarmaceuticosDispMedicos: any[];

  private flagInitCombo: boolean;

  private pagination: any;

  constructor(
    private _medicamentoMaterialService: MedicamentoMaterialService,
    private _toastr: ToastsManager,
    private _modalDialog: MatDialog
  ) {
    this.grupoMedicamentoSelected = null;

    this.gruposMedicamentos = [
      { id: 1, valor: "Producto Farmacéutico" },
      { id: 2, valor: "Dispositivo Médico y/o Producto Sanitario" }
    ];

    this.combosLista = {
      productoControlado:
      {
        id: 1, list: []
      },
      tipoProductoFarmaceutico:
        { id: 2, list: [] },
      unidadCompra:
        { id: 3, list: [] },
      unidadVenta:
        { id: 4, list: [] },
      tipoDispositivo:
        { id: null, list: [] },
      altoCosto: { id: null, list: [{ id: 1, valor: "Sí" }, { id: 0, valor: "No" }] }
    };

    this.toolTipClearOptions = {
      text: "Nuevo",
      position: "above"
    }

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };

    this.displayedSizes = [5, 10, 25, 100];

    this.pageSize = this.displayedSizes[0];

    this.prodFarmaceuticosDispMedicos = [];

    this.combosGenerales = [];

    this.flagInitCombo = true;
  }

  ngOnInit() {
    // concatena los id de las propiedades de comboLista: "1,2,3,4", filtrando el null
    this.getAllCombos(((Object.keys(this.combosLista)
      .map(key => this.combosLista[key].id))
      .filter(id => id !== null)).join());
    this.getAllTipoDispositivo(null);
  }

  private applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.matDataSource.filter = filterValue;
  }

  private pageEvent(_$event: any) {
    this.pagination.nuPagina = _$event.pageIndex + 1;
    this.pageSize = _$event.pageSize;
    this.getAllMedicamentos();
  }

  private searchMedicamentos() {
    this.getAllMedicamentos(1);
  }

  private clear(): void {
    let gMedicamento = (this.grupoMedicamentoSelected.id === 1) ?
      {
        tipoProductoFarmaceutico: null, nombreComercial: null
      } :
      {
        viaAdministracion: null
      };

    this.paramsBusqueda = {
      codigo: null, ean13: null,
      dci: null,
      ['dci' +
        ((this.grupoMedicamentoSelected.id === 1) ?
          'ProductoFarmaceutico' : 'DispMedicoProdSanitario')]: null,
      ...gMedicamento
    };

    this.pagination = { nuPagina: 1, nuRegisMostrar: this.pageSize };

    this.flagInitCombo = (this.flagInitCombo === true) ? this.initCombo() : false;

    this.searchMedicamentos();
  }

  //Llena la propiedad list de los elementos de combosLista
  private initCombo(): boolean {
    Object.keys(this.combosLista).forEach(key => {
      if ((this.combosLista[key])['id'] !== null) {
        (this.combosLista[key])['list'] =
          (this.combosGenerales
            .find(k => k['idGrupoOpcion'] === (this.combosLista[key]).id))['valorOpcionList'];
      }
    });
    return false;
  }

  private showModalRegistrarMedicamentoMaterial(_accion: number, _medDisp: any): void {
    const dialogRef = this._modalDialog.open(RegistrarMedicamentoMaterialComponent, {
      autoFocus: false,
      // maxWidth: '80%',
      width: '70%',
      // maxHeight: '95%',
      // height: '95%',
      disableClose: true
    });
    let variable = 0;
    if (_medDisp !== null) {

      for (let i = 0; i < this.prodFarmaceuticosDispMedicos.length; i++) {
        if (this.prodFarmaceuticosDispMedicos[i].codigo == _medDisp.codigo) {
          variable = i;
        }
      }
      this.prodFarmaceuticosDispMedicos[variable]
      Object.keys(this.prodFarmaceuticosDispMedicos[variable]).forEach(key => {
        if (key == "productoControlado") {
          this.prodFarmaceuticosDispMedicos[variable][key] = Number(this.prodFarmaceuticosDispMedicos[variable][key]);
          //this.prodFarmaceuticosDispMedicos;
        }
        if (key == "tipoProductoFarmaceutico") {
          this.prodFarmaceuticosDispMedicos[variable][key] = Number(this.prodFarmaceuticosDispMedicos[variable][key]);
          // this.prodFarmaceuticosDispMedicos  
        }
      }
      );
    }
    this.prodFarmaceuticosDispMedicos[variable].unidadVenta = { valor: this.prodFarmaceuticosDispMedicos[variable].nombreUnidadVenta, id: this.prodFarmaceuticosDispMedicos[variable].idUnidadVenta };
    this.prodFarmaceuticosDispMedicos[variable].tipoDispositivo = { valor: this.prodFarmaceuticosDispMedicos[variable].nomTipoDisp, id: this.prodFarmaceuticosDispMedicos[variable].idTipoDisp };
    dialogRef.componentInstance.grupoMedicamento = this.grupoMedicamentoSelected;
    dialogRef.componentInstance.medicamento = (_medDisp !== null && _accion === 2) ? this.prodFarmaceuticosDispMedicos[variable] : null;
    dialogRef.componentInstance.combosLista = this.combosLista;
    dialogRef.componentInstance.accion = _accion;
    dialogRef.componentInstance.toolTipClearOptions = this.toolTipClearOptions;

    dialogRef.afterClosed().subscribe(result => {
      if (result > 0) {
        this.searchMedicamentos();
      }
    });
  }

  private setInputPattern(_event: any, _pattern: any): void {
    setInputPattern(_event, _pattern);
  }

  private getAllMedicamentos(nuPagina?: number): void {
    if (this.grupoMedicamentoSelected === null) {
      return;
    }

    this.pagination.nuPagina = (nuPagina) ? nuPagina : this.pagination.nuPagina;

    Object.keys(this.paramsBusqueda).forEach(key => {
      this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    });

    this.prodFarmaceuticosDispMedicos = [];

    this.paramsBusqueda = {
      ...this.paramsBusqueda,
      ...this.pagination,
      nuRegisMostrar: this.pageSize
    };

    this._medicamentoMaterialService.getAllMedicamentos(this.paramsBusqueda, this.grupoMedicamentoSelected.id)
      .subscribe(data => {

        if (data.estado === 1) {
          this.prodFarmaceuticosDispMedicos = data[(this.grupoMedicamentoSelected.id === 1 ?
            'medicamentoList' : 'dispositivoMedicoProductosSanitarioList')];
          console.log(this.prodFarmaceuticosDispMedicos);
          this.prodFarmaceuticosDispMedicos.forEach(element =>{
            element["precioVentaDecimal"]=parseFloat(element.precioVenta).toFixed(2);
         if(element["precioVentaDecimal"] == "NaN"){
           element["precioVentaDecimal"]="-"
         }
          })
        } else {
          this._toastr.error(data.mensaje);
        }
      },
        err => { this._toastr.error(err) },
        () => {
          if (this.prodFarmaceuticosDispMedicos !== null &&
            this.prodFarmaceuticosDispMedicos.length > 0) {

            this.pagination.nuRegisMostrar = this.prodFarmaceuticosDispMedicos[0].nuTotalReg;

            let grupoAux = ((this.grupoMedicamentoSelected.id === 1) ?
              ['dciProductoFarmaceutico', 'formaFarmaceutica'] :
              ['dciDispMedicoProdSanitario', 'tipoDispositivo']);

            this.displayedColumns = ['numOrder', 'codigo', ...grupoAux, 'precioVenta', 'edit', 'eliminar'];

            // https://stackoverflow.com/questions/7486085/copying-array-by-value-in-javascript
            let prodFarmaceuticosDispMedicosAux = $.extend(true, [], this.prodFarmaceuticosDispMedicos); // cloned array deeply

            this.prodFarmaceuticosDispMedicos.forEach((obj, index = 0) => {
              Object.keys(obj).forEach(key => {
                // if (!this.displayedColumns.includes(key)) {
                //   delete obj[key];
                // }
                // else 
                if (obj[key].valor) {
                  obj[key] = obj[key].valor;
                }
              });
              obj['numOrder'] = ++index + this.pageSize * (this.pagination.nuPagina - 1);
            });

            this.matDataSource = new MatTableDataSource(this.prodFarmaceuticosDispMedicos);
            this.matPaginator._pageIndex = (nuPagina) ? nuPagina - 1 : this.matPaginator._pageIndex;

            this.matDataSource.sort = this.matSort;
            // CAMBIOS AQUI
            this.paramsBusqueda.dciProductoFarmaceutico = "";
            this.paramsBusqueda.codigo = "";
            this.paramsBusqueda.ean13 = "";
            this.paramsBusqueda.dciDispMedicoProdSanitario = "";
            this.paramsBusqueda.tipoProductoFarmaceutico = "";
            this.paramsBusqueda.viaAdministracion = "";
            this.paramsBusqueda.nombreComercial = "";
            // CAMBIOS AQUI
          }
        });
  }

  private getAllTipoDispositivo(_idTipoDispositivo: number): void {
    this._medicamentoMaterialService.getAllTiposDispositivo(_idTipoDispositivo)
      .subscribe(data => {
        if (data.estado === 1) {
          this.combosLista['tipoDispositivo'].list = data.tipoDispositivoList;
        } else {
          this._toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  private getAllCombos(_idsCombo: String): void {
    this._medicamentoMaterialService.getAllCombos(_idsCombo)
      .subscribe(data => {
        if (data.estado === 1) {
          this.combosGenerales = data.comboGeneralFarmaciaList;
        } else {
          this._toastr.error(data.mensaje);
        }
        return true;
      },
        error => {
          console.error(error);
          return Observable.throw(error);
        }
      ),
      err => console.error(err),
      () => console.log('Request Complete');
  }

  deleteMedicamento(listMedicamento) {

    const dialogRef = this._modalDialog.open(ModalConfirmacionComponent, {
      autoFocus: false,
      // maxWidth: '40%',
      // width: '50%',
      // maxHeight: '80%',
      // height: '30%',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.componentInstance.mensajeConfirmacion = "¿Desea eliminar el  " + (listMedicamento.idMedicamento ? "medicamento" : "dispositivo producto farmacéutico") + "?";

    dialogRef.afterClosed().subscribe(result => {
      if (result == 1) {

        let _parametro = { idMedicamento: null, idDispMedicoProdSanitario: null };

        if (listMedicamento.idMedicamento == null || listMedicamento.idMedicamento == undefined) {
          _parametro.idDispMedicoProdSanitario = listMedicamento.idDispMedicoProdSanitario;
          _parametro.idMedicamento = null;
        }
        else if (listMedicamento.idDispMedicoProdSanitario == null || listMedicamento.idDispMedicoProdSanitario == undefined) {
          _parametro.idMedicamento = listMedicamento.idMedicamento;
          _parametro.idDispMedicoProdSanitario = null;
        }

        this._medicamentoMaterialService.deleteUpdateEstadoMedicamentoDispositivo(_parametro)
          .subscribe(data => {
            if (data.estado === 1) {
              if (listMedicamento.idMedicamento == null || listMedicamento.idMedicamento == undefined) {
                this._toastr.success("Se eliminó el Dispositivo Médico '" + listMedicamento.dciDispMedicoProdSanitario + "' exitosamente");
              } else if (listMedicamento.idDispMedicoProdSanitario == null || listMedicamento.idDispMedicoProdSanitario == undefined) {
                this._toastr.success("Se eliminó el Producto Farmacéutico '" + listMedicamento.dciProductoFarmaceutico + "' exitosamente");
              }
              this.getAllMedicamentos(1);
            } else {
              this._toastr.error(data.mensaje, "El medicamento está siendo usado");
            }
            return true;
          },
            error => {
              console.error(error);
              return Observable.throw(error);
            }
          ),
          err => console.error(err),
          () => console.log('Request Complete');


      }
    });
  }
}
