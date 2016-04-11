angular.module('todoList').
controller('TodosCtrl', ['$scope', 'todos', function($scope, todos){
    $scope.httpRequestOnCourse = false;
    $scope.errorMessage = null;
    $scope.editing = false;

    $scope.fetchTodos = function(){
        $scope.httpRequestOnCourse = true;
        todos.getTodos().then(function(todos){
            $scope.todos = todos;
            $scope.httpRequestOnCourse = false;
        }, function(errorMessage){
            $scope.errorMessage = errorMessage;
        });
    }

    $scope.createTodo = function(newTodo){
        $scope.httpRequestOnCourse = true;
        todos.createTodo(newTodo).then(function(response){
            if(response && response.status < 299){
                $scope.todos.push(response.data);
            }else{
                $scope.errorMessage = response.data;
            }
            $scope.httpRequestOnCourse = false;
        }, function(errorResponse){
            $scope.errorMessage = errorResponse.data;
        });
    }

    $scope.updateTodo = function(todo){
        $scope.httpRequestOnCourse = true;
        todos.updateTodo(todo).then(function(response){
            if(response && response.status >= 299){
                $scope.errorMessage = response.data;
            }
            todo.editing = false;
            $scope.httpRequestOnCourse = false;
            $scope.editing = false;
        }, function(errorResponse){
            $scope.errorMessage = errorResponse.data;
        });
    }

    $scope.deleteTodo = function(todo){
        $scope.httpRequestOnCourse = true;
        todos.deleteTodo(todo).then(function(response){
            if(response && response.status < 299){
                for (var i = 0; i < $scope.todos.length; i++) {
                    if($scope.todos[i].id === todo.id){
                        $scope.todos.splice(i,1);
                        break;
                    }
                }
            }else{
                $scope.errorMessage = response.data;
            }
            $scope.httpRequestOnCourse = false;
        }, function(errorResponse){
            $scope.errorMessage = errorResponse.data;
        });
    }

    $scope.editTodo = function(todo){
        $scope.editing = true;
        todo.editing = true;
    }

    $scope.fetchTodos();
}]);
