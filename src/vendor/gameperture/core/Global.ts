module gamep{
    export var version = '0.5 Swirl';
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


//Multiplexing OO expand

function extendImplements(thisArg:any,Class:any,method:string,forceOverride:boolean=true){
    var f = Class['prototype'][method];
    if(f && method!='__class__'){
        if(!forceOverride){
            if(thisArg[method]){
                console.warn(method+"() already exist in "+thisArg._name+" use forceOverride and try?");
                return;
            }
        }
        thisArg['__proto__'][method] = f;
    }
}

function getClassName(obj:any):string{
    //class?
    if (obj.prototype) {
        if (obj.prototype.__class__ && obj.prototype.constructor){
            return obj.prototype.__class__;
        }
    }else if(obj.__proto__){
        if (obj.__proto__.__class__ && obj.__proto__.constructor){
            return obj.__proto__.__class__;
        }
    }else{
        console.warn(obj,'is not a class!');
        return undefined;
    }
}

function isOfClass(target,test){
    if(!target.prototype['__class__'] || !test.prototype['__class__']){
        console.warn("not typescript class");
    }

    if(target.prototype['__class__']==test.prototype['__class__']){
        return true;
    }else{
        var flag:number = 0;
        var protoTest = (target,test)=>{
            //console.log(target.__class__,test.prototype['__class__'])
            if(target){
                if(target.__class__){
                    if(target.__class__ == test.prototype['__class__']){
                        return 1;
                    }else{
                        return 0;
                    }
                }
                return -1
            }
            return -1
        };

        target = target.prototype.__proto__;
        while(flag==0){
            flag = protoTest(target,test);
            target = target.__proto__;
        }
        return flag == 1;
    }
}

function injectProperty(target:any,packge:any,pos:string):any{
    /*if(packge && !target[pos]){
        var foreign = packge;
        target[pos] = foreign;
    }else{
        console.warn('error formart! injectiong fail!',target,packge)
    }
    return target;*/
}

function getProperty(target:any,prop:string):any{
    return target[prop];
}