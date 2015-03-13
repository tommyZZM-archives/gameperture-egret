module gamep{
    export var version = '0.5 Swirl';
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
}

module gamep.client{

    var _renderWidth:number = 480;
    var _renderHeight:number = 800;
    export function setRender(width:number,height:number,free?){
        _renderWidth = width;
        _renderHeight = height;
        if(!free){
            orient = width>height?Orient.Horizontal:Orient.Vertical;
        }
    }

    export function renderWidth():number{
        return _renderWidth
    }
    export function renderHeight():number{
        return _renderHeight
    }
    export function renderSize(){
        return renderWidth()/renderHeight()
    }

    export var orient:Orient = Orient.Free;

    export enum Orient{
        Horizontal=1,
        Vertical=2,
        Free=0
    }

    export function width():number{
        var result;
        if (document.documentElement.clientWidth)
        {
            result= document.documentElement.clientWidth;
        }else{
            result= window.innerWidth;
        }

        return result;
    }

    export function height():number{
        var result;
        if (document.documentElement.clientHeight) {
            result= document.documentElement.clientHeight;
        }else{
            result= window.innerHeight;
        }

        return result;
    }

    export function size(){
        return client.width()/client.height()
    }

    export function perfectSize(){
        return _renderHeight/_renderWidth;
    }
}

var isdebug = false;
function trace(...msg){}
function warn(...msg){}
function info(...msg){}

function init(){
    if(isdebug){
        window["log"] = console.log.bind(console);
        window["trace"] = console.log.bind(console);
        window["debug"] = console.debug.bind(console);
        window["warn"] = console.warn.bind(console);
        window["info"] = console.info.bind(console);
        window["error"] = console.error.bind(console);
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

function stageCenter():egret.Point{
    var center:any = window["_stageCenter"];
    if(!center){
        center = window["_stageCenter"] = new egret.Point(stageWidth(0.5),stageHeight(0.5));
    }
    return center;
}

function egret_canvas_container():HTMLElement{
    var container = document.getElementById(egret.StageDelegate.canvas_div_name);
    return container;
}

function egret_canvas():HTMLCanvasElement{
    var canvas = egret_canvas_container().getElementsByTagName("canvas")[0];
    return canvas;
}