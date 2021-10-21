require "io/console"
require 'colorize'

KEYMAP = {
  " " => :space,
  "h" => :left,
  "j" => :down,
  "k" => :up,
  "l" => :right,
  "w" => :up,
  "a" => :left,
  "s" => :down,
  "d" => :right,
  "\t" => :tab,
  "\r" => :return,
  "\n" => :newline,
  "\e" => :escape,
  "\e[A" => :up,
  "\e[B" => :down,
  "\e[C" => :right,
  "\e[D" => :left,
  "\177" => :backspace,
  "\004" => :delete,
  "\u0003" => :ctrl_c,
}

MOVES = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0]
}

class Cursor

  attr_reader :cursor_pos, :board, :select

  def initialize(cursor_pos, board)
    @cursor_pos = cursor_pos
    @board = board
    @select = false
  end

  def get_input
    key = KEYMAP[read_char]
    handle_key(key)
  end

  private

  def read_char
    STDIN.echo = false # stops the console from printing return values

    STDIN.raw! # in raw mode data is given as is to the program--the system
                 # doesn't preprocess special characters such as control-c

    input = STDIN.getc.chr # STDIN.getc reads a one-character string as a
                             # numeric keycode. chr returns a string of the
                             # character represented by the keycode.
                             # (e.g. 65.chr => "A")

    if input == "\e" then
      input << STDIN.read_nonblock(3) rescue nil # read_nonblock(maxlen) reads
                                                   # at most maxlen bytes from a
                                                   # data stream; it's nonblocking,
                                                   # meaning the method executes
                                                   # asynchronously; it raises an
                                                   # error if no data is available,
                                                   # hence the need for rescue

      input << STDIN.read_nonblock(2) rescue nil
    end

    STDIN.echo = true # the console prints return values again
    STDIN.cooked! # the opposite of raw mode :)

    return input
  end

  def handle_key(key)
    if MOVES.has_key?(key)
         diff = MOVES[key] 
         update_pos(diff)
    end

    case key
    when :return
        toggle_selected
    when :space
        toggle_selected
    when :ctrl_c
        exit(0)
    end
  end

  def toggle_selected
    @select = select ? false : true
    cursor_pos
  end

  def update_pos(diff)
    #board[@cursor_pos].cursor_color  = :white
    c,r = cursor_pos
    x,y = diff
    raw_c = c + x
    raw_r = r + y
    new_c = raw_c.between?(0,7) ? raw_c : parse(raw_c)
    new_r = raw_r.between?(0,7) ? raw_r : parse(raw_r)

    @cursor_pos = [new_c,new_r]
    #@board[@cursor_pos].cursor_color = :red 
    nil
  end

  def parse(num)
      result = 0
      result = num < 0 ? (num + 8) : (num - 8)
  end

end