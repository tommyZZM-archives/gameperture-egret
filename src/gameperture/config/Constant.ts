module gp{
    export var gpversion = '0.1 deving';
    export var isdebug = false;
    export var rootscene:egret.DisplayObjectContainer = null;

    export function trace(message?: any, ...optionalParams: any[]){
        if(isdebug){
            console.log(message,optionalParams?'':optionalParams);
        }
    }

    export function stage():egret.Stage{
        return egret.MainContext.instance.stage;
    }

    export function stageWidth():number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }

    export function stageHeight():number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }

}

class GameStatus{
    public static NOTRUN = -2;
    public static READY = 1;
    public static PLAYING = 2;
    public static RESTART = -1;
    public static OVER = 0;
}
