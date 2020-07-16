import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from '../Shared/shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  igChangeSub: Subscription;
  constructor(private _slService:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this._slService.getIngredients();
    this.igChangeSub = this._slService.ingredientChanged.subscribe((IngredientData:Ingredient[])=>{
      this.ingredients =IngredientData;
    });
  }

  onIngredientAdded(data: Ingredient):void{
    this.ingredients.push(data);

  }


  onEditItem(index:number):void{
    this._slService.startedEditing.next(index);
  }

  ngOnDestroy():void{
    this.igChangeSub.unsubscribe();
  }

}
