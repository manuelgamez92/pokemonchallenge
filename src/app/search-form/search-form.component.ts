import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  form: FormGroup;
  pokemon: string;
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.formLoad();
  }

  onSearch() {
    if (this.form.invalid) return;
    let name = this.form.controls['pokemonInput'].value;
    this.pokemonService.search(name.toLowerCase());
  }
  formLoad() {
    this.form = new FormGroup({
      pokemonInput: new FormControl('', [Validators.required]),
    });
  }
}
