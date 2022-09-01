import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/model/preduzece.model';
import { Sektor } from 'src/app/model/sektor.model';
import { PreduzeceService } from 'src/app/service/preduzece.service';
import { SektorService } from 'src/app/service/sektor.service';



@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  public flag!: number;

  preduzeca!: Preduzece[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SektorDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Sektor,
    public sektorService: SektorService,
    public preduzeceService: PreduzeceService ) { }

  ngOnInit(): void {
      this.preduzeceService.getAllPreduzece().subscribe(preduzeca =>
      this.preduzeca = preduzeca) //stavljamo svezu kopiju preduzeca u niz
  }

  public add(): void {
    this.sektorService.addSektor(this.data);
    this.snackBar.open('Uspešno dodat sektor ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.sektorService.updateSektor(this.data);
    this.snackBar.open('Uspešno izmenjen sektor ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.sektorService.deleteSektor(this.data.id);
    this.snackBar.open('Uspešno obrisan sektor ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b: any) { //poredi id-eve predizeca i ako nisu razliciti, treba da ostanu isti podaci -- ovo nam sluzi za kad korisnik hoce da doda novo preduzece za sektor da mu izadju ponudjena
    return a.id === b.id;
  }

}
