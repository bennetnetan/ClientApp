import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { Client } from './client.model';

@Injectable()
export class ClientService {
  selectedClient!: Client;
  clients!: Client[];
  readonly baseURL = 'http://localhost:3000/clients';
  constructor(private http: HttpClient) { }

  postClient(clnt: Client) {
    return this.http.post(this.baseURL, clnt);
  }

  getClientList() {
    return this.http.get(this.baseURL);
  }

  putClient(clnt: Client) {
    return this.http.put(this.baseURL + `/${clnt._id}`, clnt);
  }

  deleteClient(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
