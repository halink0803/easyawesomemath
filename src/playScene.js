/**
 * Created by HaLink0803 on 4/8/2014.
 */

/**
 * Created by HaLink0803 on 4/9/2014.
 */

var PlayScene = cc.Scene.extend({

    onEnter:function()
    {
        this._super();
        g_score = 0;
        var backLayer = new Background();
        this.addChild(backLayer, 0);
    }
});