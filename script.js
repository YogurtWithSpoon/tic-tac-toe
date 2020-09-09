window.load = init();
function init(){
    let display = {
        cross: function(event){
            if (!event.target.classList.contains('element')){
            event.target.innerHTML = '<i class="fas fa-times x element"></i>'
            }
        },
        circle: function(event){
            if (!event.target.classList.contains('element')){
            event.target.innerHTML = '<i class="far fa-circle o element"></i>'
            }
        },
        step: function(){
            let field;
            let opField;
            if(logic.status == 'cross'){
                field = document.querySelector('.cross > .step');
                opField = document.querySelector('.circle > .step');
            } else{
                field = document.querySelector('.circle > .step')
                opField = document.querySelector('.cross > .step');
            }
            field.style.display = "none";
            opField.style.display = 'inline-block'
        },
        clearAll:function(){
            const fields = document.querySelectorAll('td');
            for(field of fields){
                field.innerHTML = '';
            }
            document.querySelector('.cross > .step').style.display = 'inline-block';
            document.querySelector('.circle > .step').style.display = 'none';
        },
        winner:function(winner){
            const result = document.querySelector('.result');
            result.textContent = winner;
        },
        addWin: function(element,result){
            const score = document.querySelector(element+' span');
            score.textContent = result;
        },
        toggleBlock: function(){
            const field  = document.querySelector('table');
            field.classList.toggle('blocked');
        }
    };

    let logic = {
        winCircle:0,
        winCross:0,
        step: 0,
        status: 'cross',
        winCheck: function(){
        },
        field:{
            id11:'',id12:'',id13:'',
            id21:'',id22:'',id23:'',
            id31:'',id32:'',id33:''
        },
        makeStep: function(event){
            const fieldId = event.target.id;
            display.step();
            if(this.field[fieldId]==''){ 
                this.field[fieldId] = this.status;

                if(this.status == 'circle'){
                    display.circle(event);
                } else{
                    display.cross(event);
                }
                if(this.status == 'circle'){
                    this.status = 'cross'
                } else {
                    this.status = 'circle'
                };
                this.step++;
                this.endGame();
            } 
        },
        endGame: function(){
            if(this.endCondition('circle')){
                display.winner('Победили Нолики');
                ++this.winCircle;
                display.addWin('.circle',this.winCircle)
                display.toggleBlock();
                setTimeout(this.cleaning.bind(logic),3000);
            } else if (this.endCondition('cross')){
                display.winner('Победили Крестики');
                ++this.winCross;
                display.addWin('.cross',this.winCross)
                display.toggleBlock();
                setTimeout(this.cleaning.bind(logic),3000);
            } else if (this.step == 9){
                display.winner('Ничья');
                display.toggleBlock();
                setTimeout(this.cleaning.bind(logic),3000);
            }
        },
        endCondition: function(element){
            if((this.field.id11 == element && this.field.id12 == element && this.field.id13 == element) ||
            (this.field.id21 == element && this.field.id22 == element && this.field.id23 == element) ||
            (this.field.id31 == element && this.field.id32 == element && this.field.id33 == element) ||
            (this.field.id11 == element && this.field.id21 == element && this.field.id31 == element) ||
            (this.field.id12 == element && this.field.id22 == element && this.field.id32 == element) ||
            (this.field.id13 == element && this.field.id23 == element && this.field.id33 == element) ||
            (this.field.id11 == element && this.field.id22 == element && this.field.id33 == element) ||
            (this.field.id13 == element && this.field.id22 == element && this.field.id31 == element)){
                return true;
            }
        },
        cleaning: function(){
            display.winner('');
            this.clearLogic();
            this.step = 0;
            display.clearAll();
            display.toggleBlock();
        },
        clearLogic:function(){
            for(item in this.field){
                this.field[item] = '';
            }
            this.status = 'cross';
        },
        win: {
            circle:0,
            cross: 0
        }
    }

    const fields = document.querySelectorAll('td')
    for (field of fields){
        field.addEventListener('click',logic.makeStep.bind(logic));
    }
};
