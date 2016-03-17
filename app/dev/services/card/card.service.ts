import {Injectable} from 'angular2/core';
import {CARDS} from './mock-cards';

@Injectable()
export class CardService {
    getCards() {
        // mock a server call for now
        return Promise.resolve(CARDS);
    }

    getCard(id: number) {
        // mock server call for now
        return Promise.resolve(CARDS)
            .then(
                cards => cards.filter(card => card.id === id)[0]
            );
    }
}