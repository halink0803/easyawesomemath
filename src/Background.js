/**
 * Created by HaLink0803 on 4/8/2014.
 */

var Background = cc.LayerColor.extend ({

    expression : null,
    currentScore : null,
    clock: null,

    ctor: function(){
        this._super();
        this.init();
        this.setKeyboardEnabled(true);
        this.keyboard = {
            left : false,
            right : false
        }
    },
    init:function(){
        this._super();
        var red = cc.c3b(230, 44, 25);
        this.setColor(red);
        var winsize = cc.Director.getInstance().getWinSize();

        clock = cc.ProgressTimer.create(cc.Sprite.create(s_loading));
        clock.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        clock.setPosition(winsize.width/2, winsize.height-6);
        clock.setMidpoint(cc.p(0,1));
        this.addChild(clock, 2);
        clock.setPercentage(100);

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
        g_sumResult = Math.floor((Math.random() * 2) +sum);

        var exp = g_firstNumber.toString()+ " + " + g_secondNumber.toString() + "\n"
            +"= " + g_sumResult.toString();
        exp.toUpperCase();
        this.expression = cc.LabelTTF.create(exp, "Arial", 50);
        this.expression.setPosition(cc.p(winsize.width/2, winsize.height/2));
        this.addChild(this.expression);

        this.currentScore = cc.LabelTTF.create("0", "Arial", 50);
        this.currentScore.setPosition(cc.p());
        this.addChild(this.currentScore);

        this.scheduleUpdate();
    },
    changeColor:function(){
        var num = Math.floor((Math.random()*4));
        this.setColor(g_color[num]);
    },
    changeExpression: function(){
        clock.setPercentage(100);
        g_firstNumber = Math.floor((Math.random()*10)+1);
        g_secondNumber = Math.floor((Math.random()*10) + 1);
        var sum = g_firstNumber + g_secondNumber;
        g_sumResult = Math.floor(Math.random()*2 + sum);

        var exp = g_firstNumber.toString()+ " + " + g_secondNumber.toString() + "\n"
            +"= " + g_sumResult.toString();
        exp.toUpperCase();
        this.expression.setString(exp);
    },
    loadGameOver: function(){
        var gameOver = new GameOver();
        var winsize = cc.Director.getInstance().getWinSize();
        var gameOverSize = gameOver.getContentSize();
        gameOver.setPosition(cc.p(winsize.width/2 - gameOverSize.width/2, winsize.height/2 - gameOverSize.height/2));
        this.removeAllChildren();
        this.addChild(gameOver, 5);
    },
    rightClick: function(){
        if(g_firstNumber + g_secondNumber != g_sumResult){
            this.loadGameOver();
        } else{
            this.changeColor();
            this.changeExpression();
            g_score = g_score + 1;
            this.updateScore();
        }
    },
    wrongClick: function(){
        if(g_firstNumber + g_secondNumber == g_sumResult){
            this.loadGameOver();
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
    },
    update:function(){
      var now = clock.getPercentage();
      clock.setPercentage(now - 1.5);
      if(now <= 0){
        this.loadGameOver();
        this.unscheduleUpdate();
      }
    },
    onKeyDown : function(key){
        switch (key) {
            case cc.KEY.left :
                this.rightClick();
                break;
            case cc.KEY.right :
                this.wrongClick();
                break;
        }
    },
    onKeyUp : function(key){
        switch (key) {
            case cc.KEY.left :
                break;
            case cc.KEY.right :
                break;
        }
    }
});
