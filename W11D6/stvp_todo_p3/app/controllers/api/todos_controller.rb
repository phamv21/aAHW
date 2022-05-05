class Api::TodosController < ApplicationController
    before_action :require_current_user!
    def show
      render json: current_user.todos.find_by(id:params[:id])
    end

    def index
        render json: current_user.todos
    end

    def create
      @todo = current_user.todos.new(todo_params)
      if @todo.save
        render json: @todo,include: :tags
      else
        render json: @todo.errors.full_messages, status: 422
      end
    end

    def update
        @todo = current_user.todos.find_by(id:params[:id])
        if @todo.update(todo_params)
            render json: @todo, include: :tags
        else
            render json: @todo.errors.full_messages, status: 422
        end
    end

    def destroy
        @todo = current_user.todos.find_by(id:params[:id])
        if @todo.destroy
            render json: @todo,include: :tags
        else
            render json: @todo.errors.full_messages, status: 422
        end
    end

    def todo_params
        params.require(:todo).permit(:title,:body,:done,:tag_names=>[])
    end
end