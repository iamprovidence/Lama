import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { UserCredential } from 'src/app/core/models';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.less']
})
export class SignInModalComponent implements OnInit {
  public formGroup: FormGroup;

  @Input()
  public isOpen: boolean;
  @Input()
  public error: string;

  @Output()
  public closeModalEvent = new EventEmitter();

  @Output()
  public signInWithGoogleEvent = new EventEmitter();
  @Output()
  public signInWithFacabookEvent = new EventEmitter();
  @Output()
  public signInWithTwitterEvent = new EventEmitter();
  @Output()
  public signInManuallyEvent = new EventEmitter<UserCredential>();
  @Output()
  public signUpEvent = new EventEmitter<UserCredential>();

  constructor() {
    this.initializeFormGroup();
  }

  ngOnInit() {}

  private initializeFormGroup(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  public closeModal(): void {
    this.closeModalEvent.emit();
  }

  public signInWithGoogle(): void {
    this.signInWithGoogleEvent.emit();
  }

  public signInWithFacebook(): void {
    this.signInWithFacabookEvent.emit();
  }

  public signInWithTwitter(): void {
    this.signInWithTwitterEvent.emit();
  }

  public onLogIn(): void {
    this.validateAllFields(this.formGroup);

    if (this.formGroup.valid) {
      this.signInManuallyEvent.emit(this.formGroup.value as UserCredential);
    }
  }

  public onSignUp(): void {
    this.validateAllFields(this.formGroup);

    if (this.formGroup.valid) {
      this.signUpEvent.emit(this.formGroup.value as UserCredential);
    }
  }

  private validateAllFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);

      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
}
