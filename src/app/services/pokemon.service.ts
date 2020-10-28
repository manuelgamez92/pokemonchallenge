import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { ToastrService } from 'ngx-toastr';
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokemonList = new BehaviorSubject<Pokemon[]>(null);
  list: Pokemon[] = [];
  $pokemonList = this.pokemonList.asObservable();
  constructor(private http: HttpClient,private toastr: ToastrService) {}

  search(pokemon: string) {
    return this.http.get(baseUrl + pokemon).subscribe((res: any) => {
      let flag = true;
      if (this.list.length > 0) {
        this.list.map((p) => {
          if (p.name === res.name || p.id === res.id) {
            p.quantity++;
            flag = false;
          }
        });
      }
      if (flag) {
        let single: Pokemon = {
          id: res.id,
          name: res.name,
          picture: res.sprites.other.dream_world.front_default,
          quantity: 1,
        };

        this.list.push(single);
      }
      this.pokemonList.next(this.list);
    },error =>{
      this.toastr.error("Pokemon not found.");
    });
  }
}
