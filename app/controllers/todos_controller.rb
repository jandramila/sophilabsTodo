class TodosController < ApplicationController
    skip_before_action :verify_authenticity_token

    before_filter :fetch_todo, :except => [:index, :create]

    def fetch_todo
        @todo = Todo.find_by_id(params[:id])
    end

    def index
        @todos = Todo.all
        respond_to do |format|
          format.json { render json: @todos }
          format.xml { render xml: @todos }
        end
    end

    def create
        @newTodo = Todo.new do |t|
            t.name = params[:name]
        end
        respond_to do |format|
            if @newTodo.save
                format.json { render json: @newTodo, status: :created }
                format.xml { render xml: @newTodo, status: :created }
            else
                format.json { render json: @newTodo.errors, status: :unprocessable_entity }
                format.xml { render xml: @newTodo.errors, status: :unprocessable_entity }
            end
        end
    end

    def update
        respond_to do |format|
            if @todo.update(params.require(:todo).permit(:name, :done))
                format.json { head :no_content, status: :ok }
                format.xml { head :no_content, status: :ok }
            else
                format.json { render json: @todo.errors, status: :unprocessable_entity }
                format.xml { render xml: @todo.errors, status: :unprocessable_entity }
            end
        end
    end

    def destroy
        respond_to do |format|
            if @todo.destroy
                format.json { head :no_content, status: :ok }
                format.xml { head :no_content, status: :ok }
            else
                format.json { render json: @todo.errors, status: :unprocessable_entity }
                format.xml { render xml: @todo.errors, status: :unprocessable_entity }
            end
        end
    end
end
