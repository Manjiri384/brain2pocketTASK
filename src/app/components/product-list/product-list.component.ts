import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  category: string='';
  datas:any;
  categories: string[] = []; // List of categories
  selectedCategory: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.productService.getProductsByCategory(this.category).subscribe(data => {
        this.products = data;
      });
    });
    
      this.productService.getProducts().subscribe(data=>{
        this.datas=data;
      });
    }
  

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    alert('Product added to cart!');
  }

  getCategories(): void {
    // Fetch products to determine categories
    this.productService.getProducts().subscribe(data => {
      this.categories = Array.from(new Set(data.map(product => product.category)));
    });
  }

  getProducts(category?: string): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCategory = target.value;
    this.getProducts(this.selectedCategory);
  }

  
}
