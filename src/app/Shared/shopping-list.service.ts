import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientChanged= new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('Tomatoes',10)
  ];


  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }


  addIngredient(ingredientData: Ingredient): void{
    this.ingredients.push(ingredientData);
    this.ingredientChanged.emit(this.ingredients.slice());
  }
}
