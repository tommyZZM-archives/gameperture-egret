module gamep{
    export var gpversion = '0.16 deving';
    export var isdebug = false;
    export var root:egret.DisplayObjectContainer = null;
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

    export function stageWidth(multiple:number=1):number
    {
        return egret.MainContext.instance.stage.stageWidth*multiple;
    }

    export function stageHeight(multiple:number=1):number
    {
        return egret.MainContext.instance.stage.stageHeight*multiple;
    }

    export module notify{
        export var cmd:string = 'cmd0112';
        export var call:string= 'call0112';
    }

    export module notify.CMD{
        //export var GamePre:string = 'gamepre0112';
        export var GameReady:string = 'gameready0112';
    }

    export module notify.CALL{

    }

}
