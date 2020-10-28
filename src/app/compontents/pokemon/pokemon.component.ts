import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css'],
})
export class PokemonComponent implements OnInit {
  constructor(private pokemonService: PokemonService) {}

  pokemons: Pokemon[] = null;
  subscriber: Subscription;

  ngOnInit(): void {
    this.subscriber = this.pokemonService.$pokemonList.subscribe((res) => {
      this.pokemons = res;
    });
  }
}
