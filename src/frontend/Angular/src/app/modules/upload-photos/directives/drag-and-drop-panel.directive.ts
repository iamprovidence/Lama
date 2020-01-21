import { Directive, HostListener, ElementRef, Renderer2, Input, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[dragAndDropPanel]'
})
export class DragAndDropPanelDirective {
  @Input()
  public dragOverClass: string;

  @Output()
  public fileDropped = new EventEmitter<File[]>();

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @HostListener('dragenter')
  public onDragEnter(): void {
    this.renderer.addClass(this.element.nativeElement, this.dragOverClass);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.stopPropagation();
    $event.preventDefault();
    this.renderer.addClass(this.element.nativeElement, this.dragOverClass);
  }
  @HostListener('dragleave')
  public onDragLeave(): void {
    this.renderer.removeClass(this.element.nativeElement, this.dragOverClass);
  }

  @HostListener('drop', ['$event'])
  public onDrop($event: DragEvent): void {
    $event.preventDefault();

    this.renderer.removeClass(this.element.nativeElement, this.dragOverClass);

    const files = $event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(Array.from(files));
    }
  }

  @HostListener('body:dragover', ['$event'])
  public onBodyDragOver($event: DragEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  @HostListener('body:drop', ['$event'])
  public onBodyDrop($event: DragEvent): void {
    $event.preventDefault();
  }
}
