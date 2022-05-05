class Api::StepsController < ApplicationController
before_action :require_current_user!
    def index
        @steps = Step.all
        render json: @steps
    end

    def show
        @step = Step.find_by(id:params[:id])
        render json: @step
    end

    def create
        @step = Step.new(step_params)
        if @step.save
            render json: @step
        else
            render json: @step.errors.full_messages, status: 422
        end
    end

    def update
        @step = Step.find_by(id:params[:id])
        if @step.update(step_params)
            render json: @step
        else
            render json: @step.errors.full_messages, status: 422
        end
    end

    def destroy
        @step = Step.find_by(id:params[:id])
        if @step.destroy
            render json: @step
        else
            render json: @step.errors.full_messages, status: 422
        end
        
    end

    def step_params
        params.require(:step).permit(:title,:description,:done,:todo_id)
    end

end