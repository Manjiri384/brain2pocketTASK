import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: any[] = [];

  constructor() { }

  addToCart(product: any): void {
    this.items.push(product);
  }

  getItems(): any[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }

  applyCoupon(code: string): number {
    if (code === 'BRAIN2POCKET') {
      return 0.20;
    }
    return 0;
  }
}
