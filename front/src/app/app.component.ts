import { Component, DestroyRef, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from "primeng/splitter";
import { ToolbarModule } from "primeng/toolbar";
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { CartService } from "./products/data-access/cart.service";
import { BadgeModule } from "primeng/badge";
import { OverlayPanel, OverlayPanelModule } from "primeng/overlaypanel";
import { TableModule, TableRowSelectEvent } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CartItem } from "./products/data-access/cart.model";
import { Subscription } from "rxjs";
import { MadCurrencyPipe } from "./shared/commons/common-formats.pipe";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [
    RouterModule,
    SplitterModule,
    ToolbarModule,
    PanelMenuComponent,
    BadgeModule,
    OverlayPanelModule,
    TableModule,
    ButtonModule,
    MadCurrencyPipe,
    FormsModule,
  ],
})
export class AppComponent {
  cartService = inject(CartService);
  title = "ALTEN SHOP";
  cartCount: number = 0;
  cartContent: CartItem[] = [];
  destroyRef = inject(DestroyRef);
  products = "";

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe((count) => {
      this.cartCount = count;
    });
  }

  onCartInputChange(e: TableRowSelectEvent) {
    this.cartService.updateCartItemCount();
  }

  onCartClick(overlay: OverlayPanel, e: MouseEvent) {
    const sub = this.cartService.getCartItems().subscribe((list) => {
      this.cartContent = list;
    });

    if (this.cartCount) {
      overlay.toggle(e);
    }

    this.onUnsubscribe(sub);
  }

  onDeleteItem(item : CartItem){
    this.cartService.removeItem(item).subscribe();
    //console.log(item);
  }

  private onUnsubscribe(sub: Subscription): void {
    sub.unsubscribe();
  }


}
