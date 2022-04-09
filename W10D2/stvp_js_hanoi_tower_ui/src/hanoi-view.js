const Game = require('./game.js');

class HanoiView {
    constructor(game,$el){
        this.game = game;
        this.$el = $el;
        this.renderTower();
        this.bindEvent();
    }
    renderTower(){
        let towers = this.game.towers;
        //reset before build
        this.$el.find("ul").remove();
        //
        for(let i = 0; i < 3; i++ ){
            const $ul = $("<ul>").attr('data-towerid',i);
            for(let j = 2; j >= 0; j--){
                const $li = $("<li>")
                if(towers[i][j] != undefined){
                    $li.addClass(`num-${towers[i][j]}`);
                } 
                $ul.append($li) 
            }
            this.$el.append($ul);
        }
    }

    bindEvent(){
        // play script
        let handle = this.handleEvent();
        this.$el.on("click","ul",(e)=>{
            const $ul = $(e.currentTarget);
            const towerId = $ul.data('towerid');
            $ul.addClass('selected');
            handle = handle(parseInt(towerId));
        })

    }
    //triggle when privided 2 args
    handleEvent() {
        let args = [];
        let that = this;
        function loopStep(pos){
            if(pos !== undefined){args.push(pos)}
            if(args.length === 2){
                that.triggleEvent(args[0],args[1])
                console.log(args);
                args =[];
            }
            return loopStep;
        }
    return loopStep();
        
    } 

    triggleEvent(startPos,endPos){
        if (!this.game.isValidMove(startPos, endPos)){
            alert("invalid Move!")
            this.renderTower();
        }else{
            this.game.move(startPos,endPos)
            this.renderTower();
            if (this.game.isWon()) { 
                const $h3 = $("<h3>Congratulation, you have won!</h3>");
                this.$el.append($h3);
                this.$el.off("click");
            }
        }

    }

}

module.exports = HanoiView;