import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../../Shared/ingredient.model';
import { ShoppingListService } from '../../Shared/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;
  @ViewChild('#f') slForm:NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex:number;
  editedItem:Ingredient;
  constructor(private _slService:ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this._slService.startedEditing.subscribe(index=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this._slService.getIngerdient(this.editedItemIndex);
      this.slForm.setValue({
        name:this.editedItem.name,
        amount:this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onIngredientAdd(form:NgForm): void{
    //this.ingredientAdded.emit(new Ingredient(this.nameInputRef.nativeElement.value , this.amountInputRef.nativeElement.value));
    //this._slService.addIngredient(new Ingredient(this.nameInputRef.nativeElement.value , this.amountInputRef.nativeElement.value));
    const value = form.value;
    const newIngredient = new Ingredient(value.name , value.amount);
    if(this.editMode){
      this._slService.updateIngredient(this.editedItemIndex,newIngredient)
    }

    this._slService.addIngredient(newIngredient);
    this.editMode = false;
    form.reset();
  }

  onClear(): void{
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(): void{
    this._slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

}
