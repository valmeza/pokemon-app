import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonResult } from 'src/app/models/pokemon.interface';
import { pluck, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  urlLookUp: any;
  pokemons: PokemonResult[];
  text: string;
  filterPokemon: PokemonResult[];
  results: PokemonResult[];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    this.initPokemonData();

  }

  // using a promise
  // private async initPokemonData(): Promise<void> {
  //   const val = await this.http
  //     .get<Pokemon>('https://pokeapi.co/api/v2/pokemon?offset=0')
  //     .toPromise();

  //   console.log('val', val);
  // }

  // using an observable
  private initPokemonData(): void {
    this.http
      .get<Pokemon>('https://pokeapi.co/api/v2/pokemon?offset=0')
      .pipe(
        pluck('results'),
        tap((results: PokemonResult[]) => {
          this.urlLookUp = results.reduce(
            (acc, cur, idx) => (acc = { ...acc, [cur.name]: idx + 1 }),
            {}
          );
        })
    ).subscribe((data: PokemonResult[]) => {
        this.pokemons = this.filterPokemon = data;
      });
  }

  onChange(updatedValue: string): void {
    console.log(this.filterPokemon);

    this.filterPokemon = this.pokemons.filter((pokemon) =>
      pokemon.name.includes(updatedValue)
    );
  }
}
