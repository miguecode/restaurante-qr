import { Component, OnInit } from '@angular/core';
import { FormularioRegistroClienteComponent } from '../../shared/formulario-registro-cliente/formulario-registro-cliente.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormularioRegistroClienteComponent],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent  implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log();
  }

}
