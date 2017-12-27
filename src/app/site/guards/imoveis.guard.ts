import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {Imovel} from '../../models/imovel';
import {ImovelService} from '../../services/imovel.service';

@Injectable()
export class ImoveisGuard implements Resolve<Imovel> {

  constructor(private imovelService: ImovelService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | any {

    return this.imovelService.getAll(route.params['page']);
  }
}