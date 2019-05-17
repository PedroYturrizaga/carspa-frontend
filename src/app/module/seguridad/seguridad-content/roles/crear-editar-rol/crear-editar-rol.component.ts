import { MatTableDataSource, MatDialogRef } from '@angular/material';
// import { GrupoOcupacionalService } from './../../../../maestras/services/grupo-ocupacional.service';
import { Component, OnInit, Input } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';
import { Observable } from 'rxjs';
import { RolService } from '../../../services/rol.service';

@Component({
  selector: 'app-crear-editar-rol',
  templateUrl: './crear-editar-rol.component.html',
  styleUrls: ['./crear-editar-rol.component.scss']
})
export class CrearEditarRolComponent implements OnInit {

  @Input() rolGrupOcupEdit;

  constructor(//private _grupoOcupacionalService: GrupoOcupacionalService,
    private _rolService: RolService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<CrearEditarRolComponent>) { }

  private rol = { idRol: null, nombreRol: null, areaFlag: null, ambienteFlag: null, especFlag: null, descripcion: null, idsGrupOcup: null };
  private grupOcup = null;

  private grupOcupList = [];

  private rolGrupOcupList = [];
  private displayedColumns = ['nombreGrupOcup', 'eliminar'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    // this.getGrupoOcupacional();
  }

  // private getGrupoOcupacional() {
  //   let params = { nuPagina: 1, nuRegisMostrar: 10000 }
  //   this._grupoOcupacionalService.obtenerGrupoOcupacional(params)
  //     .subscribe(data => {
  //       if (data.estado == 1) {
  //         this.grupOcupList = data.grupoOcupacionalList;
  //         this.setRolGrupOcup();

  //       } else {
  //         this.toastr.warning(data.mensaje, "No se encontraron Grupos Ocupacionales");
  //         this.grupOcupList = [];
  //       }
  //     },
  //       error => {
  //         this.toastr.error("Error al listar los Grupos Ocupacionales");
  //         return Observable.throw(error);
  //       }),
  //     err => this.toastr.error(err),
  //     () => this.toastr.success('Request Complete');
  // }

  private addGrupoOcupacional() {

    let existe = this.existElementInList(this.rolGrupOcupList, "idGrupOcup", this.grupOcup.idGrupoOcupacional);

    if (existe) {
      this.toastr.warning("Ya se ha agregado este Grupo Ocupacional en la lista.");
    } else {
      let param = {
        idGrupOcup: this.grupOcup.idGrupoOcupacional,
        nombreGrupOcup: this.grupOcup.descripcionGrupoOcupacional
      }
      this.rolGrupOcupList.push(param);
      this.dataSource = new MatTableDataSource(this.rolGrupOcupList);
    }

    this.grupOcup = null;
  }

  private deleteGrupoOcupacional(indice) {
    this.rolGrupOcupList.splice(indice, 1);
    this.dataSource = new MatTableDataSource(this.rolGrupOcupList);
  }

  private insertarActualizarRolGrupOcup(metodo) {

    if (this.rolGrupOcupList.length == 0) {
      this.toastr.warning("Debe ingresar al menos un Grupo Ocupacional")
    } else {
      let ids = "";

      for (let index = 0; index < this.rolGrupOcupList.length; index++) {
        if (index == this.rolGrupOcupList.length - 1) {
          ids += this.rolGrupOcupList[index].idGrupOcup
        } else {
          ids += this.rolGrupOcupList[index].idGrupOcup + ",";
        }
      }
      this.rol.nombreRol = (this.rol.nombreRol.replace(/\s{2,}/g, " ")).trim();

      this.rol.idsGrupOcup = ids;
      this.rol.ambienteFlag = this.rol.ambienteFlag ? 1 : 0;
      this.rol.areaFlag = this.rol.areaFlag ? 1 : 0;
      this.rol.especFlag = this.rol.especFlag ? 1 : 0;

      if (metodo == 1) {

        this._rolService.insertRolGrupOcup(this.rol)
          .subscribe(data => {
            console.log(data);

            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.close(1);
            } else if (data.estado == 0) {
              this.toastr.warning(data.confirmacion.mensaje);
            } else {
              this.toastr.error(data.mensaje);
            }
          },
            error => {
              console.log(error);
            });
      } else {
        this._rolService.updateRolGrupOcup(this.rol)
          .subscribe(data => {
            if (data.estado == 1) {
              this.toastr.success(data.mensaje);
              this.close(1);
            } else if (data.estado == 0) {
              this.toastr.warning(data.confirmacion.mensaje);
            } else {
              this.toastr.error(data.mensaje);
            }
          },
            error => {
              console.log(error);
            });
      }
    }
  }

  private setRolGrupOcup() {
    if (this.rolGrupOcupEdit != null || this.rolGrupOcupEdit != undefined) {
      this.rol.idRol = this.rolGrupOcupEdit.idRol;
      this.rol.nombreRol = this.rolGrupOcupEdit.nombreRol;
      this.rol.descripcion = this.rolGrupOcupEdit.descripcion;
      this.rol.ambienteFlag = this.rolGrupOcupEdit.ambienteFlag == 0 ? false : true;
      this.rol.areaFlag = this.rolGrupOcupEdit.areaFlag == 0 ? false : true;
      this.rol.especFlag = this.rolGrupOcupEdit.especFlag == 0 ? false : true;
      this.rol.idsGrupOcup = this.rolGrupOcupEdit.idsGrupoOcup;

      let ids = this.rol.idsGrupOcup.split(",");

      this.rolGrupOcupList = [];
      this.grupOcupList.forEach(grupOcup => {
        ids.forEach(id => {
          if (grupOcup.idGrupoOcupacional == id) {

            let obj = {
              idGrupOcup: grupOcup.idGrupoOcupacional,
              nombreGrupOcup: grupOcup.descripcionGrupoOcupacional
            }
            this.rolGrupOcupList.push(obj);
          }
        });
      });

      this.dataSource = new MatTableDataSource(this.rolGrupOcupList);
    }
  }

  //--------------------------------------------------------------------------------------------------------------
  private close(add) {
    this.dialogRef.close(add);
  }

  //--LOGICA--------------------------------------------------------------------------------------------------------------

  private existElementInList(list, prop, element): boolean {
    for (let _item of list) {
      if (_item[prop] == element) {
        return true;
        // break;
      }
    }
    return false;
  }

}
