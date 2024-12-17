import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-list-magasins',
  templateUrl: './list-magasins.component.html',
  styleUrls: ['./list-magasins.component.scss']
})
export class ListMagasinsComponent {

  @Input() stores!: any[];

}
