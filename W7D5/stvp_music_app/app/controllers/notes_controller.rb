class NotesController < ApplicationController
    before_action :ensure_current_user
    before_action :ensure_active_user
def new
    @track = Track.find_by(id:params[:track_id])
    @note = Note.new
    #render :new
end

def create
    @track = Track.find_by(id:params[:track_id])
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    @note.track_id = params[:track_id]
    if @note.save
        redirect_to track_url(@track)

    else
        flash[:error] = @note.errors.full_messages
        #render :new
    end
end

def show
    @track = Track.find_by(id:params[:track_id])
    @notes = @track.notes
    
    #render :show
end
def destroy
    @note = Note.find_by(id:params[:id])
    @track = @note.track
    if @note.destroy
        redirect_to track_url(@track)    
    else
        flash[:error]= @note.errors.full_messages
        render text: "I found you hacker"
    end
    
end

private
def note_params
    params.require(:note).permit(:note)
end

end