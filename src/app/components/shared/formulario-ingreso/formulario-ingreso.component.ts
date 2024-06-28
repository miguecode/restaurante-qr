import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/firebase/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss'],
  standalone: true,
  imports: [IonContent, NgClass, ReactiveFormsModule, CommonModule, RouterLink],
})
export class FormularioIngresoComponent implements OnInit {
  loginForm: FormGroup;
  mensaje: string =
    'Bienvenido, para iniciar sesión tenés que ingresar tus datos correctamente.';
  procesando: boolean = false;

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
      this.mensaje = 'Tenés que completar todos los campos correctamente.';
      return;
    }

    this.procesando = true;

    try {
      await this.authService.iniciarSesion(correoActual, claveActual);
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('Error durante el inicio de sesión:', error);
      this.mensaje = 'No existe un usuario con ese correo y esa contraseña.';
    } finally {
      this.procesando = false;
    }
  }

  autocompletar(usuario: string) {
    if (usuario === '1') {
      this.loginForm.patchValue({
        correoActual: 'mmariaf@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '2') {
      this.loginForm.patchValue({
        correoActual: 'pablinhern@yopmail.com',
        claveActual: '111111',
      });
    } else if (usuario === '3') {
      this.loginForm.patchValue({
        correoActual: 'matir@yopmail.com',
        claveActual: '111111',
      });
    } else {
      this.loginForm.patchValue({
        correoActual: 'crisprz@yopmail.com',
        claveActual: '111111',
      });
    }
  }
}
