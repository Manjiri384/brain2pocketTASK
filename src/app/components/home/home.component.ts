import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, startWith } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: any[] = [];
  
  category: string = '';
  datas:any;
  categories: any[] = []; // List of categories
  selectedCategory: string = '';
  filteredCategories: string[] = [];
  categoryFilterCtrl = new FormControl();
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
        this.filterProductsByCategory();
      });
    });
    
      this.productService.getProducts().subscribe(data=>{
        this.datas=data;
        this.products=data
        this.categories = this.getUniqueCategories(data);
        this.filteredCategories = this.categories;
        this.filterProductsByCategory();
      //  this.categories = [...new Set(this.datas.map((product:any) => product.category))];
     // this.filteredCategories = this.categories;
      });
      this.categoryFilterCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => this.filterCategories(value))
      )
      .subscribe(filtered => {
        this.filteredCategories = filtered;
      });
    }
    filterCategories(value: string): string[] {
      const filterValue = value.toLowerCase();
      return this.categories.filter(category => category.toLowerCase().includes(filterValue));
    }
  
    getUniqueCategories(products: any[]): string[] {
      return Array.from(new Set(products.map(product => product.category)));
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
  filterProductsByCategory(): void {
    if (this.selectedCategory) {
      this.datas = this.products.filter(product => product.category === this.selectedCategory);
    } else {
      this.datas = this.products;
    }
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.value;
    this.filterProductsByCategory();
  }

  
}

