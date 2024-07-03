import { Injectable } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';
import { Pedido } from '../classes/pedido';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private col = 'pedidos';
  private pedidos: Pedido[] = [];
  private flagObservable: boolean = false;

  constructor(private firestoreService: FirestoreService) {
    this.traerTodosObservable().subscribe((l) => {
      this.pedidos = l;
      this.flagObservable = true;
    });
  }

  private traerTodos() {
    return new Promise<Pedido[]>((resolver) => {
      if (this.flagObservable === true) {
        resolver(this.pedidos);
      }

      setTimeout(() => {
        resolver(this.pedidos);
      }, 5000);
    });
  }

  public async traerPorId(idPedido: number) {
    const pedidos = await this.traerTodos();
    for (let pedido of pedidos) {
      if (pedido.id === idPedido) {
        return pedido;
      }
    }
    return undefined;
  }

  private traerProximoId() {
    return this.firestoreService.traerProximoId(this.col, 'id');
  }

  private async setId(pedido: Pedido) {
    const id = await this.traerProximoId();
    if (id === undefined) {
      throw new Error('Hubo un problema al calcular el ID');
    }
    pedido.id = id;
  }

  private async insertarDoc(pedido: Pedido) {
    const doc = Pedido.toDoc(pedido);
    return this.firestoreService.insertarConId(this.col, doc.id, doc);
  }

  private async modificarDoc(pedido: Pedido) {
    const doc = Pedido.toDoc(pedido);
    await this.firestoreService.modificar(this.col, doc.id, doc);
  }

  private async eliminarDoc(pedido: Pedido) {
    const doc = Pedido.toDoc(pedido);
    await this.firestoreService.eliminar(this.col, doc.id);
  }

  public async alta(pedido: Pedido) {
    await this.setId(pedido);
    await this.insertarDoc(pedido);

    return pedido;
  }

  public async baja(pedido: Pedido) {
    await this.eliminarDoc(pedido);
  }

  public async modificar(pedido: Pedido) {
    await this.modificarDoc(pedido);
  }

  public traerTodosObservable(): Observable<Pedido[]> {
    return this.firestoreService
      .traerTodos(this.col)
      .pipe(map((listaDocs) => listaDocs.map((p) => Pedido.parseDoc(p))));
  }

  public traerPorIdObservable(pedido: Pedido): Observable<Pedido> {
    const doc = Pedido.toDoc(pedido);
    return this.firestoreService
      .traerPorId(doc.id, this.col)
      .pipe(map((doc) => Pedido.parseDoc(doc)));
  }
}
