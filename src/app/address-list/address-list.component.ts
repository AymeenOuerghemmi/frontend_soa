import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from 'src/app/addresses/address.service';
import Swal from 'sweetalert2'; // Importer SweetAlert2

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {
  addresses: any[] = [];

  constructor(private addressService: AddressService, private router: Router) {}

  ngOnInit(): void {
    this.loadAddresses();
  }

  addNewAddress(): void {
    this.router.navigate(['/addresses/add']); // Redirige vers la route de création
  }

  loadAddresses(): void {
    this.addressService.getAllAddresses().subscribe(
      (data) => {
        this.addresses = data;
      },
      (error) => {
        console.error('Error loading addresses', error);
      }
    );
  }

  deleteAddress(id: number): void {
    // Afficher la confirmation SweetAlert avant de supprimer
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.addressService.deleteAddress(id).subscribe(
          () => {
            console.log('Address deleted successfully');
            Swal.fire(
              'Deleted!',
              'The address has been deleted.',
              'success'
            );
            this.loadAddresses(); // Rafraîchir la liste après suppression
          },
          (error) => {
            console.error('Error deleting address', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the address.',
              'error'
            );
          }
        );
      }
    });
  }

  editAddress(id: number): void {
    this.router.navigate(['/addresses/edit', id]); // Rediriger vers le formulaire d'édition
  }
}
