import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../../../models/utilisateur';
import { ProfilService } from '../../../service/profil';
import { AuthService } from '../../../service/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profil',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class ProfilComponent implements OnInit {
  utilisateur = signal<Utilisateur | null>(null);
  user: Utilisateur | null = null;
  id: number | null = null;

  successMessage = signal('');
  errorMessage = signal('');
  profilForm!: FormGroup;
  motDePasseForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profilService: ProfilService,
    private authService: AuthService
  ) {
    this.user = this.authService.currentUser;
    this.id = this.user?.id ?? null;
  }

  ngOnInit(): void {
    this.profilService.findById(this.id!).subscribe((utilisateur) => {
      this.utilisateur.set(utilisateur);
      this.profilForm.patchValue(utilisateur);
    });

    this.profilForm = this.fb.group({
      nomUtilisateur: ['', Validators.required],
      adresseMail: ['', [Validators.required, Validators.email]],
      adresse: [''],
    });

    this.motDePasseForm = this.fb.group({
      currentMotDePasse: ['', Validators.required],
      newMotDePasse: ['', [Validators.required, Validators.maxLength(20)]],
      confirmMotDePasse: ['', Validators.required],
    });
  }

  updateProfil() {
    this.profilService.update(this.id!, this.profilForm.value).subscribe({
      next: () => this.successMessage.set('Profil mis à jour.'),
      error: () => this.errorMessage.set('Erreur lors de la mise à jour.'),
    });
  }

  changeMotDePasse() {
    console.log('Maj du mdp');
    console.log(this.motDePasseForm.value);
    console.log(this.id);
    const { newMotDePasse, confirmMotDePasse } = this.motDePasseForm.value;

    if (newMotDePasse !== confirmMotDePasse) {
      this.errorMessage.set('Les mots de passe ne correspondent pas.');
      return;
    }

    this.profilService.changeMotDePasse(this.id!, this.motDePasseForm.value).subscribe({
      next: () => this.successMessage.set('Mot de passe mis à jour.'),
      error: () => this.errorMessage.set('Erreur lors de la mise à jour du mot de passe.'),
    });
  }

  removeProfil() {
    if (!confirm('Supprimer votre compte ?')) return;

    // this.profilService.remove(this.utilisateur?.id!).subscribe(() => {
    //   alert('Compte supprimé.');
    // });
  }
}
