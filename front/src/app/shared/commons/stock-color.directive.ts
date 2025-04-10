import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  selector: "[appStockColor]",
  standalone: true,
})
export class StockColorDirective {
  @Input() appStockColor: string = "";

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.classList.remove("text-green-600", "text-pink-600");

    switch (this.appStockColor) {
      case "INSTOCK": {
        this.el.nativeElement.classList.add("text-green-400");
        break;
      }
      case "LOWSTOCK": {
        this.el.nativeElement.classList.add("text-orange-500");
        break;
      }
      case "OUTOFSTOCK": {
        this.el.nativeElement.classList.add("text-pink-400");
        break;
      }
      default: {
        this.el.nativeElement.classList.add("text-black");
        break;
      }
    }
  }
}
