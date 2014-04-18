/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var MyLayer = cc.LayerColor.extend({
    ctor:function()
    {
        this._super();
        this.setKeyboardEnabled(true);
        this.keyboardArrows = {
            space : false
        }
    },
    init:function()
    {
        this._super();

        var backgroundColor = cc.c3b(26, 188, 156);
        this.setColor(backgroundColor);

        var director = cc.Director.getInstance();
        var winsize = director.getWinSize();
        var centerPos = cc.p(winsize.width/2, winsize.height/2);
        var playButton = cc.Sprite.create(s_playButton);
        var playButtonHover = cc.Sprite.create(s_playButton_hover);
        var playBtn = cc.MenuItemSprite.create(playButton, playButtonHover,null, this.click, this);
        playBtn.setPosition(centerPos);
        var menu = cc.Menu.create(playBtn, 0);
        menu.setPosition(cc.p(0, 0));
        this.addChild(menu, 0);

        var name = cc.LabelTTF.create("Freaky Math", "Arial", 32);
        name.setPosition(cc.p(winsize.width/2, winsize.height/2 +100));
        this.addChild(name, 1);
    },

    click:function()
    {
      var director = cc.Director.getInstance();
      director.replaceScene(new PlayScene());
    },
    onKeyUp : function(key){
        if(key == cc.KEY.space){
            this.keyboardArrows.space = false;
        }
    },
    onKeyDown:function(key){
        if(key == cc.KEY.space){
            this.keyboardArrows.space = true;
            this.click();
        }
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});
