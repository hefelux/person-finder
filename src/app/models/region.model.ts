import { District } from './district.model';

export interface Region {
  id: number;
  nombre: string;
  comunas: District[];
}
