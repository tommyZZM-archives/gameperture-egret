//Ecmascript Multiplexing OO expand

function implementMethod(thisArg:any,method:string,fn:Function,forceOverride:boolean=true){
    if(fn && method!='__class__'){
        if(thisArg[method]){
            if(!forceOverride){
                console.warn(method+"() already exist in "+thisArg._name+" use forceOverride and try?");
                return;
            }
            if(!thisArg["__origin__"])thisArg["__origin__"]={};
            thisArg["__origin__"][method] = thisArg[method].bind(thisArg);
        }
        thisArg['__proto__'][method] = fn;
    }
}

function extendImplements(thisArg:any,Class:any,method:string,forceOverride:boolean=true){
    var f = Class['prototype'][method];
    implementMethod(thisArg,method,f,forceOverride)
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

function isOfClass(target,test):boolean{
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