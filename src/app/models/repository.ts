import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product.model";
import { Supplier } from "./supplier.model"
import { Filter } from "./configClasses.repository";


const productsUrl = "/api/products";
const suppliersUrl = "/api/suppliers";


@Injectable()
export class Repository {
  product: Product;
  products: Product[];
  suppliers: Supplier[]=[];
  filter: Filter=new Filter();

  constructor(private http: HttpClient) {
    // this.filter.category = "Garden";
    this.filter.related = true;
    this.getProducts();
  }

  getProduct(id: number) {
    this.http.get<Product>(`${productsUrl}/${id}`).subscribe(p => { this.product = p; });
  }

  getProducts() {
    let url = `${productsUrl}?related=${this.filter.related}`;
    if (this.filter.category) {
      url += `&category=${this.filter.category}`;
    }
    if (this.filter.search) {
      url += `&search=${this.filter.search}`;
    }

    this.http.get<Product[]>(url).subscribe(prods => this.products = prods);
  }

  getSuppliers() {
    this.http.get<Supplier[]>(suppliersUrl).subscribe(supp => this.suppliers = supp);
  }


  createProduct(prod: Product) {
    let data = {
      name: prod.name,
      category: prod.category,
      description: prod.description,
      price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };

    this.http.post<number>(productsUrl, data).subscribe(id => {
      prod.productId = id;
      this.products.push(prod);
    });
  }

  createProductAndSupplier(prod: Product, supp: Supplier) {
    let data = {
      name: supp.name,
      city: supp.city,
      state: supp.state
    };

    this.http.post<number>(suppliersUrl, data).subscribe(id => {
      supp.supplierId = id;
      prod.supplier = supp;
      this.suppliers.push(supp);
      if (prod != null) {
        this.createProduct(prod);
      }
    });
  }


  //  Replace Product
  replaceProduct(prod: Product) {
    let data = {
      name: prod.name,
      category: prod.category,
      description: prod.description,
      price: prod.price,
      supplier: prod.supplier ? prod.supplier.supplierId : 0
    };

    this.http.put(`${productsUrl}/${prod.productId}`, data).subscribe(() => this.getProducts());
  }

  // Replace Supplier
  replaceSupplier(supp: Supplier) {
    let data = {
      name: supp.name,
      city: supp.city,
      state: supp.state
    };
    this.http.put(`${suppliersUrl}/${supp.supplierId}`, data).subscribe(() => this.getProducts());
  }
}
