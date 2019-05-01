import { Component, OnInit, Input } from '@angular/core';
import { ReporteFarmaciaService } from '../../../../services/reporte-farmacia.service';
import { ToastsManager } from 'ng2-toastr';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-visualizar-medico-producto-caro',
  templateUrl: './visualizar-medico-producto-caro.component.html',
  styleUrls: ['./visualizar-medico-producto-caro.component.scss']
})
export class VisualizarMedicoProductoCaroComponent implements OnInit {
  displayedColumns = ['Id Receta', 'Producto Farmacéutico / Dispositivo Médico', 'Medico', 'Fecha', 'Unidad de Medida', 'Cantidad','Precio'];
  
  // private paramsBusqueda = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null, idMedicamento: null, idPersonal: null, medicproducdisp: null };
  private receCab: any = [];
  private recetaDetalle;
  private pagination: any;
  private medicproducdisp;
  private pageSize: number;
  dataSource = new MatTableDataSource();
  
  @Input() item;
  @Input() paramsBusqueda: any = { idAlmacen: null, fhinicio: null, fhfin: null, fiTipo: null, idMedicamento: null, idPersonal: null, medicproducdisp: null };


  constructor(
    private _reporteFarmaciaService: ReporteFarmaciaService,
    private toastr: ToastsManager,
    public dialogRef: MatDialogRef<VisualizarMedicoProductoCaroComponent>


  ) {

    this.pagination = { nuPagina: 1, nuRegisMostrar: 0 };

  }

  ngOnInit() {
    console.log(this.item);
    console.log(this.paramsBusqueda);
    this.buscarMedicoxProductoCaroNoGeneral();
  }
  close() {
    this.dialogRef.close(1);
  }

  dismiss() {
    this.dialogRef.close(0);
  }

  private pageEvent($event: any) {
    this.pagination.nuPagina = $event.pageIndex + 1;
    this.pageSize = $event.pageSize;
    this.buscarMedicoxProductoCaroNoGeneral();
  }

  private buscarMedicoxProductoCaroNoGeneral(_ngForm?: any) {
    // if (isInvalid(_ngForm)) {
    //   return;
    // }
    // Object.keys(this.paramsBusqueda).forEach(key => {
    //   this.paramsBusqueda[key] = (this.paramsBusqueda[key] === '') ? null : this.paramsBusqueda[key];
    // });
    // this.paramsBusqueda = {
    //   ...this.paramsBusqueda,
    //   ...this.pagination,
    //   nuRegisMostrar: this.pageSize
    // };
    // console.log(this.paramsBusqueda)

    let promise = new Promise((resolve, reject) => {
      // this.paramsBusqueda.idAlmacen = this.idAlmacen;
      // this.paramsBusqueda.idMedicamento=this.medicproducdisp;


      // this.idAlmacen=this.paramsBusqueda.idAlmacen;
      // this.medicproducdisp=this.recetaDetalle.medicproducdisp;
      this.paramsBusqueda.idMedicamento = this.item.medicproducdisp;
      this.paramsBusqueda.idPersonal = this.item.idPersonal ? this.item.idPersonal.replace(/ /g, "") : null;
      this.paramsBusqueda.fhfin = null;
      this.paramsBusqueda.fhinicio = this.item.fhReceta;
      this.paramsBusqueda.nuPagina = 1
      //   this.receCab.fhReceta= this.item.recetaCabeceraList[0].fhReceta;
      console.log(this.paramsBusqueda);
      

      this._reporteFarmaciaService.getMedicoxProductoCaroNoGeneral(this.paramsBusqueda)
        .toPromise().then(data => {
          console.log(data);

          if (data.estado == 1) {
            this.receCab = data.recetaDetalleList;
            // this.recetaDetalle = data.recetaCabecera;
            console.log(this.receCab)

            if (this.receCab.length > 0) {
              this.pagination.nuRegisMostrar = this.receCab[0].nuTotalReg;
            }else{
              this.toastr.warning('No se encontraron datos', 'No encontrado')
            }
             this.dataSource = new MatTableDataSource(this.receCab);
            // this.dataSource.paginator = this.paginator;
          }
          else if (data.estado == 0){
            this.toastr.warning(data.mensaje, "No se encontraron las recetas en dichas fechas");
            // this.productoDescripcion = "";
            // this.personalDescripcion = "";
            this.receCab = [];
          }
          else{
            this.toastr.error(data.mensaje, "Error")
          }
          console.log(this.receCab)
          //resolve(data.imprimeFile);
        },
        err => { console.log(err) });
    });
    return;
  }
}




