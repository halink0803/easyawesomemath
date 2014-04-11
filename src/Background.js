/**
 * Created by HaLink0803 on 4/8/2014.
 */

var Background = cc.LayerColor.extend ({

    expression : null,
    currentScore : null,

    ctor: function(){
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        var red = cc.c3b(230, 44, 25);
        this.setColor(red);
        var winsize = cc.Director.getInstance().getWinSize();

        var rightBtn = cc.Sprite.create(s_rightButton);
        var rightBtnHover = cc.Sprite.create(s_rightHover);

        var wrongBtn = cc.Sprite.create(s_wrongButton);
        var wrongBtnHover = cc.Sprite.create(s_wrongHover);

        var menuButtonRight = cc.MenuItemSprite.create(rightBtn, rightBtnHover, null, this.rightClick, this);
        menuButtonRight.setPosition(cc.p(winsize.width/2 - 150, rightBtn.getContentSize().height/2));

        var menuButtonWrong = cc.MenuItemSprite.create(wrongBtn, wrongBtnHover, null, this.wrongClick, this);
        menuButtonWrong.setPosition(cc.p(winsize.width/2 + 150, wrongBtn.getContentSize().height/2));

        var menu = cc.Menu.create();
        menu.addChild(menuButtonRight, 1);
        menu.addChild(menuButtonWrong, 1);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 1);

        g_firstNumber = Math.floor((Math.random()*10)+1);
        g_secondNumber = Math.floor((Math.random()*10) + 1);
        var sum = g_firstNumber + g_secondNumber;
        g_sumResult = Math.floor(Math.random()*6 + (sum -1));

        var exp = g_firstNumber.toString()+ " + " + g_secondNumber.toString() + "\n"
            +"= " + g_sumResult.toString();
        exp.toUpperCase();
        this.expression = cc.LabelTTF.create(exp, "Arial", 50);
        this.expression.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(this.expression);

        this.currentScore = cc.LabelTTF.create("0", "Arial", 50);
        this.currentScore.setPosition(cc.p());
        this.addChild(this.currentScore);
    },
    changeColor:function(){
        var num = Math.floor((Math.random()*4));
        this.setColor(g_color[num]);
    },
    changeExpression: function(){
        g_firstNumber = Math.floor((Math.random()*10)+1);
        g_secondNumber = Math.floor((Math.random()*10) + 1);
        var sum = g_firstNumber + g_secondNumber;
        g_sumResult = Math.floor(Math.random()*6 + (sum -1));

        var exp = g_firstNumber.toString()+ " + " + g_secondNumber.toString() + "\n"
            +"= " + g_sumResult.toString();
        exp.toUpperCase();
        this.expression.setString(exp);
    },
    rightClick: function(){

        if(g_firstNumber + g_secondNumber != g_sumResult){
            var gameOver = new GameOver();
            var winsize = cc.Director.getInstance().getWinSize();
            var gameOverSize = gameOver.getContentSize();
            gameOver.setPosition(cc.p(winsize.width/2 - gameOverSize.width/2, winsize.height/2 - gameOverSize.height/2));
            this.addChild(gameOver, 5);
        } else{
            this.changeColor();
            this.changeExpression();
            g_score = g_score + 1;
            this.updateScore();
        }
    },
    wrongClick: function(){
        if(g_firstNumber + g_secondNumber == g_sumResult){
            var gameOver = new GameOver();
            var winsize = cc.Director.getInstance().getWinSize();
            var gameOverSize = gameOver.getContentSize();
            gameOver.setPosition(cc.p(winsize.width/2 - gameOverSize.width/2, winsize.height/2 - gameOverSize.height/2));
            this.addChild(gameOver, 5);
        } else {
            this.changeColor();
            this.changeExpression();
            g_score = g_score+1;
            this.updateScore();
        }
    },
    updateScore: function(){
        var score = g_score.toString();
        this.currentScore.setString(score);
    }
});
