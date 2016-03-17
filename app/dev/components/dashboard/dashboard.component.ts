import {Component, OnInit} from 'angular2/core';

import {Card} from '../../models/card';
import {CardService} from '../../services/card/card.service';
import {CardSummaryComponent} from '../card-summary/card-summary.component';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'dashboard.html',
    directives: [CardSummaryComponent]
})
export class DashboardComponent implements OnInit {
    public cards: Card[] = [];

    // constructor to inject the service
    constructor( private _cardService: CardService) { }

    // lifecycle hook to load data on init. We're just grabbing a subset of cards here.
    ngOnInit() {
        this._cardService.getCards()
            .then(cards => this.cards = cards.slice(0, 3));
    }
}