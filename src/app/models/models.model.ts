
export class EmpaqueModel implements EmpaqueModelI{
 id_?:number;
 tipo:string;
 tamano:string;
 color:string;
 decoracion_?:string;
 tarjeta:string;
 tarjetaClase:string;
 tarjetaSrc:string;
 mensaje:string;
 clase:string;
 src:string;
 galletas:GalletaModel[];
 precio:number;
}

export class PedidoModel implements PedidoModelI{
 id_?:string;
 nombre:string;
 direccion: string;
 fecha: string;
 numero:string;
 instrucciones:string;
 pedidos:EmpaqueModel[];
 precioTotal:number;
 estado:string;
}

export class GalletaModel implements GalletaModelI{
 tipo:string;
 cantidad:number;
}
export interface EmpaqueModelI{
    id_?:number;
    tipo:string;
    tamano:string;
    color:string;
    decoracion_?:string;
    tarjeta:string;
    tarjetaClase:string;
    tarjetaSrc:string;
    mensaje:string;
    clase:string;
    src:string;
    galletas:GalletaModel[];
    precio:number;
   }
   
   export interface PedidoModelI{
    id_?:string;
    nombre:string;
    direccion: string;
    fecha: string;
    numero:string;
    instrucciones:string;
    pedidos:EmpaqueModel[];
    precioTotal:number;
    estado:string;
   }
   
   export interface GalletaModelI{
    tipo:string;
    cantidad:number;
   }