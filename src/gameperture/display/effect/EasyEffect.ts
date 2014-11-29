/**
 * Created by 2014-11-06 on 2014/11/28.
 */
module gp.display.effect.easy{
    export function shakeScene(panel:gp.display.Scenery):void{
        var shakeNum = 40;
        var oldX:number = panel.x;
        var oldY:number = panel.y;
        egret.Tween.get(panel).to({y:panel.y - 10},shakeNum);
        egret.setTimeout(function () {
            egret.Tween.get(panel).to({y:panel.y + 20},shakeNum);
        }, this, shakeNum*2);
        egret.setTimeout(function () {
            egret.Tween.get(panel).to({y:panel.y - 20},shakeNum);
        }, this, shakeNum*3);
        egret.setTimeout(function () {
            egret.Tween.get(panel).to({y:panel.y + 20},shakeNum);
        }, this, shakeNum*4);
        egret.setTimeout(function () {
            egret.Tween.get(panel).to({y:oldY},shakeNum);
        }, this, shakeNum*5);
    }
}