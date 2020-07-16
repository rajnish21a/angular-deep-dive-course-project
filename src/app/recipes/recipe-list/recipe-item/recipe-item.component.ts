import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from 'src/app/Shared/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('getRecipe') recipe: Recipe;
  @Input() index:number;
  constructor(private _recipeService: RecipeService ) { }

  ngOnInit(): void {
  }

  onSelected(): void{
    //this._recipeService.recipeSelected.emit(this.recipe);
  }

}
