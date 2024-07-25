import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  items = this.cartService.getItems();
  discount = 0;

  constructor(private cartService: CartService) { }

  applyCoupon(code: string): void {
    this.discount = this.cartService.applyCoupon(code);
  }

  getTotal(): number {
    const total = this.items.reduce((acc, item) => acc + item.price, 0);
    return total - (total * this.discount);
  }

  submitOrder(): void {
    // Handle order submission logic
    console.log('Order submitted', this.items, this.getTotal());
    
    alert('Order submitted!');
    this.cartService.clearCart();
  }
}
