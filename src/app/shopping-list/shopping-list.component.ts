import { Component, OnInit, EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../Shared/shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  constructor(private _slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this._slService.getIngredients();
  }

  onIngredientAdded(data: Ingredient):void{
    this.ingredients.push(data);
    this._slService.ingredientChanged.subscribe((IngredientData:Ingredient[])=>{
      this.ingredients =IngredientData;
    });
  }

}
