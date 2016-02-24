import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <p>
            This is a demo angular app
        </p>
    `
})
export class AppComponent {
    public title = 'Simple Angular App';
}