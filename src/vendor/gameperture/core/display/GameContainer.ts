module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        private _componentpool:Dict;//Map<string,egret.DisplayObject>;

        public constructor() {
            this._componentpool = new Dict();//new Map<string,egret.DisplayObject>();
            super();
            //TODO:your code here
        }

        //@public @final
        public dispatchCmd(command:any,cmd:string, ...courier:any[]){
            if(command.name != GameFacade.instance['_game'].name)GameFacade.instance['getCommand'](command);
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Cmd,cmd+command.name,courier));
        }

        public addSimpleFeedbackListener(type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            proxy.addProxyEventListener(type,callback,thisObject);
        }
        //Done:添加多个侦听有BUG...
        public addFeedbackListener(proxy:any,type: string, callback: Function,thisObject: egret.DisplayObject = this):void{
            if(proxy.prototype['__class__']==SimpleFeedbackProxy.prototype['__class__']){console.warn('use addSimpleFeedbackListener() instead!');return;}
            proxy = GameFacade.instance['getProxy'](proxy);
            if(proxy){
                proxy.addProxyEventListener(type,callback,thisObject);
            }
        }

        public removeSimpleFeedbackListener(type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            proxy.removeProxyEventListener(type,callback,thisObject);
        }
        public removeFeedbackListener(proxy:any,type: string, callback: Function,thisObject: egret.DisplayObject = this):void{
            if(proxy.prototype['__class__']==SimpleFeedbackProxy.prototype['__class__']){console.warn('use removeSimpleFeedbackListener() instead!');return;}
            proxy = GameFacade.instance['getProxy'](proxy);
            if(proxy){
                proxy.removeProxyEventListener(type,callback,thisObject);
            }
        }

        //禁用方法
        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number):void{
            console.warn('addEventListener('+type+') has been deprecated!');
            //super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        /** @deprecated */
        public dispatchEvent(event: egret.Event):boolean{
            if(event._type == egret.Event.ADDED_TO_STAGE
                || event._type == egret.Event.ADDED
                || event._type == egret.Event.REMOVED
                || event._type == egret.Event.REMOVED_FROM_STAGE){
                super.dispatchEvent(event);
                return !(!event);
            }
            console.warn('dispatchEvent() has been deprecated!use dispatchCmd() instead~','type:'+event._type);
            return null;
            //return super.dispatchEvent(event);
        }

        public addChild(child: egret.DisplayObject):egret.DisplayObject{
            if(child.name){
                super.addChild(child);
                this._componentpool.set(child.name,child);
                return child
            }else{
                console.warn('child must have a name!');
                return null;
            }
        }

        public selectChild(name):any{
            return this._componentpool.get(name);
        }
    }
}
