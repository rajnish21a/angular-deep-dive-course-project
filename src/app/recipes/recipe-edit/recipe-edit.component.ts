import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/Shared/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  recipes: Recipe[];

  constructor(
    private route: ActivatedRoute,
    private _recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log(this.editMode);
      this.initForm();
    });

    this.recipes = this._recipeService.getRecipe();

    this._recipeService.recipeChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDesc = '';
    let recipeIngredients: FormArray = new FormArray([]);
    if (this.editMode) {
      const recipe = this._recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDesc = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name,Validators.required),
              amount: new FormControl(ingredient.amount,[Validators.pattern(/^[1-9]+[0-9]*$/),Validators.required]),
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName,Validators.required),
      imagePath: new FormControl(recipeImagePath,Validators.required),
      desc: new FormControl(recipeDesc,Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onAddIngredients() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null,Validators.required),
        amount: new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['desc'],
    //   this.recipeForm.value['ingredients']
    // );


    console.log(this.recipeForm);
    if(this.editMode){
      this._recipeService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this._recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();

  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onCancel(): void{
    this.router.navigate(['../'], {relativeTo: this.route});
  }


  onIngredientDelete(index:number):void{
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);
  }

}
