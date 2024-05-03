import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  valorItem! : string;
  @Input() itemParaEdicao!: Item;
  editando: boolean = false;
  textoBtn: string = 'Salvar item'

  constructor(private listaService: ListaDeCompraService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    const valorAnteriorEhDiferenteDoValorNovo: boolean = !changes['itemParaEdicao'].firstChange;

    if(valorAnteriorEhDiferenteDoValorNovo){
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.itemParaEdicao?.nome;
    }
  }

  adicionarItem() {
    this.listaService.adicionarItemNaLista(this.valorItem);
    this.limparCampo();
  }

  editarItem() {
    this.listaService.editarItem(this.itemParaEdicao, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = 'Salvar Item';
  }

  limparCampo(){
    this.valorItem = '';
  }
}
