import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { CartItem } from "./cart.model";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private cart: CartItem[] = [];
  private cartItemCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {}

  // Get the number of items in the cart
  getCartItemCount() {
    return this.cartItemCount.asObservable();
  }

  //Get the cart items
  getCartItems(): Observable<CartItem[]> {
    return new Observable((observer) => {
      observer.next(this.cart);
    });
  }

  // Add an item to the cart
  addToCart(item: CartItem): Observable<CartItem[]> {
    return new Observable((observer) => {
      const existingItem = this.cart.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        this.cart.push(item);
      }
      this.updateCartItemCount();
      observer.next(this.cart);
    });
  }

  removeItem(item: CartItem) {
    return new Observable((observer) => {
      const index = this.cart.indexOf(item);

      if (index !== -1) {
        this.cart.splice(index, 1);
      }
      this.updateCartItemCount();
      observer.next(this.cart);
    });
  }

  // Update the cart item count
  updateCartItemCount(): void {
    const totalItemCount = this.cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
    this.cartItemCount.next(totalItemCount);
  }
}
