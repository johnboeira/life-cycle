import { Component, DoCheck, OnInit } from '@angular/core';
import { Item } from './interfaces/iItem';
import { ListaDeCompraService } from './service/lista-de-compra.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck {


  title = 'app-lista-de-compras';
  itemParaSerEditado!: Item;
  listaDeCompra! : Array<Item>
  constructor(private listaService: ListaDeCompraService) { }

  ngOnInit(): void {
   this.listaDeCompra = this.listaService.getListaDeCompra();
   console.log(this.listaDeCompra);
  }

  ngDoCheck(): void {
    this.listaService.atualizarLocalStorage();
  }

  editarItem(item: Item) {
    this.itemParaSerEditado = item;
  }

  deletarItem(id: number) {
    const indexItem = this.listaDeCompra.findIndex((item: Item) => item.id === id);

    this.listaDeCompra.splice(indexItem, 1);
  }

  limpar() {
    this.listaDeCompra = [];
  }

}
