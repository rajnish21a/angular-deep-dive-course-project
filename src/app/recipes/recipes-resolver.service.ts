import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from '../recipes/recipe.model';
import { DataStorageService } from "../Shared/data-storage.service";
import { RecipeService } from '../Shared/recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]> {
  constructor(private _dataStorageService:DataStorageService, private _recipeService: RecipeService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any{
    const recipes = this._recipeService.getRecipe();
    if(recipes.length === 0 ){
      return this._dataStorageService.fetchRecipe().subscribe();
    }else{
      return recipes;
    }
  }
}
