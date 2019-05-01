import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoDocumento'
})
// const SSTM_TIPO_DOCUMENTO = [{ CO_DNICODE: 1, NO_DNINAME: "Documento Nacional de Identidad", DE_NOMCORTO: "DNI" },
// { CO_DNICODE: 2, NO_DNINAME: "Carné de extranjería", DE_NOMCORTO: "CE" },
// { CO_DNICODE: 3, NO_DNINAME: "Pasaporte", DE_NOMCORTO: "PAS" },
// { CO_DNICODE: 4, NO_DNINAME: "Documento de Identidad Extranjero", DE_NOMCORTO: "DIE" },
// { CO_DNICODE: 5, NO_DNINAME: "Código único de Identificación", DE_NOMCORTO: "CUI" },
// { CO_DNICODE: 6, NO_DNINAME: "Código Nacido Vivo", DE_NOMCORTO: "CNV" },
// { CO_DNICODE: 7, NO_DNINAME: "Sin Documento de Identidad", DE_NOMCORTO: "SDI" },
// { CO_DNICODE: 8, NO_DNINAME: "Registro Único de Contribuyente", DE_NOMCORTO: "RUC" },
// { CO_DNICODE: 9, NO_DNINAME: "Número Correlativo de Organización", DE_NOMCORTO: "NCO" }
// ]
export class TipoDocumentoPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return null;
  }

}
