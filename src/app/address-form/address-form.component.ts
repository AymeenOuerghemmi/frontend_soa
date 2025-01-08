import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/addresses/address.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  address: any = { street: '', city: '' };
  isEditMode: boolean = false;

  constructor(
    private addressService: AddressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.addressService.getAddressById(id).subscribe(
        (data) => {
          this.address = data;
        },
        (error) => {
          console.error('Error loading address', error);
        }
      );
    }
  }

  saveAddress(): void {
    if (this.isEditMode) {
      this.addressService.updateAddress(this.address.id, this.address).subscribe(
        () => {
          console.log('Address updated successfully');
          this.router.navigate(['/addresses']);
        },
        (error) => {
          console.error('Error updating address', error);
        }
      );
    } else {
      this.addressService.createAddress(this.address).subscribe(
        () => {
          console.log('Address created successfully');
          this.router.navigate(['/addresses']);
        },
        (error) => {
          console.error('Error creating address', error);
        }
      );
    }
  }
}
