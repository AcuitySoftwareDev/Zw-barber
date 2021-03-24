import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.page.html',
  styleUrls: ['./item-detail.page.scss'],
})
export class ItemDetailPage implements OnInit {
  product: any;
  public categories = [];
  public featuredProducts = [];
  public bestSellProducts = [];
  excludeCategories: any = [];

  constructor
    (
      private data: DataService,
  ) { }

  ngOnInit() {
  }

}
