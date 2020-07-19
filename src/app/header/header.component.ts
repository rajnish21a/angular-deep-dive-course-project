import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _dataStorageService: DataStorageService) { }

  ngOnInit(): void {
  }

  onFetchRecipeList(){
    this._dataStorageService.fetchRecipe().subscribe();
  }

  onSaveRecipe(){
    this._dataStorageService.saveRecipe();
  }

}
