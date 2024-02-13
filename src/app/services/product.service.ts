import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productUrl = 'http://localhost:9001/api/products';

  private categoryUrl = 'http://localhost:9001/api/product-category';

  constructor(private httpClient: HttpClient) {}

  getProductList():Observable<Product[]>{
    return this.httpClient.get<GetResponseProduct>(this.productUrl).pipe(
      map(response => response._embedded.product));
  }

  searchProductsPaginate(
    pageNumber: number,
    pageSize: number,
    keyword: string
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.productUrl}/search/findByNameContaining?` +
      `name=${keyword}&page=${pageNumber}&size=${pageSize}`;
      return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductListPaginate(
    pageNumber: number,
    pageSize: number,
    categoryId: number
  ): Observable<GetResponseProducts> {
    const searchUrl =
      `${this.productUrl}/search/findByCategoryId?` +
      `id=${categoryId}&page=${pageNumber}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.productUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }
}

interface GetResponseProduct {
  _embedded: {
    product: Product[];
  };
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
