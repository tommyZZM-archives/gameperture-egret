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

module gamep{
    export module client{
        var _renderWidth:number = 480;
        var _renderHeight:number = 800;
        var _renderOffset:number = 1;
        export function setRender(width:number,height:number,free:boolean=false,offset:number = 1.26){
            _renderWidth = width;
            _renderHeight = height;
            _renderOffset = offset;
            if(!free){
                orient = width>height?Orient.Horizontal:Orient.Vertical;
                switch (orient){
                    case Orient.Horizontal:{
                        _renderWidth = width*offset;
                        break;
                    }
                    case Orient.Vertical:{
                        _renderHeight = height*offset;
                        break;
                    }
                }
                //orient = Orient.Free;
            }else{
                orient = Orient.Free
            }
        }

        export function renderWidth():number{
            return _renderWidth
        }
        export function renderHeight():number{
            return _renderHeight
        }
        export function renderOffset():number{
            return _renderOffset
        }
        export function renderSize(){
            return renderWidth()/renderHeight()
        }

        export var orient:Orient = Orient.Free;

        export enum Orient{
            Horizontal=1,
            Vertical=2,
            Free=123
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
}

var isdebug = false;
function trace(...msg){}
function warn(...msg){}
function info(...msg){}

module quickdebug{
    export function init(){
        if(isdebug){
            window["log"] = console.log.bind(console);
            window["trace"] = console.log.bind(console);
            window["debug"] = console.debug.bind(console);
            window["warn"] = console.warn.bind(console);
            window["info"] = console.info.bind(console);
            window["error"] = console.error.bind(console);
        }
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

module gamep{
    export module client{
        export function context():egret.MainContext{
            return egret.MainContext.instance;
        }

        export function grate_container():HTMLElement{
            return canvas_container();
        }

        export function canvas_container():HTMLElement{
            var container = document.getElementById(egret.StageDelegate.canvas_div_name);
            return container;
        }

        export function canvas():HTMLCanvasElement{
            var canvas = canvas_container().getElementsByTagName("canvas")[0];
            return canvas;
        }
    }

}

