import {Component, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Imovel} from '../../../../models/imovel';
import {HomeAdminService} from '../../home-admin.service';

@Component({
  selector: 'app-modal-dados-imovel',
  templateUrl: './modal-dados-imovel.component.html',
  styleUrls: ['./modal-dados-imovel.component.css']
})
export class ModalDadosImovelComponent implements OnInit, OnDestroy {

  @ViewChild('modal_dados') modal;
  open = new Subject();
  updateView = new Subject();
  private openSubscription: Subscription;
  private updateSubscription: Subscription;
  private formComercial: FormGroup;
  private idImovel: string;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private homeService: HomeAdminService) {
  }

  ngOnInit() {

    this.openSubscription = this.open.subscribe((imovel: Imovel) => {

      this.idImovel = imovel._id;
      this.modalService.open(this.modal, {size: 'lg'});
      this.formComercial = this.formBuilder.group({
        anuncio: [imovel.anuncio || null, Validators.required],
        valor: [imovel.valor || null, Validators.required],
        cidade: [imovel.cidade || null, Validators.required],
        bairro: [imovel.bairro || null, Validators.required],
        endereco: [imovel.endereco || null, Validators.required],
        descricao: [imovel.descricao || ''],
        area_util: [imovel.area_util || null, Validators.required],
        tipo: [this.verificarTipoImovel(imovel) || null, Validators.required]
      });
    });
  }

  ngOnDestroy() {

    if (this.openSubscription) this.openSubscription.unsubscribe();
    if (this.updateSubscription) this.updateSubscription.unsubscribe();
  }

  salvar() {

    this.updateSubscription = this.homeService
      .updateComercial(
        this.formComercial.value,
        this.idImovel)
      .subscribe(res => {

        this.updateView.next('Imóvel atualizado com sucesso');
      }, err => {

        console.log(err);
      });
  }

  getErrorMessage(): string {
    return 'Campo obrigatório';
  }

  verificarTipoImovel(imovel): string {
    if (imovel.varejo) {
      return 'varejo';
    } else if (imovel.sala_comercial) {
      return 'sala_comercial';
    } else if (imovel.andar_corrido) {
      return 'andar_corrido';
    } else if (imovel.galpao) {
      return 'galpao';
    } else {
      return 'terreno';
    }
  }
}