import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Obrazovanje } from 'src/app/model/obrazovanje.model';
import { Radnik } from 'src/app/model/radnik.model';
import { ObrazovanjeService } from 'src/app/service/obrazovanje.service';
import { RadnikService } from 'src/app/service/radnik.service';
import { Sektor } from 'src/app/model/sektor.model';
import { SektorService } from 'src/app/service/sektor.service';



@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  public flag!: number;

  obrazovanja!: Obrazovanje[];
  sektori!: Sektor[];

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RadnikDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Radnik,
    public radnikService: RadnikService,
    public obrazovanjeService: ObrazovanjeService,
    public sektorService: SektorService ) { }

  ngOnInit(): void {
      this.obrazovanjeService.getAllObrazovanje().subscribe(obrazovanja =>
      this.obrazovanja = obrazovanja)
      this.sektorService.getAllSektor ().subscribe(sektori =>
        this.sektori = sektori)
  }

  public add(): void {
    this.radnikService.addRadnik(this.data);
    this.snackBar.open('Uspešno dodata porudžbina ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.radnikService.updateRadnik(this.data);
    this.snackBar.open('Uspešno izmenjena porudžbina ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.radnikService.deleteRadnik(this.data.id);
    this.snackBar.open('Uspešno obrisana porudžbina ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

  compareTo(a: any, b: any) {
    return a.id === b.id;
  }

}
