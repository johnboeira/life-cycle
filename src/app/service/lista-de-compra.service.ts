import { Item } from 'src/app/interfaces/iItem';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListaDeCompraService {

  private listaDeCompra: Item[] = [];

  constructor() {
    this.listaDeCompra = JSON.parse(localStorage.getItem('itens')||'[]');
  }

  getListaDeCompra(){
    return this.listaDeCompra;
  }

  private criarItem(nomeDoItem: string){
    const id: number = this.listaDeCompra.length + 1;
    const item: Item = {
      id: id,
      nome: nomeDoItem,
      data: new Date().toLocaleString('pt-BR'),
      comprado: false
    }
    return item;
  }

  adicionarItemNaLista(nomeDoItem: string){
    const item: Item = this.criarItem(nomeDoItem);
    this.listaDeCompra.push(item);
    this.atualizarLocalStorage();
  }

  editarItem(itemAntigo: Item, nomeEditado: string){
    const itemEditado: Item = {
      id: itemAntigo.id,
      nome: nomeEditado,
      data: itemAntigo.data,
      comprado: itemAntigo.comprado
    }

    const id = itemAntigo.id;

    this.listaDeCompra.splice(Number(id)-1, 1, itemEditado);
    this.atualizarLocalStorage();
  }

  atualizarLocalStorage(){
    localStorage.setItem('itens', JSON.stringify(this.listaDeCompra));
  }
}
