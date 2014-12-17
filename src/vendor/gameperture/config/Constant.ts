module gamep{
    export var gpversion = '0.16 deving';
    export var isdebug = false;
    export var rootscene:egret.DisplayObjectContainer = null;

    export function trace(...optionalParams: any[]){
        if(isdebug){
            //TODO:需要改进...
            var out = optionalParams.join(',');
            console.log(out);
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
        export var GamePre:string = 'gamepre0112';
        export var GameReady:string = 'gameready0112';
    }

}
