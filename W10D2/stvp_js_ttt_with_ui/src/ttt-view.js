class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }
  
  
  bindEvents() {
    const $ul = $("ul");
    //highlight square
    $ul.on('mouseover', "li", (e) => {
      const $square = $(e.currentTarget);
      $square.addClass('yellow');
    })
    //unhighlight square
    $ul.on('mouseout',"li",(e)=>{
      const $square = $(e.currentTarget);
      $square.removeClass('yellow');
    });
    //make mark
    $ul.on('click',"li",(e)=>{
        const $square = $(e.currentTarget);
        this.makeMove($square)
    })
  }

  makeMove($square) {
    const $ul = $("ul");
    const pos = JSON.parse("[" + $square.data("pos") + "]");
    const mark = this.game.currentPlayer;
    try {
      this.game.playMove(pos);
      $square.addClass(mark);
    } catch (e) {
        alert(e.msg);
    }
    if(this.game.isOver()){
      if(this.game.winner()){
        let winner = this.game.winner();
        let looser;
        if(winner === 'x'){looser = 'o'}
        if (winner === 'o') { looser = 'x' }
        $(`li.${winner}`).addClass('winner')
        $(`li.${looser}`).addClass('looser')
        const $h1 = $(`<h1>the winner is ${this.game.winner()}<h1>`)
        $(".ttt").append($h1);
        $ul.off("click");
        $ul.off("mouseover")
      }else{
        $("li").addClass('looser');
        const $h1 = $(`<h1>Draw!<h1>`)
        $(".ttt").append($h1);
        $ul.off("click");
        $ul.off("mouseover")

      }
    }

  }

  setupBoard() {
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
      const $row = $('<ul>').addClass("row").addClass("group");
      for (let colIdx = 0; colIdx < 3; colIdx++) {
        const $square = $('<li>').addClass("square").attr("data-pos", [rowIdx, colIdx]);
        $row.append($square);
      }
      this.$el.append($row);
    }
  }
}

module.exports = View;
