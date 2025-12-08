import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profil',
  imports: [],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class ProfilComponent implements OnInit {
  user: any = null;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private profileService: ProfileService) {}

  profileForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: [''],
  });

  passwordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.maxLength(20)]],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit(): void {
    this.profileService.getUser().subscribe((user) => {
      this.user = user;
      this.profileForm.patchValue(user);
    });
  }

  updateProfile() {
    this.profileService.updateProfile(this.profileForm.value).subscribe({
      next: () => (this.successMessage = 'Profil mis à jour.'),
      error: () => (this.errorMessage = 'Erreur lors de la mise à jour.'),
    });
  }

  changePassword() {
    const { newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }

    this.profileService.changePassword(this.passwordForm.value).subscribe({
      next: () => (this.successMessage = 'Mot de passe modifié.'),
      error: () => (this.errorMessage = 'Erreur lors du changement.'),
    });
  }

  deleteAccount() {
    if (!confirm('Supprimer votre compte ?')) return;

    this.profileService.deleteAccount().subscribe(() => {
      alert('Compte supprimé.');
    });
  }
}
