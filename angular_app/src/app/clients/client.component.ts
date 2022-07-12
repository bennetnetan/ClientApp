import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ClientService } from '../shared/client.service';
import { Client } from '../shared/client.model';
import { EMPTY } from 'rxjs';

declare var M: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  // styleUrls: ['./client.component.css'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {

  constructor(public clientService: ClientService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshClientList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.clientService.selectedClient = {
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      image: "",
      _id: ""
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.clientService.postClient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshClientList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.clientService.putClient(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshClientList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshClientList() {
    this.clientService.getClientList().subscribe((res) => {
      this.clientService.clients = res as Client[];
    });
  }

  onEdit(emp: Client) {
    this.clientService.selectedClient = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.clientService.deleteClient(_id).subscribe((res) => {
        this.refreshClientList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
