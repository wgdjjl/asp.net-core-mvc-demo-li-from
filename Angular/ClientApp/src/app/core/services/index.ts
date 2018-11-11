import { JsonApiService } from './json-api.service';

import { BankInfoService } from './bankinfo.service';

export const services = [
    JsonApiService,

    BankInfoService
];

export * from './json-api.service';
export * from './bankinfo.service';
