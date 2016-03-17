import {Component, OnInit} from 'angular2/core';
import {Router} from 'angular2/router';

import {Card} from '../../models/card';

@Component({
    selector: 'my-card-summary',
    templateUrl: './card-summary.html',
    styleUrls: ['./card-summary.css'],
    inputs: ['card']
})
export class CardSummaryComponent {
    // constructor to inject the service
    constructor(private _router: Router) { }

    gotoCard(card: Card) {
        let link = ['CardDetail', {id: card.id}];
        this._router.navigate(link);
    }
}