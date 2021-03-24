import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.page.html',
  styleUrls: ['./see-all.page.scss'],
})
export class SeeAllPage implements OnInit {
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  excludeCategories: any = [];


  ads = [];
  constructor
    (
      private data: DataService,
      private router: Router) { }

  ngOnInit() {
  }

}
