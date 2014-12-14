module gamep{
    export var gpversion = '0.16 deving';
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

    export module notify{
        export var GameReady:string = 'gameready0112';
    }

}
