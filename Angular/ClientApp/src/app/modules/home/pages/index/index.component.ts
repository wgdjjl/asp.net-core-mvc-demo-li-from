import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { BankInfoService, Bank } from '@app/core';
import { Observable } from 'rxjs';

import { BankListComponent } from '../../modals/bank-list/bank-list.component';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  banks$: Observable<Bank[]>;

  constructor(
    private modalService: NgbModal,
    private bankInfoService: BankInfoService
  ) { }

  ngOnInit(): void {
    this.loadBanks();
  }

  loadBanks() {
    this.banks$ = this.bankInfoService.getAll();
  }

  openMyModal() {
    const modalRef = this.modalService.open(BankListComponent);
    modalRef.componentInstance.id = 1;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

}

