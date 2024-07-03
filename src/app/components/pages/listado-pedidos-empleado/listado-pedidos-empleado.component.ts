import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonContent, IonTitle } from "@ionic/angular/standalone";
import { Empleado } from 'src/app/classes/empleado';
import { Usuario } from 'src/app/classes/padres/usuario';
import { Pedido } from 'src/app/classes/pedido';
import { Estado } from 'src/app/classes/utils/enumerado';
import { ApiService } from 'src/app/services/api/api.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-listado-pedidos-empleado',
  templateUrl: './listado-pedidos-empleado.component.html',
  styleUrls: ['./listado-pedidos-empleado.component.scss'],
  standalone: true,
  imports: [IonTitle, IonContent, IonToolbar, IonHeader, CommonModule, DatePipe, RouterLink]
})
export class ListadoPedidosEmpleadoComponent  implements OnInit {

  lista: any[] = [];
  public listaPedidos: Pedido[] = [];
  

  constructor(private pedidoService : PedidoService, private usuarioService : UsuarioService, private pushService: ApiService) {
    
   }

  async ngOnInit() {
    const usuario = await this.usuarioService.getUsuarioBd();
    console.log(usuario);
    if(usuario instanceof Empleado){
      console.log(usuario.tipo);
      if(usuario.tipo === Empleado.T_COCINERO){
        this.pedidoService.traerTodosObservable().subscribe((l) => {
          const fa = l.filter((p) => p.confirmadoMozo === true && p.estado === Estado.pedidoElaborando && (p.tipo === "cocina" || p.tipo === "postre"));
          fa.sort((a,b) => a.fecha.getTime() - b.fecha.getTime())
          this.listaPedidos = fa;
          console.log(this.listaPedidos);
        });
      } else{
        if(usuario.tipo == Empleado.T_BARTENDER){
          this.pedidoService.traerTodosObservable().subscribe((l) => {
            const fa = l.filter((p) => p.confirmadoMozo === true && p.estado === Estado.pedidoElaborando && p.tipo === "bebida");
            fa.sort((a,b) => a.fecha.getTime() - b.fecha.getTime())
            this.listaPedidos = fa;
          });
        }
      }
    }

  }

  async realizar(pedido : Pedido){
    pedido.estado = Estado.pedidoTerminado;
    await this.pushService.notificarEmpleados(Empleado.T_MOZO, `Notificando a todos los mozos`)
    await this.pedidoService.modificar(pedido);
  }

  public getNombreDia(fecha: Date) {
    switch (fecha.getDay()) {
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
      case 0:
        return 'Domingo';
      default:
        return 'x';
    }
  }
  public formatoDia(fecha: Date): string {
    // const dia = fecha.getDate().toString().padStart(2, '0');
    // const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    // const anio = fecha.getFullYear();
    const hora = fecha.getHours().toString().padStart(2, '0');
    const minuto = fecha.getMinutes().toString().padStart(2, '0');
    return `${this.getNombreDia(
      fecha
    )} ${hora}:${minuto}`;
  }

}
