import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export class CustomLabelDirective implements OnInit {

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input()
  public set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input()
  set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage()
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;
  }
  ngOnInit(): void {
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;
    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void{
    if (!this.htmlElement) return;
    if (!this._errors){
      this.htmlElement.nativeElement.textContent = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors);

    if(errors.includes('required')){
      this.htmlElement.nativeElement.textContent = 'Este campo es obligatorio';
      return;
    }
    if(errors.includes('minlength')){
      const {requiredLength,actualLength}=this._errors['minlength']
      this.htmlElement.nativeElement.textContent = `Este campo requiere minimo ${requiredLength} caracteres faltan ${(requiredLength-actualLength)>1? requiredLength-actualLength + ' caracteres':'un caracter'} `;
      return;
    }
    if(errors.includes('email')){
      this.htmlElement.nativeElement.textContent = 'No tiene formato de correo.';
    }
  }
}
