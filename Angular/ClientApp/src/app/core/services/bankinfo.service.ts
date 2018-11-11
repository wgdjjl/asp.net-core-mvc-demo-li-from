import { Injectable } from '@angular/core';

import { JsonApiService } from './json-api.service';
import { Observable } from 'rxjs';

import { Bank } from '../models/bank.model';

const routes = {
  banks: '/Bank/List'
};

@Injectable()
export class BankInfoService {

  constructor(private jsonApiService: JsonApiService) { }

  getAll(): Observable<Bank[]> {
    return this.jsonApiService
      .fetch(routes.banks);
  }

}
