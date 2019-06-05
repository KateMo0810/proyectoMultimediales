import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'; //Operador MAP
import { Observable } from 'rxjs';
import { PedidoModelI } from '../models/models.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  servCollection: AngularFirestoreCollection<PedidoModelI>; 
  
  constructor(private db: AngularFirestore) { 
    this.servCollection = db.collection<PedidoModelI>('Pedido', ref => ref.where('estado',"==","pendiente"));
  }

  getAll() {
    return this.servCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map((a) => {
        const data = a.payload.doc.data() as PedidoModelI;
        data.id_ = a.payload.doc.id;
        return data;
      })})
    );;
  }

  add(dat: PedidoModelI) {
      this.servCollection.add(dat);
  }

  update(dat: PedidoModelI) {
    this.db.doc(`Pedido/${dat.id_}`).update(dat)
  };

}
