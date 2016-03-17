import {Component, OnInit} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Card} from '../../models/card';
import {CardService} from '../../services/card/card.service';

@Component({
    selector: 'my-card-detail',
    templateUrl: './card-detail.html'
})
export class CardDetailComponent implements OnInit {
    public card: Card;

    constructor(
        private _cardService: CardService,
        private _routeParams: RouteParams) {}

    ngOnInit() {
        let id = +this._routeParams.get('id');
        this._cardService.getCard(id)
            .then(card => this.card = card);
    }
}