import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from './modal.directive';
import {ImovelService} from '../../services/imovel.service';
import {Imovel} from '../../models/imovel';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @ViewChild(ModalDirective) directive: ModalDirective;

  private subscription: Subscription;
  private imovel = {
    fotoPrincipal: {url: ''},
    fotos: []
  };

  constructor(private imovelService: ImovelService) {
  }''

  ngOnInit() {

    this.subscription = this.imovelService.imovelModal.subscribe((imovel: Imovel) => {

      this.imovel = imovel;
    });
  }

  ngOnDestroy(){

    this.subscription.unsubscribe();
  }

  close() {

    this.directive.close();
  }
}