import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-add-cat-subcat',
  templateUrl: './add-cat-subcat.component.html',
  styleUrls: ['./add-cat-subcat.component.css']
})
export class AddCatSubcatComponent implements OnInit {
  Categorys: any;
  category = new FormGroup({
    catName: new FormControl('', Validators.required)
  });

  subCategory = new FormGroup({
    catId: new FormControl('', Validators.required),
    subCatName: new FormControl('', Validators.required)
  });
  constructor(private aa : DashboardService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.aa.getCategory()
      .subscribe(
        response => {
          console.log(response);
          this.Categorys = response;
        },
        error => {
          console.log(error);
        });
  }

  createCategory(){
    this.aa.createCategory(this.category.value.catName)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });

  }

  createSubCategory(){
    
    this.aa.createSubCategory(this.subCategory.value.subCatName,this.subCategory.value.catId)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

}
