import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpParams } from '@angular/common/http';

import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map,tap, take, exhaustMap } from 'rxjs/Operators';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';


@Injectable({providedIn: 'root'})
export class DataStorageService{
  recipes:Recipe[];
  user= new BehaviorSubject<any>(null);
 constructor(private http:HttpClient, private _recipeService:RecipeService, private _authService: AuthService){ }

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
        return recipes.map((recipe: Recipe) => {
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
    );
  }

}


