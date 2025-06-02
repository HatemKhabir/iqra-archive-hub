import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// Import Angular Material modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
interface AuthForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [MatTabsModule, ReactiveFormsModule,ReactiveFormsModule,
    // Angular Material modules
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  authForm!: FormGroup<AuthForm>;
  hidePassword: boolean = true;
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.authForm = this.fb.group<AuthForm>({
      username: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: this.fb.control('')
    });
    
    // Add validators conditionally based on isLogin
    this.onLoginModeChange();
  }
  
  onLoginModeChange() {
    const confirmPasswordControl = this.authForm.get('confirmPassword');
    
    if (this.isLogin) {
      confirmPasswordControl?.clearValidators();
    } else {
      confirmPasswordControl?.setValidators([
        Validators.required,
        Validators.minLength(6),]);
    }
    
    confirmPasswordControl?.updateValueAndValidity();
  }
  
  passwordMatchValidator(control: FormControl) {
    if (control.value && control.value !== this.authForm.get('password')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
  
  onTabChange(index: number) {
    this.isLogin = (index === 0);
    this.authForm.reset();
    this.onLoginModeChange();
  }
  
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    
    if (this.isLogin) {
      console.log('Login:', this.authForm.value);
      // Call your auth service login method
    } else {
      console.log('Register:', this.authForm.value);
      // Call your auth service register method
    }
  }
  
  // Getter for form controls with proper typing
  get f() {
    return this.authForm.controls;
  }
}