
const IPRESS_KEY     = 'sigsIPRESS';
const CODUSUARIO_KEY = 'sigsCODUSUARIO';
const IDPERSONAL_KEY = 'sigsIDPERSONAL';
const SUB_ACT_KEY    = 'sigsSUBACT';
const ID_NIVEL       = 'sigsNIVEL'

export function removeIpress() {
    window.localStorage.removeItem(IPRESS_KEY);
}

export function saveIpress(ipress: string) {
    window.localStorage.removeItem(IPRESS_KEY);
    window.localStorage.setItem(IPRESS_KEY, ipress);
}

export function getIpress(): string {
    return localStorage.getItem(IPRESS_KEY);
}

export function removeCodUsuario() {
    window.localStorage.removeItem(CODUSUARIO_KEY);
}

export function saveCodUsuario(CodUsuario: string) {
    window.localStorage.removeItem(CODUSUARIO_KEY);
    window.localStorage.setItem(CODUSUARIO_KEY, CodUsuario);
}

export function getCodUsuario(): string {
    return localStorage.getItem(CODUSUARIO_KEY);
}

export function removeIdUsuario() {
    window.localStorage.removeItem(IDPERSONAL_KEY);
}

export function saveIdUsuario(IdPersonal: string) {
    window.localStorage.removeItem(IDPERSONAL_KEY);
    window.localStorage.setItem(IDPERSONAL_KEY, IdPersonal);
}

export function getIdUsuario(): string {
    return localStorage.getItem(IDPERSONAL_KEY);
}

export function removeSubAct() {
    window.localStorage.removeItem(SUB_ACT_KEY);
}

export function saveSubAct(sub_act: string) {
    window.localStorage.removeItem(SUB_ACT_KEY);
    window.localStorage.setItem(SUB_ACT_KEY, sub_act);
}

export function getSubAct(): string {
    return localStorage.getItem(SUB_ACT_KEY);
}

export function removeidNivelIPRESS() {
    window.localStorage.removeItem(ID_NIVEL);
}

export function saveidNivelIPRESS(idNivel: string) {
    window.localStorage.removeItem(ID_NIVEL);
    window.localStorage.setItem(ID_NIVEL, idNivel);
}

export function getidNivelIPRESS(): string {
    return localStorage.getItem(ID_NIVEL);
}
