import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Preduzece } from 'src/app/model/preduzece.model';
import { PreduzeceService } from 'src/app/service/preduzece.service';


@Component({
  selector: 'app-preduzece-dialog',
  templateUrl: './preduzece-dialog.component.html',
  styleUrls: ['./preduzece-dialog.component.css']
})
export class PreduzeceDialogComponent implements OnInit {

  public flag!: number;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PreduzeceDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Preduzece,
    public preduzeceService: PreduzeceService ) { }

  ngOnInit(): void {
  }

  public add(): void {
    this.preduzeceService.addPreduzece(this.data);
    this.snackBar.open('Uspešno dodato preduzece ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public update(): void {
    this.preduzeceService.updatePreduzece(this.data);
    this.snackBar.open('Uspešno izmenjeno preduzece ' + this.data.naziv, 'Uredu', {duration: 2000});
  }

  public delete(): void {
    this.preduzeceService.deletePreduzece(this.data.id);
    this.snackBar.open('Uspešno obrisano preduzece ' + this.data.id, 'Uredu', {duration: 2000});
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Uredu', {duration: 2000});
  }

}
