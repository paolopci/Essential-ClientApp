import { Component } from "@angular/core";
import { Repository } from "../models/repository";
import { Product } from "../models/product.model";
import { Supplier } from "../models/supplier.model";

@Component({
  selector: 'ngbd-pagination',
  templateUrl: "productAdmin.component.html"
})
export class ProductAdminComponent {


  page = 1; // pagina iniziale
  pageSize = 10; // elementi per pagina
  maxSize=10; // indica il numero di pagine sequenziali tipo 1 .. 2,3,4,5,6,7,8,9,10,11 .. 200

  constructor(private repo: Repository) {}

  tableMode: boolean = true;

  get product(): Product {
    return this.repo.product;
  }

  selectProduct(id: number) {
    return this.repo.getProduct(id);
  }

  saveProduct() {
    if (this.repo.product.productId == null) {
      this.repo.createProduct(this.repo.product);
    } else {
      this.repo.replaceProduct(this.repo.product);
    }
    this.clearProduct();
    this.tableMode = true;
  }

  deleteProduct(id: number) {
    this.repo.deleteProduct(id);
  }

  clearProduct() {
    this.repo.product = new Product();
    this.tableMode = true;
  }

  get products(): Product[] {
    return this.repo.products;
  }
}
