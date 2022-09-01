import { Obrazovanje } from 'src/app/model/obrazovanje.model';
import { Sektor } from 'src/app/model/sektor.model';

export class Radnik {
  id!: number;
  ime!: string;
  prezime!: string;
  brojLk!: number;
  obrazovanje!: Obrazovanje;
  sektor!: Sektor;
}
