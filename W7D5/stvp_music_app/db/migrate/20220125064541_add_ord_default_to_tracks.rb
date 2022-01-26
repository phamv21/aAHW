class AddOrdDefaultToTracks < ActiveRecord::Migration[6.1]
  def change
    change_column :tracks, :ord, :integer, default: 1
  end
end
