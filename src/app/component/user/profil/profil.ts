import { Component, OnInit, signal } from '@angular/core';
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
  utilisateur = signal<Utilisateur | null>(null);
  user = JSON.parse(localStorage.getItem('user')!);
  id = this.user.id;

  successMessage = signal('');
  errorMessage = signal('');
  profilForm!: FormGroup;
  motDePasseForm!: FormGroup;

  constructor(private fb: FormBuilder, private profilService: ProfilService) {}

  ngOnInit(): void {
    this.profilService.findById(this.id).subscribe((utilisateur) => {
      console.log('🚀 ~ onInit ~ ');

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
    console.log('Maj du profil');
    console.log(this.profilForm.value);
    console.log(this.id);

    this.profilService.update(this.id, this.profilForm.value).subscribe({
      next: () => (this.successMessage.set('Profil mis à jour.')),
      error: () => (this.errorMessage.set('Erreur lors de la mise à jour.')),
    });

  }

  changeMotDePasse() {
    const { newMotDePasse, confirmMotDePasse } = this.motDePasseForm.value;

    if (newMotDePasse !== confirmMotDePasse) {
      this.errorMessage.set('Les mots de passe ne correspondent pas.');
      return;
    }
  }

  removeProfil() {
    if (!confirm('Supprimer votre compte ?')) return;

    // this.profilService.remove(this.utilisateur?.id!).subscribe(() => {
    //   alert('Compte supprimé.');
    // });
  }
}
