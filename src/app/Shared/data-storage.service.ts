import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map,tap } from 'rxjs/Operators';


@Injectable({providedIn: 'root'})
export class DataStorageService{
  recipes:Recipe[];

 constructor(private http:HttpClient, private _recipeService:RecipeService){ }

  saveRecipe(){
    this.recipes =  this._recipeService.getRecipe();
    this.http.put('https://ng-course-recipe-book-b185b.firebaseio.com/recipes.json',this.recipes).subscribe(
      (response)=>{
        console.log(response);
      }
    )
  }

  fetchRecipe(){
    return this.http.get<Recipe[]>('https://ng-course-recipe-book-b185b.firebaseio.com/recipes.json')
    .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe:Recipe)=>{
            return {
              ...recipe,
              ingredients : recipe.ingredients  ?  recipe.ingredients : []
            }
          })
        }),
        tap(
          (recipes: Recipe[]) => {
            this._recipeService.setRecipes(recipes);
          }
        )
    )
  }

}


