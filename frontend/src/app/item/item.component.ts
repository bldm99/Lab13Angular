import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteConfirmation1Component } from '../delete-confirmation1/delete-confirmation1.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';




@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  items: any[] = [];
  currentItem: any = {};
  form: FormGroup = new FormGroup({});

  constructor(private itemService: ItemService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private fb: FormBuilder) { }

  showSuccess(itemName: string, fondo: string, toatDesc: string) {
    //Segun lo que valor recibido en fondo el tipo de toast cambiara de estylo
    var temp = `toast-success-${fondo}`;

    console.log(temp)
    this.toastr.success(`El elemento ${itemName} ${toatDesc}`, 'Registro exitoso', {
      toastClass: temp,  // Clase para el contenedor de la notificación
      titleClass: 'toast-title-success', // Clase para el título de la notificación
      messageClass: 'toast-message-success', // Clase para el mensaje de la notificación
      positionClass: 'toast-top-center',
      timeOut: 2000
    });
  }

  ngOnInit(): void {
    this.getItems();
    this.initializeForm()
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      imagen: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  getItems(): void {
    this.itemService.getItems()
      .subscribe((items) => {
        this.items = items;

      });
  }

  getItemById(id: string): void {
    this.itemService.getItemById(id)
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  createItem(item: any): void {
    this.itemService.createItem(item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};

        const itemName = item.name;

        this.showSuccess(itemName, 'agregar', 'Ha sido registrado correctamente')
      });
  }

  updateItem(id: string, item: any): void {
    this.itemService.updateItem(id, item)
      .subscribe(() => {
        this.getItems();
        this.currentItem = {};
      });
  }

  deleteItem(id: string): void {
    const objEliminar = this.items.find(item => item._id === id);
    const itemName = objEliminar.name ? objEliminar.name : 'Usuario';

    console.log(itemName)

    this.itemService.deleteItem(id)
      .subscribe(() => {
        this.getItems();
        this.showSuccess(itemName, 'eliminar', 'Ha sido eliminado')
      });
  }

  editItem(id: string): void {
    this.getItemById(id);
  }


  openDeleteConfirmation(id: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmation1Component);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteItem(id);
      }
    });
  }


}
