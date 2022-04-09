class FeedsController < ApplicationController
  before_action :require_logged_in!

  LIMIT = 20

  def show
    limit_num = params[:limit] == "0" ? LIMIT : params[:limit].to_i
    @feed_tweets =
      current_user.feed_tweets(limit_num, params[:max_created_at]).includes(:user)
    respond_to do |format|
      format.html{render :show}
      format.json{render :show}
    end
    
  end
end
