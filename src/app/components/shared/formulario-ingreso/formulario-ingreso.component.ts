import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss'],
  standalone: true,
  imports: [IonContent],
})
export class FormularioIngresoComponent implements OnInit {
  loginForm: FormGroup;
  mensaje: string =
    'Bienvenido, para iniciar sesión tenés que ingresar tus datos correctamente';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      correoActual: ['', [Validators.required, Validators.email]],
      claveActual: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    console.log('Form Ingreso');
  }

  async ingresar() {
    const { correoActual, claveActual } = this.loginForm.value;

    if (this.loginForm.invalid) {
      this.mensaje = 'Tenés que completar todos los campos correctamente';
      this.mostrarError(this.mensaje);
      return;
    }

    try {
      await this.authService.iniciarSesion(correoActual, claveActual);
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/inicio']);
      this.mostrarExito('Inicio de sesión exitoso');
    } catch (error) {
      console.log('Error durante el inicio de sesión:', error);
      this.mensaje = 'No existe un usuario con ese correo y esa contraseña';
      this.mostrarError(this.mensaje);
    }
  }

  mostrarExito(mensaje: string) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: mensaje,
      timer: 3500,
    });
  }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      timer: 3500,
    });
  }

  autocompletar(usuario: string) {
    if (usuario === '1') {
      this.loginForm.patchValue({
        correoActual: 'admin@admin.com',
        claveActual: '111111',
      });
    } else if (usuario === '2') {
      this.loginForm.patchValue({
        correoActual: 'invitado@invitado.com',
        claveActual: '222222',
      });
    } else {
      this.loginForm.patchValue({
        correoActual: 'usuario@usuario.com',
        claveActual: '333333',
      });
    }
  }
}
