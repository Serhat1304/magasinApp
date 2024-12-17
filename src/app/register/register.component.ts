import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  stores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator()]],
      storeId: [''],
      role: ['user', Validators.required]
    });
  }

  get isAdmin(): boolean {
    return this.registerForm.get('role')?.value === 'admin';
  }

  ngOnInit(): void {
    this.userService.getStores().subscribe({
      next: (stores) => (this.stores = stores),
      error: (err) => console.error('Erreur lors du chargement des magasins :', err)
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.createUser(this.registerForm.value).subscribe({
        next: () => {
          alert('Utilisateur créé avec succès !');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l’utilisateur :', err);
        }
      });
    }
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const hasUpperCase = /[A-Z]/.test(password); // Vérifie la présence d'une majuscule
      const hasLowerCase = /[a-z]/.test(password); // Vérifie la présence d'une minuscule
      const hasNumbers = /\d/.test(password); // Vérifie la présence d'un chiffre
      const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password); // Vérifie la présence de caractères spéciaux

      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) {
        return null;
      }

      return {weakPassword: true};
    };
  }
}
