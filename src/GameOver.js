/**
 * Created by HaLink0803 on 4/9/2014.
 */
var GameOver = cc.LayerColor.extend({
    ctor:function(){
        this._super();
        this.init();
    },
    init:function(){
        this._super();
        if(g_score > g_best){
            g_best = g_score;
        }
        this.setContentSize(480, 320);
        this.setColor(cc.c3b(85, 68, 47));
        var layerSize = this.getContentSize();

        var gameOver = cc.LabelTTF.create("GAME OVER", "Arial", 70);
        gameOver.setPosition(cc.p(layerSize.width/2, layerSize.height/2+50));
        this.addChild(gameOver);

        var strScore = "Your Score: " + g_score.toString();
        var score = cc.LabelTTF.create(strScore, "Arial", 40);
        score.setPosition(layerSize.width/2, layerSize.height/2);
        this.addChild(score);

        var strbest = "Best: " + g_best.toString();
        var best = cc.LabelTTF.create(strbest, "Arial", 40);
        best.setPosition(layerSize.width/2, layerSize.height/2 - 30);
        this.addChild(best);

        var replayBtn = cc.Sprite.create(s_playButton);
        var replayBtn_hover= cc.Sprite.create(s_playButton_hover);
        var replayItem  = cc.MenuItemSprite.create(replayBtn, replayBtn_hover, null, this.replayClick, this);
        replayItem.setPosition(cc.p(layerSize.width/2 - 100, layerSize.height/2 - 100));

        var optionBtn = cc.Sprite.create(s_optionButton);
        var optionBtnHover = cc.Sprite.create(s_optionButton_hover);
        var optionItem = cc.MenuItemSprite.create(optionBtn, optionBtnHover, null, this.optionClick, this);
        optionItem.setPosition(cc.p(layerSize.width/2 + 100, layerSize.height/2 -100));

        var menu = cc.Menu.create();
        menu.addChild(replayItem);
        menu.addChild(optionItem);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu);
    },
    replayClick:function(){
        var director = cc.Director.getInstance();
        director.replaceScene(new PlayScene());
    },
    optionClick:function(){
        var director = cc.Director.getInstance();
        director.replaceScene(new MyScene());
    }
});