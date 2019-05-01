import { CitaProcedimientoComponent } from './../../../module/admision/admision-content/cita-procedimiento/cita-procedimiento.component';
import { Input, Output, EventEmitter, ViewChild, ElementRef, Directive, Renderer } from '@angular/core';

@Directive({
  selector: '[appAirdatepicker]'
})
export class AirdatepickerDirective {

  private numberMonth: number;

  public diasfebrero: number = 0;


  @Input() envioPruebaFinal: any[] = [];

  @Input() onlyDatePicker: boolean = true;
  @Input() multipleDates: number = this.envioPruebaFinal.length;
  @Output() fechaSeleccionada = new EventEmitter();
  public da: Date = new Date();




  constructor(
    public el: ElementRef,
    public renderer: Renderer
  ) {

  }
  ngOnInit() {
    //function foo(msg: string) : number { return 0; }


    var diasfin = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];



    this.numberMonth = this.da.getMonth();

    // console.log(this.envioPruebaFinal);
    // console.log(this.llenadoNew)
    var numberDays = this.envioPruebaFinal,
      numberMonthNow = this.numberMonth,
      tope = numberDays.length,
      contador = 0, flagContador = 0;

    var obtenerContador = function (arregloDiasFin, mes, dia, arregloEnvio) {
      var mesDiaFinAux = arregloDiasFin[mes],
        mesEvaluar = 0,
        contadorResult = 0;

      if (mesDiaFinAux === dia) {
        mesEvaluar = mes + 1;
        for (var index = 0; index < arregloEnvio.length; index++) {
          if (arregloEnvio[index].mes === mesEvaluar) {
            contadorResult = index;
            break;
          }
        }
      }
      else {
        contadorResult = 0;
      }
      return contadorResult;
    }

    var esBisiesto = function (anio) {
      var valida;
      if ((anio % 4 == 0) && ((anio % 100 != 0) || (anio % 400 == 0))) {
        valida = true;
      } else {
        valida = false;
      }
      return valida;
    };
    diasfin[1] = esBisiesto(2018) ? 29 : 28;
    //console.log(numberDays);

    var fechaFiltro=function(fecha){
    CitaProcedimientoComponent.selecFecha(fecha);
    };
    var mesFiltro=function(fecha){
      CitaProcedimientoComponent.mes(fecha);
      };

    $(this.el.nativeElement).datepicker({
      inline: true,
      showOtherMonths: false,
      language: 'es',
      autoClose: false,
      view: "days",
      format12h: true,
      multipleDates: this.multipleDates,
      minDate: new Date(),
      onRenderCell: function (date, cellType) {
        //var date = new Date();

        var currentMoth = date.getMonth();
        var currentDate = date.getDate();
        var curentYear = date.getFullYear();
        // var stateMonth = numberMonthNow;


        for(let a of numberDays){
          if(a.dia == currentDate && a.mes == currentMoth && a.ano == curentYear){
          
            return {
                    html: currentDate + '<span class="dp-note"></span>',
                    classes: "datepicker--cell datepicker--cell-day -" + a.color
                    //disabled: false
                   };
          }
        }

        return {
                disabled: true
                };
        //console.log(diasfin);

        // console.log("Al empezar el contador: " + contador);


        

        // if (contador === tope) {
        //   contador = 0;
          // return {

          //   disabled: true
          // }
        // } else {
        //   if (cellType == 'day') {
        //     if (numberDays[contador].ano === date.getFullYear()) {

        //       if (numberDays[contador].mes === date.getMonth()) {
        //         // console.log("Dia de arreglo: " + numberDays[contador].dia + "--dia a evaluar: " + currentDate);

        //         if (numberDays[contador].dia === currentDate) {
        //           // console.log("Encontraste el dia");
        //           var colorasig = numberDays[contador].color;
        //           contador++;

                  // return {
                  //   html: currentDate + '<span class="dp-note"></span>',
                  //   classes: "datepicker--cell datepicker--cell-day -" + colorasig
                  //   //disabled: false
                  // }

        //         }
        //         else {
        //           // console.log("No es tu dia");
        //           flagContador = obtenerContador(diasfin, currentMoth, currentDate, numberDays);
        //           // console.log("Evalua flag: " + flagContador);
        //           contador = flagContador != 0 ? flagContador : contador;

        //           return {

        //             disabled: true
        //           }


        //         }

        //       }
        //       else {
        //         // console.log("no es tu mes");

        //         if (contador === 0) {
        //           contador = 0;

        //         } else {
        //           contador++;
        //         }
        //         return {

        //           disabled: true
        //         }
        //       }

        //     }
        //     else {
        //       contador++;

        //     }
        //   }
        // }

      }
      ,
      onChangeMonth: function (month, year) {
        this.devMonth= "02"+ "/" + ((month)+1) + "/" + year;
        return mesFiltro(this.devMonth);
      },
     
      onSelect: function(selectedDate) {
        // alert(selectedDate);
         return fechaFiltro(selectedDate);
      }

    });

  }
}