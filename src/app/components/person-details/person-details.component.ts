import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.scss'],
  animations: [
    trigger('showDetails', [
        state(
            'hide',
            style({
                right: '-100%'
            })
        ),
        state(
            'show',
            style({
                right: 0,
            })
        ),
        transition(
            'show => hide',
            animate('500ms ease-in', style({ right: '-100%' }))
        ),
        transition(
            'hide => show',
            animate('500ms ease-out', style({ right: 0 }))
        )
    ])
]
})
export class PersonDetailsComponent implements OnInit {

  state = 'hide';
  person: Person = null;

  constructor() { }

  ngOnInit(): void {
  }

  /** Método para mostrar componente y cargar detalles de persona */
  public open(person: Person): void {

    if (person !== undefined && person !== null){
      this.person = person;
      console.log(this.person);
    }
    this.state = 'show';
  }

  /** Método para ocultar componente y setear persona en null */
  public close(): void {

    this.state = 'hide';
    setTimeout(() => {
      this.person = null;
    }, 500);

  }

 /** Método para verificar formato de teléfono formato internacional */
  verifyPhoneNumber(phone: number): boolean {
    return phone.toString().length === 11 ? true : false;
  }

  /** Método para verificar formato de rut */
  verifyRut(fullText: string): boolean {

    fullText = fullText.replace('‐', '-');
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test( fullText )) {
      return false;
    }

    const tmp 	= fullText.split('-');
    let digv	= tmp[1];
    const rut 	= tmp[0];

    if ( digv === 'K' ) {
      digv = 'k' ;
    }

    return (this.getDv(rut) === digv );

  }

  /** Método para obtener el digito verificador */
  getDv(rut: string): any {
    let T = parseInt(rut, 10);
    let M = 0;
    let S = 1;
    for ( ; T ; T = Math.floor(T / 10)) {
      S = (S + T % 10 * (9 - M ++ % 6)) % 11;
    }
    return S ? (S - 1).toString() : 'k';
  }

}
