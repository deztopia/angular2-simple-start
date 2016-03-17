import {Component, OnInit} from 'angular2/core';
import {Card} from '../../models/card';
import {CardService} from '../../services/card/card.service';
import {CardSummaryComponent} from '../card-summary/card-summary.component';

@Component({
    selector: 'my-cards',
    templateUrl: './cards.html',
    styleUrls: ['./cards.css'],
    directives: [CardSummaryComponent]
})
export class CardsComponent implements OnInit {
    public selectedCard: Card;
    public cards: Card[];

    // constructor to inject the service
    constructor(private _cardService: CardService) {}

    getCards() {
        this._cardService.getCards()
            .then(cards => this.cards = cards);
    }

    // lifecycle hook to load data on init
    ngOnInit() {
        this.getCards();
    }

    // called from the UI whenever a card is selected from the list
    public onSelect(card: Card) {
        this.selectedCard = card;
        return false;
    }

}