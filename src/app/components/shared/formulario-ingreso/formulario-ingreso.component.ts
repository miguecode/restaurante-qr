import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonFabButton,
  IonFabList,
  IonIcon,
  IonFab,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/firebase/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { Usuario } from 'src/app/classes/padres/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss'],
  standalone: true,
  imports: [
    IonFab,
    IonIcon,
    IonFabList,
    IonFabButton,
    IonContent,
    NgClass,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
})
export class FormularioIngresoComponent implements OnInit {
  loginForm: FormGroup;
  mensaje: string =
    'Bienvenido, para iniciar sesión tenés que ingresar tus datos correctamente.';
  procesando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private usuarioService: UsuarioService
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
      this.mensaje = 'Tenés que completar todos los campos correctamente.';
      return;
    }

    this.procesando = true;

    try {
      //await this.authService.iniciarSesion(correoActual, claveActual);
      await this.usuarioService.iniciarSesion({
        correo: correoActual,
        clave: claveActual,
      } as Usuario);
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.log('Error durante el inicio de sesión:', error);
      if (error.message === 'pendiente') {
        this.mensaje = 'Su cuenta esta pendiente a habilitarse';
      } else {
        if (error.message === 'rechazada') {
          this.mensaje = 'Su cuenta esta rechazada';
        } else {
          this.mensaje =
            'No existe un usuario con ese correo y esa contraseña.';
        }
      }
    } finally {
      this.procesando = false;
    }
  }

  autocompletar(usuario: string) {
    if (usuario === '0') {
      this.loginForm.patchValue({
        correoActual: 'anonimo@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '1') {
      this.loginForm.patchValue({
        correoActual: 'mmariaf@yopmail.com',
        claveActual: '222222',
      });
    } else if (usuario === '2') {
      this.loginForm.patchValue({
        correoActual: 'pablinhern@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '3') {
      this.loginForm.patchValue({
        correoActual: 'miguel2@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '4') {
      this.loginForm.patchValue({
        correoActual: 'laumrtnz@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '5') {
      this.loginForm.patchValue({
        correoActual: 'matir@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '6') {
      this.loginForm.patchValue({
        correoActual: 'liocromo@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '7') {
      this.loginForm.patchValue({
        correoActual: 'micasiso@yopmail.com',
        claveActual: '111111',
      });
    }
  }
}
