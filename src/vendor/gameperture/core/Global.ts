module gamep{
    export var gpversion = '0.16 deving';
    export var isdebug = false;
    export var root:egret.DisplayObjectContainer = null;
    export var rootscene:egret.DisplayObjectContainer = null;

    export enum NotifyType{
        Cmd = 1,
        Feedback = 3
    }

    export module Notify.Cmd{
        //export var GamePre:string = 'gamepre0112';
        export var GameReady:string = 'gameready0112';
    }

    export module Notify.Call{

    }
}

function trace(...optionalParams: any[]){
    if(gamep.isdebug){
        //TODO:需要改进...
        for(var i:number=0;i<optionalParams.length;i++){
            console.log(optionalParams[i]);
        }
        //var out = optionalParams.join(',');
    }
}

function stage():egret.Stage{
    return egret.MainContext.instance.stage;
}

function stageWidth(multiple:number=1):number
{
    return egret.MainContext.instance.stage.stageWidth*multiple;
}

function stageHeight(multiple:number=1):number
{
    return egret.MainContext.instance.stage.stageHeight*multiple;
}
