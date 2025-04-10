import { Pipe } from "@angular/core";

@Pipe({
  name: "madCurrency",
  standalone: true,
})
export class MadCurrencyPipe {
  transform(value: number): string {
    return value.toFixed(2) + " MAD";
  }
}

@Pipe({
  name: "statusFormatting",
  standalone: true,
})
export class StatusFormattingPipe {
  transform(value: string): string {
    switch (value) {
      case "INSTOCK": {
        return "In Stock";
      }
      case "LOWSTOCK": {
        return "Low Stock";
      }
      case "OUTOFSTOCK": {
        return "Out of Stock";
      }
      default: {
        return value;
      }
    }
  }
}
