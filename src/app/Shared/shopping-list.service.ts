import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientChanged= new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apple',5),
    new Ingredient('Tomatoes',10)
  ];
  startedEditing = new Subject<number>();


  getIngredients(): Ingredient[]{
    return this.ingredients.slice();
  }

  getIngerdient(index:number): Ingredient {
    return this.ingredients[index];
  }

  updateIngredient(index:number, newIngredient: Ingredient){
    this.ingredients[index]= newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredient(ingredientData: Ingredient): void{
    this.ingredients.push(ingredientData);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index:number):void{
    this.ingredients.splice(index,1);
  }
}
