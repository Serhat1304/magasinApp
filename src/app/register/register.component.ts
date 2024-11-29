import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      storeId: ['', Validators.required],
      role: ['user', Validators.required]
    });
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
}