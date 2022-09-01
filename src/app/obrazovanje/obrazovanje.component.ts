import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ObrazovanjeDialogComponent } from '../dialog/obrazovanje-dialog/obrazovanje-dialog.component';
import { Obrazovanje } from '../model/obrazovanje.model';
import { ObrazovanjeService } from '../service/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje', //preko ovoga mozemo da je ugnjezdimo u neku drugu komponentu (u okviru HTML-a komponente u koju zelimo da je ugnjezdimo)
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'stepenStrucneSpreme', 'actions']; //niz kolona koje hocemo u nasoj tabeli koja se prikazuje na web-u

  //dataSource!: Observable<Obrazovanje[]>;
  dataSource!: MatTableDataSource<Obrazovanje>; //odakle uzimamo podatke -- objekti tipa Obrazovanje(iz modula) -- MatTableDataSource mora bitit importovamn u app module da moze da ga koristi svaka komponenta

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public ObrazovanjeService: ObrazovanjeService,  //DI
    public dialog: MatDialog) { } //dodali smo matdialog

  ngOnInit(): void { //kad se ucita da automatski dobijemo podatke sa baze podataka, za to nam treba medju sloj a to je servis -- servisne klase!
    this.loadData();  //sta zelimo da se ucita kad preko servisa pristupimo URL-u
  }

  public loadData(){
    //this.dataSource = this.ObrazovanjeService.getAllObrazovanje();
    this.ObrazovanjeService.getAllObrazovanje().subscribe( data => { //pozivam metode iz servisa
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
 //prosledjen klikom na dugme +   //ostali parametri
  public openDialog(flag: number, id: number, naziv: string, opis: string, stepenStrucneSpreme: string) { //metoda za dialog, flag se aktivira klikom na dugme + -- ako hocemo da neki parametar bude neobavezan stavimo? pored toga npr id?
    const dialog = this.dialog.open(ObrazovanjeDialogComponent, {data: {id: id, naziv: naziv, opis: opis, stepenStrucneSpreme: stepenStrucneSpreme}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => { //sta se desava kad zatvorimo dialog
      if (result === 1) {
        this.loadData(); // da se nakon dodavanja prikazu ponovo svi podaci tabele
      }
    })
  }


  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
