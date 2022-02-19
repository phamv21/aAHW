class PostsController < ApplicationController
    before_action :require_current_user!, except: [:show]
    def show
        @post = Post.find_by(id:params[:id])
        @all_comments = @post.comment_by_parent_id
        @vote_of_comments = @post.vote_of_comment_by_post
        @my_vote = @post.my_vote
        
        render :show
    end
    
    def new
        @post = Post.new
        @subs = Sub.all
        render :new
    end

    def create
        @post = Post.new(post_params)
        @post.author = current_user
       if @post.save
           flash[:notice] = ["successful created the post"]
           redirect_to post_url(@post)
       elsif 
           flash[:errors] = @post.errors.full_messages
           render :new
       end
    end

    def edit
        @post = Post.find_by(id:params[:id])
        @subs = Sub.all

         unless @post.author == current_user
            redirect_to post_url(@post)
         else
            render :edit
         end

    end

    def update
         
        @post = Post.find_by(id:params[:id])
        if @post.update(post_params)
            flash[:notice] = ["Successfully update"]
            redirect_to post_url(@post)
        else
            flash[:errors] = @post.errors.full_messages
            render :edit
        end
    end

    def upvote
        @post = Post.find_by(id:params[:id])
        current_user.upvote(@post)
        redirect_to post_url(@post)
    end

    def downvote
        @post = Post.find_by(id:params[:id])
        current_user.downvote(@post)
        redirect_to post_url(@post)
    end


    private
    def post_params
        params.require(:post).permit(:title,:url,:content,sub_ids:[])
    end
    

end