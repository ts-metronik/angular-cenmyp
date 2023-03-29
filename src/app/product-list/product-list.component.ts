import { Component } from '@angular/core';

import { products } from '../products';

const DEFAULT_COLORS = {
  mainColor: '#cccccc',
  secondaryColor: '#fd9a21',
  textColorGeneral: '#000000',
  textColorSecondary: '#FFFFFF',
  sidebarBackgroundColor: '#383E51',
  sidebarItemsColor: '#A4A6B3',
  sidebarItemsHoverColor: '#F688F21',
  sidebarSelectionBackgroundColor: '#575A6B',
  centralPanelWhiteBoardColor: '#FFFFFF',
  centralPanelBackgroundColor: '#F7F8FC',
  titleBackgroundSecondaryColor: '#F688F21',
  logoColorPrimary: '#F688F21',
  logoColorSecondary: '#cccccc',
  warningColor: '#FF0000',
};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  products = products;

  contentObj = {
    ...DEFAULT_COLORS,
    icon: null,
  };

  loaded = true;

  share() {
    window.alert('The product has been shared!');
  }
}
