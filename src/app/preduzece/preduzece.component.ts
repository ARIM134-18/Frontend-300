import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { PreduzeceDialogComponent } from '../dialog/preduzece-dialog/preduzece-dialog.component';
import { Preduzece } from '../model/preduzece.model';
import { PreduzeceService } from '../service/preduzece.service';


@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'opis', 'pib', 'sediste', 'actions'];

  //dataSource!: Observable<Preduzece[]>;
  dataSource!: MatTableDataSource<Preduzece>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public preduzeceService: PreduzeceService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.preduzeceService.getAllpreduzece();
    this.preduzeceService.getAllPreduzece().subscribe( data => {
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

  public openDialog(flag: number, id: number, naziv: string, opis: string, pib: number, sediste: string) {
    const dialog = this.dialog.open(PreduzeceDialogComponent, {data: {id: id, naziv: naziv, opis: opis, pib: pib, sediste: sediste}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
