import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DataStorageService } from '../Shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
// import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSb:Subscription;
  isAuthenticated:boolean = false;

  constructor(private _dataStorageService: DataStorageService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.userSb = this._authService.user.subscribe(user=>{
      this.isAuthenticated = !!this.userSb;
      console.log(!user);
      console.log("isAuthenticared",!!user);
    });
  }

  onLogout(){
    this._authService.logout();
  }

  onFetchRecipeList(){
    this._dataStorageService.fetchRecipe().subscribe();
  }

  onSaveRecipe(){
    this._dataStorageService.saveRecipe();
  }

  ngOnDestroy(){
    this.userSb.unsubscribe();
  }

}
