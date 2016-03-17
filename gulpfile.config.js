'use strict';

var GulpConfig = (function () {
    function gulpConfig() {
        this.source = './app/dev/';
        this.global = './app/global/';
        this.dist = './app/dist/';
        this.nodeRoot = './node_modules/';

        // source files
        this.allTypeScript = [
            'typings/main.d.ts',
            this.source + '**/*.ts'
        ];
        this.tsOutputPath = this.dist + 'js';

        // styles and templates
        this.allHtml = this.source + '**/*.html';
        this.componentSass = this.source + '**/*.scss';
        this.componentCssOutputFiles = this.source + '**/*.css';
        this.globalSass = this.global + 'scss/**/*.scss';
        this.globalCssOutputPath = this.dist + 'css';

        // define 3rd party JS libraries
        this.libFilesJS = [
            this.nodeRoot + 'angular2/bundles/angular2-polyfills.js',
            this.nodeRoot + 'systemjs/dist/system.src.js',
            this.nodeRoot + 'rxjs/bundles/Rx.js',
            this.nodeRoot + 'angular2/bundles/angular2.js',
            this.nodeRoot + 'angular2/bundles/router.js'
        ];
        this.libOutputPath = this.dist + 'js';
    }
    return gulpConfig;
})();

module.exports = GulpConfig;