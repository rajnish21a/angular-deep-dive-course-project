import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

// import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  recipeChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(){
  }



  getRecipe(): Recipe[]{
    // this._dataStorageService.fetchRecipe().subscribe(
    //   (recipes:Recipe[])=>{
    //     this.recipes = recipes;
    //   }
    // );
    return this.recipes.slice();
  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipeById(id): Recipe{
    return this.getRecipe()[+id];
  }

  addRecipe(newRecipe: Recipe):void{
    this.recipes.push(newRecipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe):void{
    this.recipes[index]= newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index:number):void{
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

}
