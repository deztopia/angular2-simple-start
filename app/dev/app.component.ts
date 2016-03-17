import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from 'angular2/router';

import {CardService} from './services/card/card.service';
import {CardsComponent} from './components/cards/cards.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {CardDetailComponent} from './components/card-detail/card-detail.component';


@Component({
    selector: 'my-app',
    templateUrl: './app.html',
    styleUrls: ['./app.css'],
    directives: [ROUTER_DIRECTIVES],
    providers: [
        ROUTER_PROVIDERS,
        CardService
    ]
})
@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/cards/',
        name: 'Cards',
        component: CardsComponent
    },
    {
        path: '/detail/:id',
        name: 'CardDetail',
        component: CardDetailComponent
    }
])
export class AppComponent {
    public title = 'Simple Angular App';
}