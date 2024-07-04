import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonContent, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { Cliente } from 'src/app/classes/cliente';
import { Duenio } from 'src/app/classes/duenio';
import { Empleado } from 'src/app/classes/empleado';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Pedido } from 'src/app/classes/pedido';
import { Supervisor } from 'src/app/classes/supervisor';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-cuenta',
  templateUrl: './detalle-cuenta.component.html',
  styleUrls: ['./detalle-cuenta.component.scss'],
  standalone: true,
  imports: [IonToolbar, IonTitle, IonContent, IonHeader, CommonModule]
})
export class DetalleCuentaComponent  implements OnInit {

  pedidosCliente : Pedido[] = [];
  importeTotal: number = 0;

  constructor(private pedidoService : PedidoService, private usuarioService: UsuarioService) { }

  async ngOnInit() {
    const usuario = await this.usuarioService.getUsuarioBd();
    this.pedidoService.traerTodosObservable().subscribe((l) => {
      const fa = l.filter((p) => p.idCliente === usuario.id);
      this.pedidosCliente = fa; 
    });    
       
  }

  obtenerPrecioTotal(){
    this.pedidosCliente.forEach(p => {
      this.importeTotal += p.precio;
    });
    //falta sumarle la propina
  }

  // Como falta la propina todavia no puedo transformar la propina con el porcentaje del precio total
  // transformarPropina(){

  // }

}
