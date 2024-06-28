import { Swalert } from './swalert.class';

export class TraductorQr {
  static DniEjemplarA(dataQr: string) {
    const [
      nroTramite,
      apellido,
      nombre,
      sexo,
      nroDni,
      ejemplar,
      fechaNacimiento,
      fechaEmision,
      nroCuil,
    ] = JSON.parse(dataQr)[0].displayValue.split('@');
    return { dni: nroDni, cuil: nroCuil[0] + nroCuil[1] + nroDni + nroCuil[2] };
  }

  static entidadRestaurante(dataQr: string) {
    const [entidad, nroId] = JSON.parse(dataQr)[0].displayValue.split('@');
    return { entidad: entidad, id: nroId };
  }
}
