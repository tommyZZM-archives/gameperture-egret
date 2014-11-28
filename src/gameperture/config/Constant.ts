module config{

    export var isdebug = false;
    export var rootscene:egret.DisplayObjectContainer = null;

    export function trace(...optionalParams: any[]){
        if(config.isdebug){
            console.log(optionalParams);
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
