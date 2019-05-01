export interface Persona {
    persona: {
        planList: [{
            iafas: {}, cobertura: {
                descripcionCobertura: null
            }
        }],
        estadoCivil: {
            id: null
        },
        tipoDocumentoIdentidad: {},
        tipoSangre: {
            id: Number
        },
        ocupacion: {
            valor: null,
            id: null
        },
        sexo: { id: null },
        historiaList: [{}],
        gradoInstruccion: {
            id: null
        },
        filiadoList: [{
            ubigeo: {},
            parentescoAcompanante: {},
            domicilioActual: null,
            telefonoMovil: null
        }],
        feNacimiento: "",
        idGrupoEtareo: "",
        nombreAcompanante: null,
        edadAcompanante: null,
        idTipoDocumentoAcompanante: null,
        diAcompanante: null,
        edad: null,
        edadLetra: null
    }
}

