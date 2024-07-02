import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Pedido {
  id: number;
  idProducto: number;
  tipo: string;
  cantidad: number;
}
interface Producto {
  id: number;
  nombre: string;
  tipo: string;
  stock: number;
}

@Component({
  selector: 'app-test-pedido',
  templateUrl: './test-pedido.component.html',
  styleUrls: ['./test-pedido.component.scss'],
  standalone: true,
  imports: [FormsModule, NgFor],
})
export class TestPedidoComponent implements OnInit {
  /* Almacen de PRODUCTO */
  productos: Producto[] = [
    { id: 1, nombre: 'villavicencio', tipo: 'bebida', stock: 4 } as Producto,
    { id: 2, nombre: 'villavicencio', tipo: 'comida', stock: 30 } as Producto,
    { id: 3, nombre: 'villavicencio', tipo: 'comida', stock: 8 } as Producto,
    { id: 4, nombre: 'villavicencio', tipo: 'bebida', stock: 40 } as Producto,
    { id: 5, nombre: 'villavicencio', tipo: 'postre', stock: 10 } as Producto,
    { id: 6, nombre: 'villavicencio', tipo: 'bebida', stock: 5 } as Producto,
    { id: 7, nombre: 'villavicencio', tipo: 'postre', stock: 20 } as Producto,
  ];

  /* Menu de MESA */
  pedidos: Pedido[] = [];

  contador: number[] = [];

  constructor() {}

  ngOnInit() {
    console.log('productos', this.productos);
  }

  sumarProducto(producto: Producto) {
    if (isNaN(this.contador[producto.id])) {
      this.contador[producto.id] = 0;
    }

    if (this.contador[producto.id] === producto.stock) {
      return;
    }

    this.contador[producto.id]++;

    const index = this.pedidos.findIndex((i) => i.idProducto === producto.id);

    if (index === -1) {
      this.pedidos.push({
        idProducto: producto.id,
        tipo: producto.tipo,
        cantidad: this.contador[producto.id],
      } as Pedido);
    } else {
      this.pedidos[index] = {
        idProducto: producto.id,
        tipo: producto.tipo,
        cantidad: this.contador[producto.id],
      } as Pedido;
    }

    console.log(this.pedidos);
  }
  restarProducto(producto: Producto) {
    if (isNaN(this.contador[producto.id])) {
      this.contador[producto.id] = 0;
    }

    if (this.contador[producto.id] === 0) {
      return;
    }

    this.contador[producto.id]--;

    const index = this.pedidos.findIndex((i) => i.idProducto === producto.id);

    if (index !== -1) {
      this.pedidos[index] = {
        idProducto: producto.id,
        tipo: producto.tipo,
        cantidad: this.contador[producto.id],
      } as Pedido;
    }

    console.log(this.pedidos);
  }
}
