import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/Shared/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeS: Recipe;
  id:number;
  constructor(private route:ActivatedRoute, private _rcpService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.recipeS = this._rcpService.getRecipeById(this.route.snapshot.params['id']);
    this.route.params.subscribe((param:Params)=>{
      this.id = +param['id'];
      this.recipeS = this._rcpService.getRecipeById(this.id);
    })
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  onDeleteRecipe(): void{
    this._rcpService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }



}
