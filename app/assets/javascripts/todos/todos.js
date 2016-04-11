angular.module('todoList')
.factory('todos', ['$http', function($http){
    var todos = undefined;

    return {
        getTodos : function(){
            var promise = $http({
                method: 'GET',
                url: '/api/todos.json'
            }).then(function(response){
                return response.data;
            }, function(errorResponse){
                console.log(errorResponse)
            });

            return promise;
        },

        createTodo : function(newTodo){
            var promise = $http({
                method: 'POST',
                url: '/api/todos.json',
                data: newTodo
            }).then(function(response){
                return response;
            }, function(errorResponse){
                console.log(errorResponse)
                return errorResponse;
            });

            return promise;
        },

        updateTodo : function(todo){
            var promise = $http({
                method: 'PUT',
                url: '/api/todos/'+todo.id+'.json',
                data: {
                    'todo': todo
                }
            }).then(function(response){
                return response;
            }, function(errorResponse){
                console.log(errorResponse)
                return errorResponse;
            });

            return promise;
        },

        deleteTodo : function(todo){
            var promise = $http({
                method: 'DELETE',
                url: '/api/todos/'+todo.id+'.json'
            }).then(function(response){
                return response;
            }, function(errorResponse){
                console.log(errorResponse)
                return errorResponse
            });

            return promise;
        }

    };
}])
