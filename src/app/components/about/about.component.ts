import { PokemonInfo } from './../../models/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  private routeId: string;
  pokemonObservable: Observable<PokemonInfo>;

  constructor(private router: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.routeId = this.router.snapshot.params.id;
    this.initPokemonData();
  }

  // private async initPokemonData(): Promise<void> {
  //   const data = await this.http
  //     .get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${this.routeId}`)
  //     .toPromise();
  //   console.log('data', data);
  // }

  private initPokemonData(): void {
    this.pokemonObservable = this.http
      .get<PokemonInfo>(`https://pokeapi.co/api/v2/pokemon/${this.routeId}`);
  }
}
