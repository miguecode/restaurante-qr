import Swal from 'sweetalert2';

// #region -- NPM Vulnerabilidad Baja --
/*
  Al realizar el [npm install sweetalert2], genera 1 vulnerabilidad baja, solo lo comento por las dudas.
  Con [npm audit] se puede corroborar.
*/
// #endregion -- NPM Vulnerabilidad Baja --

// #region -- Warning CommonJs o AMD --
/*
  Si sale un warning en la consola del navegador sobre...
    ['sweetalert2'. CommonJS or AMD dependencies can cause optimization bailouts.]

  Ir al angular.json, hacer CTRL+F:"@angular-devkit/build-angular:browser" y en "options" agregar...
    "allowedCommonJsDependencies": ["sweetalert2"],

  fuente https://angular.dev/tools/cli/build#configuring-commonjs-dependencies
*/
// #endregion -- Warning CommonJs o AMD --

// https://sweetalert2.github.io/recipe-gallery/colored-toasts.html

// #region customClass
/*
  customClass: {
    container: '...',
    popup: '...',
    header: '...',
    title: '...',
    closeButton: '...',
    icon: '...',
    image: '...',
    htmlContainer: '...',
    input: '...',
    inputLabel: '...',
    validationMessage: '...',
    actions: '...',
    confirmButton: '...',
    denyButton: '...',
    cancelButton: '...',
    loader: '...',
    footer: '....',
    timerProgressBar: '....',
  }
*/
// #endregion customClass

export class Swalert {
  // #region Toast

  /** Comentarios-Toast (ambos o casi todos)
   * @heightAuto No es necesario asignarlo.
   * @color Color de los textos del toast.
   * @position Posicion del toast
   * @icon Icono del toast
   * @iconColor Color del icono del toast
   * @title Titulo del toast
   * @showConfirmButton Es necesario asignarle false
   * @timer Tiempo que dura el toast
   * @timerProgressBar Muestra barra de progreso del timer
   * @background Color de fondo del toast
   * @didOpen Permite agregar eventos cuando se abre/renderiza el toast
   */
  static async toastSuccess(mensaje: string) {
    return Swal.fire({
      //heightAuto: false,
      toast: true,
      color: 'white',
      position: 'bottom-right',
      icon: 'success',
      iconColor: 'white',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#00DC00', // Verde
      didOpen: (t) => {
        t.addEventListener('click', () => {
          Swal.close(); // Cierra el toast si se hace clic dentro del toast
        });
      },
    });
  }
  static async toastError(mensaje: string) {
    return Swal.fire({
      //heightAuto: false,
      toast: true,
      color: 'white',
      position: 'bottom-right',
      icon: 'error',
      iconColor: 'white',
      title: mensaje,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#E40000', // Rojo
      didOpen: (t) => {
        t.addEventListener('click', () => {
          Swal.close(); // Cierra el toast si se hace clic dentro del toast
        });
      },
    });
  }

  // #endregion Toast

  // #region Modal/Prompt

  /** Comentarios-Modal/Prompt
   * @heightAuto En false arregla problema de renderizado del modal. Asignar true, solo si en false genera problemas.
   * @title Titulo del modal
   * @confirmButtonText Texto del boton confirmar (izquierdo)
   * @cancelButtonText Texto del boton cancelar (derecho)
   * @showConfirmButton Mostrar/Ocultar boton confirmar (izquierdo)
   * @showCancelButton Mostrar/Ocultar boton cancelar (derecho)
   * @showLoaderOnConfirm Muestra spinner en el boton Confirmar al pulsarlo.
   * @allowOutsideClick Evita cerrar el modal cuando se clickea por fuera del modal.
   * @background Color de fondo de la VENTANA del modal.
   * @buttonsStyling Es necesario asignarle false a los estilos predeterminados de los botones, para poder aplicarles estilos propios desde el customClass.
   * @customClass Cada class asignada debe desarrollarse en el archivo global.scss, sino no se aplica el cambio.
   */
  static modalCargarFoto() {
    return Swal.fire({
      heightAuto: false,
      title: '¿Desea cargarla?',
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      showConfirmButton: true,
      showCancelButton: true,
      //showLoaderOnConfirm: true,
      allowOutsideClick: () => false,
      background: 'lightgreen',
      buttonsStyling: false,
      customClass: {
        title: 'toast-cargar-foto-title',
        confirmButton: 'toast-cargar-foto-confirm-button',
        cancelButton: 'toast-cargar-foto-cancel-button',
      },
    });
  }

  // #endregion Modal/Prompt
}
