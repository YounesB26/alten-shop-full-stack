import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  inject,
  signal,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CartService } from "app/products/data-access/cart.service";
import { Product } from "app/products/data-access/product.model";
import { ProductsService } from "app/products/data-access/products.service";
import { ProductFormComponent } from "app/products/ui/product-form/product-form.component";
import {
  MadCurrencyPipe,
  StatusFormattingPipe,
} from "app/shared/commons/common-formats.pipe";
import { StockColorDirective } from "app/shared/commons/stock-color.directive";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DataViewModule } from "primeng/dataview";
import { DialogModule } from "primeng/dialog";
import { ImageModule } from "primeng/image";
import { RatingModule } from "primeng/rating";
import { BadgeModule } from 'primeng/badge';


const emptyProduct: Product = {
  id: 0,
  code: "",
  name: "",
  description: "",
  image: "",
  category: "",
  price: 0,
  quantity: 0,
  internalReference: "",
  shellId: 0,
  inventoryStatus: "INSTOCK",
  rating: 0,
  createdAt: 0,
  updatedAt: 0,
};

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
  standalone: true,
  imports: [
    DataViewModule,
    CardModule,
    ButtonModule,
    DialogModule,
    ProductFormComponent,
    ImageModule,
    MadCurrencyPipe,
    StockColorDirective,
    StatusFormattingPipe,
    RatingModule,
    FormsModule,
    BadgeModule
    
  ],
})
export class ProductListComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  public readonly products = this.productsService.products;

  public isDialogVisible = false;
  public isCreation = false;
  public readonly editedProduct = signal<Product>(emptyProduct);

  @ViewChild("quantityInput") quantityInputs!: QueryList<ElementRef>;

  public cartService = inject(CartService);

  ngOnInit() {
    this.productsService.get().subscribe();
  }

  public onCreate() {
    this.isCreation = true;
    this.isDialogVisible = true;
    this.editedProduct.set(emptyProduct);
  }

  public onUpdate(product: Product) {
    this.isCreation = false;
    this.isDialogVisible = true;
    this.editedProduct.set(product);
  }

  public onDelete(product: Product) {
    this.productsService.delete(product.id).subscribe();
  }

  public onSave(product: Product) {
    if (this.isCreation) {
      this.productsService.create(product).subscribe();
    } else {
      this.productsService.update(product).subscribe();
    }
    this.closeDialog();
  }

  public onAddToCart(product: Product, q: string = "1") {
    const quantity = parseInt(q);
    if (quantity) {
      console.log(product.id);
      console.log(this.quantityInputs);
      const { id, name, price } = product;
      this.cartService.addToCart({ id, name, price, quantity }).subscribe();
    }
  }

  public onCancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.isDialogVisible = false;
  }
}
