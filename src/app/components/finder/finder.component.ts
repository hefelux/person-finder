import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// SERVICES
import { PersonService } from '../../services/person.service';
import { RegionService } from '../../services/region.service';
// MODELS
import { Person } from '../../models/person.model';
import { Region } from '../../models/region.model';
import { District } from 'src/app/models/district.model';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

  // Person
  personsList: Person[];
  personsEmpty: boolean;
  personsListFiltered: Person[];
  personSearchText: string;
  // Region
  regionsList: Region[];
  regionsEmpty: boolean;
  regionSelected: Region;
  regionDropdownText = 'Región';
  // District (Comunas)
  districtsList: District[];
  districtsEmpty: boolean;
  districtSelected: District;
  districtDropdownText = 'Comuna';
  // Person Details
  @ViewChild('PersonDetails') PersonDetails;

  constructor(
    private personService: PersonService,
    private regionService: RegionService
  ) { }

  ngOnInit(): void {
    this.getPersonsList();
    this.getRegionsList();
  }

  /** Método para obtener todo el listado de personas */
  getPersonsList(): void {

    this.personService.getAllPersons().subscribe(data => {

        if (data === undefined || data === null || data.length === 0) {
          this.personsEmpty = true;
          return false;
        }

        this.personsEmpty = false;
        this.personsList = data;
        this.getActivePersons();
        return true;

      },
      error => {

        console.log('Error' + error);
        this.personsList = [];
        this.personsEmpty = true;
        return false;

      }
    );
  }

  /** Método para obtener listado de personas activas */
  getActivePersons(): void {

    this.personsList = this.personsList.filter(person => person.activo === 1);
    this.personsListFiltered = this.personsList;

  }

 /** Método para obtener el listado de regiones */
  getRegionsList(): void {

    this.regionService.getAllRegions().subscribe(data => {

      if (data === undefined || data === null || data.length === 0) {
        this.regionsEmpty = true;
        return false;
      }

      this.regionsEmpty = false;
      this.regionsList = data;
      return true;

    },
    error => {

      console.log('Error' + error);
      this.regionsList = [];
      this.personsEmpty = true;
      return false;

    }
  );

  }

  /** Método generico para filtrar personas según filtros seleccionados y texto de búsqueda */
  filterPersons(): void {

    this.getActivePersons();
    const text = this.personSearchText;

    if (text !== undefined && text.trim().length !== 0 && text.trim() !== '') {
      this.filterByName(text.toLowerCase());
    }

    if (this.regionSelected !== undefined && this.regionSelected !== null){
      this.filterByRegion();
    }
    if (this.districtSelected !== undefined && this.districtSelected !== null){
      this.filterByDistrict();
    }

    if (this.personsListFiltered.length > 0){
      this.personsEmpty = false;
    } else {
      this.personsEmpty = true;
    }

  }

  /** Método para setear región seleccionada, cargar comunas pertinentes y filtrar según selección */
  setRegion(region: Region): void {

    this.districtsEmpty = false;
    this.districtsList = [];
    this.districtSelected = null;

    if (region === undefined || region === null) {
      this.districtsEmpty = true;
      return;
    }

    this.regionSelected = region;
    this.regionDropdownText = this.regionSelected.nombre;
    this.districtDropdownText = 'Comuna';
    this.getDistrics();
    this.filterPersons();

  }

  /** Método para obtener comunas de región seleccionada */
  getDistrics(): void {
    this.districtsList = this.regionSelected.comunas;
  }

  /** Método para filtrar personas según texto de búsqueda */
  filterByName(text: string): void{

    const tempPersonList: Person[] = [];
    for (const person of this.personsListFiltered) {

      const name = person.nombre.toLowerCase();
      const lastname = person.apellido.toLowerCase();

      if (name.indexOf(text) >= 0 || lastname.indexOf(text) >= 0) {

        tempPersonList.push(person);

      }
    }

    this.personsListFiltered = tempPersonList;

  }

  /** Método para filtrar personas según región seleccionada */
  filterByRegion(): void {

    this.personsListFiltered = this.personsListFiltered.filter(person => this.regionSelected.comunas
      .map(comuna => comuna.id).indexOf(person.direccion.comuna.id) >= 0);

  }

  /** Método para setear comuna seleccionada y filtrar según selección */
  setDistrict(district: District): void {

    if (district === undefined || district === null) {
      return;
    }

    this.districtSelected = district;
    this.districtDropdownText = this.districtSelected.nombre;
    this.filterPersons();

  }

  /** Método para filtrar personas según región seleccionada */
  filterByDistrict(): void {

    this.personsListFiltered = this.personsListFiltered.filter((person => person.direccion.comuna.id === this.districtSelected.id));

  }

  /** Método para limpiar filtros de region y comuna */
  clearFilters(): void {
    this.regionSelected = null;
    this.regionDropdownText = 'Región';
    this.districtSelected = null;
    this.districtsList = null;
    this.districtDropdownText = 'Comuna';
    this.filterPersons();
  }

  /** Método para mostrar detalles de persona */
  showPersonDetails(person: Person): void {
    this.PersonDetails.open(person);
  }

}
