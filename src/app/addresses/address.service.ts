import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = environment.apiAddressUrl;

  constructor(private http: HttpClient) {}

  // Récupérer toutes les adresses
  getAllAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl);
  }

  // Récupérer une adresse par ID
  getAddressById(id: number): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/${id}`);
  }

  // Créer une nouvelle adresse
  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.baseUrl, address);
  }

  // Mettre à jour une adresse
  updateAddress(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.baseUrl}/${id}`, address);
  }

  // Supprimer une adresse
  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
