import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appEuroCurrency]',
})
export class EuroCurrencyDirective implements OnChanges {
  @Input() appEuroCurrency!: number;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appEuroCurrency']) {
      this.formatPrice();
    }
  }

  private formatPrice(): void {
    const price = typeof this.appEuroCurrency === 'string'
      ? parseFloat(this.appEuroCurrency)
      : this.appEuroCurrency;

    if (isNaN(price)) {
      this.renderer.setProperty(this.el.nativeElement, 'textContent', 'Prix invalide');
    } else {
      const formattedPrice = `${price.toFixed(2)} €`;
      this.renderer.setProperty(this.el.nativeElement, 'textContent', formattedPrice);
    }
  }

}
