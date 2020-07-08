import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../Shared/ingredient.model';
import { ShoppingListService } from '../../Shared/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;
  constructor(private _slService:ShoppingListService) { }

  ngOnInit(): void {
  }

  onIngredientAdd(): void{
    //this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value , this.amountInputRef.nativeElement.value));
    this._slService.addIngredient(new Ingredient(this.nameInputRef.nativeElement.value , this.amountInputRef.nativeElement.value));
  }

}
