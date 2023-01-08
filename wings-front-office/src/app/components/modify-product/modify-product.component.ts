import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from 'src/app/_service/shop.service';
import { TokenStorageService } from 'src/app/_service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modify-product',
  templateUrl: './modify-product.component.html',
  styleUrls: ['./modify-product.component.css']
})
export class ModifyProductComponent implements OnInit {
  addr: number = 0;
  item :any;
  currentUser: any;
  currentCard: any;
  currentProduct : any;
  produit: any = {
    name: '',
    slug: '',
    sku: '',
    brand: '',
    details: '',
    model: '',
    totalStock: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    color: '',
    price: '',
    cardId: '',
    categoryId: '',
    subCategoryId: '',
  };
  submitted = false;
  desc: string = '';
  quant: string = '';
  Categorys: any;
  SubCategorys: any;

  ngCategorys: any;
  ngSubCategorys: any;


  constructor(private route: ActivatedRoute,
    private router: Router,private token: TokenStorageService, private shopeService: ShopService) { }
  fileI: File | any;
  fileII: File | any;
  fileIII: File | any;
  fileIIII: File | any;

  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;

  ngOnInit(): void {
    this.loadJsFile("assets/js/dropdown.js");
    this.loadJsFile("assets/js/uploadimg.js");
    this.currentUser = this.token.getUser();
    this.item = this.route.snapshot.paramMap.get('id');
    this.getProductById();
    this.getCategory();
    this.getCardId();

  }
  public loadJsFile(url: string) {
    let node = document.createElement('script');
    node.src = url;
    node.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(node);
  }
  add() {
    this.addr = parseFloat((<HTMLInputElement>document.getElementById("numb")).value) + 1;
    const aa = this.addr.toString()
    this.produit.totalStock = aa
    console.log(this.addr);
  }
  addnt() {
    this.addr = parseFloat((<HTMLInputElement>document.getElementById("numb")).value) - 1;
    const aa = this.addr.toString()
    this.produit.totalStock = aa

    console.log(this.addr);
  }
  remark(event: any) {
    this.desc = event.target.value;
    this.produit.details = this.desc
  }
  qut(event: any) {
    this.quant = event.target.value;
    this.produit.totalStock = this.quant
  }


  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
      this.fileI = this.selectedFiles[0];
      this.fileII = this.selectedFiles[1];
      this.fileIII = this.selectedFiles[2];
      this.fileIIII = this.selectedFiles[3];
    }
  }
  /*******************************/
  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.selectedFiles[i]
      }
    }
  }
  /********************************** */
  saveproduit(): void {
    console.log(this.produit);
    console.log(this.fileI);
    console.log(this.fileII);
    console.log(this.fileIII);
    console.log(this.fileIIII);
    const data = {
      name: this.produit.name,
      slug: this.produit.slug,
      sku: this.produit.sku,
      details: this.produit.details,
      model: this.produit.model,
      totalStock: this.produit.totalStock,
      weight: this.produit.weight,
      length: this.produit.length,
      width: this.produit.width,
      height: this.produit.height,
      color: this.produit.color,
      price: this.produit.price,
      cardId: this.currentCard,
      categoryId: this.produit.categoryId,
      subCategoryId: this.produit.subCategoryId,
    };
    console.log(data);
    this.shopeService.updateProduct(this.item,data,this.fileI,this.fileII,this.fileIII,this.fileIIII)
      .subscribe(
        response => {
          Swal.fire(
            'Bien!',
            'Votre produit est modifier!',
            'success'
          )
        },
        error => {
          if(error.status == "201"){
            Swal.fire(
              'Bien!',
              'Votre produit est enregistrée!',
              'success'
            )
          }else{
            Swal.fire(
              'Oops!',
              "Votre produit n'a pas pu être modifier, veuillez vérifier vos informations!",
              'error'
            )
          }
        });

  }


  getCardId() {
    this.shopeService.getCardId(this.currentUser.id)
      .subscribe(
        response => {
          console.log(response);
          this.currentCard = response;
        },
        error => {
          console.log(error);
        });
  }

  getCategory() {
    this.shopeService.getCategory()
      .subscribe(
        response => {
          console.log(response);
          this.Categorys = response;
        },
        error => {
          console.log(error);
        });
  }

  selectChangeHandler(event: any) {
    this.shopeService.getSubCategoryByCategory(event.target.value)
      .subscribe(
        data => {
          console.log(data);
          this.SubCategorys = data;
        });
  }


  getProductById() {
    this.shopeService.getProComByProId(this.item)
      .subscribe(
        data => {
          console.log(data);
          this.currentProduct = data;
          this.produit.name = data.product.name;
          this.produit.slug = data.product.slug;
          this.produit.sku = data.sku;
          this.produit.model = data.model;
          this.produit.brand = data.product.brand;
          this.produit.details = data.product.details;
          this.addr = data.productStock;
          this.produit.weight = data.weight;
          this.produit.length = data.length;
          this.produit.width = data.width;
          this.produit.height = data.height;
          this.produit.color = data.color;
          this.produit.price = data.price;
          this.previews.push(data.product.picture1);
          this.previews.push(data.product.picture2);
          this.previews.push(data.product.picture3);
          this.previews.push(data.product.picture4);
          this.ngCategorys = data.product.category.categoryName;

        });
  }





}
