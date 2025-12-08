import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Utilisateur } from '../../../models/utilisateur';
import { ProfilService } from '../../../service/profil';

@Component({
  selector: 'app-profil',
  imports: [ReactiveFormsModule],
  templateUrl: './profil.html',
  styleUrl: './profil.css',
})
export class ProfilComponent implements OnInit {
  utilisateur: Utilisateur | null = null;
  successMessage = '';
  errorMessage = '';
  profilForm!: FormGroup;
  motDePasseForm!: FormGroup;

  constructor(private fb: FormBuilder, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.profilService.getUtilisateur().subscribe((utilisateur) => {
      this.utilisateur = utilisateur;
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
    this.profilService.updateProfil(this.profilForm.value).subscribe({
      next: () => (this.successMessage = 'Profil mis à jour.'),
      error: () => (this.errorMessage = 'Erreur lors de la mise à jour.'),
    });
  }

  changeMotDePasse() {
    const { newMotDePasse, confirmMotDePasse } = this.motDePasseForm.value;

    if (newMotDePasse !== confirmMotDePasse) {
      this.errorMessage = 'Les mots de passe ne correspondent pas.';
      return;
    }
  }

  removeProfil() {
    if (!confirm('Supprimer votre compte ?')) return;

    this.profilService.remove(this.utilisateur?.id!).subscribe(() => {
      alert('Compte supprimé.');
    });
  }
}
