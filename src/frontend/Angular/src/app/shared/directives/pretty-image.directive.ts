import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrettyImage]'
})
export class PrettyImageDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  public onCorruptedImage(): void {
    this.elementRef.nativeElement.src = 'assets/pictograms/default-image.png';
  }
}
