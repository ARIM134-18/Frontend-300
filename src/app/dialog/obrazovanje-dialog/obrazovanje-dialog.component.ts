import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/model/obrazovanje.model';
import { ObrazovanjeService } from 'src/app/service/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag!: number; //u odnosu na njega prikazujemo polja // u html-u imamo flag 1 2 3

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>, //na koju komponentu dijaloga se odnosi
    @Inject(MAT_DIALOG_DATA)//komunikacija izmedju kompoenente i dialoga
    public data: Obrazovanje, //tip obrazovanje
    public obrazovanjeService: ObrazovanjeService ) { } //treba nam da saljemo zahtev npr. prilikom edit-a - saljemo zahtev servisu a servis SB-u 

  ngOnInit(): void {
  }

  public add(): void {        //definisanje metoda
    this.obrazovanjeService.addObrazovanje(this.data);
    this.snackBar.open('Uspešno dodato obrazovanje ' + this.data.naziv, 'Uredu', {duration: 2000}); //otvara poruku //vreme kolko ce da stoji otvoren
  }

  public update(): void {
    this.obrazovanjeService.updateObrazovanje(this.data);
    this.snackBar.open('Uspešno izmenjeno obrazovanje ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.obrazovanjeService.deleteObrazovanje(this.data.id);
    this.snackBar.open('Uspešno obrisano obrazovanje ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

}
