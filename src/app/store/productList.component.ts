import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Cart } from "../models/cart.model"


@Component({
  selector: 'ngbd-pagination',
  templateUrl: 'productList.component.html',
})
export class ProductListComponent {

  page = 1; // pagina iniziale
  pageSize = 10; // elementi per pagina
  maxSize=10; // indica il numero di pagine sequenziali tipo 1 .. 2,3,4,5,6,7,8,9,10,11 .. 200


  // constructor(private repo: Repository, private route: ActivatedRoute, private router: Router) { }
  constructor(private repo: Repository, private cart: Cart) {}


  get products(): Product[] {
    return this.repo.products;
  }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }
}
