import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input('appHover') case: string = '';

  constructor(private elRef: ElementRef, private renderer2: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer2.setStyle(this.elRef.nativeElement, 'fontSize', '36px');
    this.renderer2.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      this.case
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer2.setStyle(this.elRef.nativeElement, 'fontSize', '14px');
    this.renderer2.setStyle(
      this.elRef.nativeElement,
      'backgroundColor',
      'white'
    );
  }
}
