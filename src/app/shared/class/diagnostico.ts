export class Diagnostico {
    constructor(protected _diagnositico: JSON){
    }

    set setDiagnostico(diagnostico: JSON){
        this._diagnositico = diagnostico;
    }

    get getDiagnostico(): JSON{
        return this._diagnositico;
    }
}
