import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Directive({
  selector: '[venAvatarColor]',
})
export class AvatarColorDirective implements OnInit {
  @Input() avatarColor = '';
  color = '';
  colorLighten = '';

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.generateAvatarColor(this.avatarColor);
    this.el.nativeElement.style.background = `linear-gradient(135deg, ${this.color} 0%, ${this.colorLighten} 15.5%)`;
  }

  private getCorrectIndex(number: number): number {
    if (number > 255) {
      return 255;
    }

    if (number < 0) {
      return 0;
    }

    return number;
  }

  private generateAvatarColor(hash: string): void {
    const [r, g, b] = hash
      .substr(0, 3)
      .split('')
      .map((char) => this.getCorrectIndex(char.charCodeAt(0)));

    this.color = tinycolor({ r, g, b }).saturate(70).toHexString();
    this.colorLighten = tinycolor({ r, g, b }).saturate(130).toHexString();
  }
}
