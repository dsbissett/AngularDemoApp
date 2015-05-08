((): void => {
    'use strict';
    angular.module('app.dependencies', ['ngResource', 'LocalStorageModule', 'app.services', 'app.controllers']).config(config);

    config.$inject = ['localStorageServiceProvider'];
    function config(localStorageServiceProvider: ng.local.storage.ILocalStorageServiceProvider) {
        localStorageServiceProvider.setPrefix('demoPrefix');
    }
})();  