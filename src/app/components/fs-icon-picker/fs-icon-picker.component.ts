import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: '[fsIconPicker]',
  template: `
    <span>
      <div class="preview" *ngIf="ngModel" (click)="openDialog()"><mat-icon>{{ngModel}}</mat-icon></div>
    </span>
  `,
  styleUrls: ['./fs-icon-picker.component.scss']
})
export class FsIconPickerComponent implements AfterViewInit {
  @Input() public ngModel: string | null = null;
  @Output() public ngModelChange = new EventEmitter<string>();

  constructor(private _dialog: MatDialog,
              private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  public inputClick($event: Event) {
    if (!this.ngModel) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.openDialog();
  }

  public ngAfterViewInit() {
    const element = this.el.nativeElement;
    element.parentElement.insertBefore(element.firstChild, element);
  }

  public openDialog() {
    const dialogRef = this._dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((result: string | null) => {
     if (result) {
       this.ngModelChange.emit(result);
     }
    });
  }
}