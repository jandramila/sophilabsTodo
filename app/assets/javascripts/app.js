/**
*  Module
*
* Description
*/
angular.module('todoList', [
    'ui.router',
    'templates',
    'ui.bootstrap'
]).config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('list', {
                url: '/list',
                templateUrl: 'todos/_todos.html',
                controller: 'TodosCtrl'
            });

        $urlRouterProvider.otherwise('list');
    }
]);
