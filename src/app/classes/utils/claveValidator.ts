import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";

export function confirmarClaveValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        
      const clave = formGroup.get('clave');
      const repiteClave = formGroup.get('repetirClave');
      const respuestaError = { noCoincide: 'La clave no coincide' };

      if (clave?.value !== repiteClave?.value) {
        formGroup.get('repetirClave')?.setErrors(respuestaError);
        // Si los campos de contraseña no coinciden, devolvemos un error de validación
        return respuestaError;

      } else {
        formGroup.get('repetirClave')?.setErrors(null);
        // Si los campos de contraseña coinciden, la validación es correcta
        return null;
      }
    };
  }