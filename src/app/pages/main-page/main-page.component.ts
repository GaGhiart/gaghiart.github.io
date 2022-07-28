import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Personaje } from 'src/app/interfaces/Personaje';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {

  personajes: Personaje[]|undefined;
  personajesCopy:Personaje[]|undefined;

  constructor(public http: HttpClient) {

    this.getData();
  }


  async getData() {
      await this.http
      .get<any>(environment.apiUrl + '/personajes')
      .subscribe((res)=>{
        console.table(res);
        this.personajes = res.map(({id,personaje,apodo,imagen,casaDeHogwarts,hijos}: Personaje ) =>{
          return {
            id: id,
            personaje: personaje,
            apodo: apodo,
            imagen: imagen,
            casaDeHogwarts: casaDeHogwarts,
            hijos: hijos
          }
        }
      );
      this.personajesCopy = this.personajes;
      });
    }

  filter(e:any){
    const search: string = e.target.value;

    this.personajes = this.personajesCopy?.filter(({personaje}: Personaje) =>
    {
      return personaje.toLowerCase().includes(search.toLowerCase());
    })

    console.log({search});
  }
}
