module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        private _componentpool:Dict;//Map<string,egret.DisplayObject>;

        public constructor() {
            this._componentpool = new Dict();//new Map<string,egret.DisplayObject>();
            super();
            //:your code here
        }

        //@public @final
        public dispatchCmd(command:any,cmd:string, ...courier:any[]){
            if(getClassName(command) != getClassName(GameFacade.instance['_game']))GameFacade.instance['getCommand'](command);
            //console.log(cmd+command.name,cmd+getClassName(command));//DONE:这里不能用name.. 默认情况下name表示该实例的名字.. 如果压缩器改变了实例名,就会造成错误.
            root.dispatchEvent(new Internal.FacadeEvent(NotifyType.Cmd,cmd+getClassName(command),courier));
        }

        /**
         * 简陋反馈侦听器
         * @param type
         * @param callback
         * @param thisObject
         */
        public addSimpleFeedbackListener(type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            proxy.addProxyEventListener(type,callback,thisObject);
        }

        /**
         * 目标反馈侦听器
         * @param command
         * @param type
         * @param callback
         * @param thisObject
         */
        public addTargetFeedbackListener(command:Function,type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            type = getClassName(command)+type;
            //console.log('addTargetFeedbackListener:'+type);
            proxy.addProxyEventListener(type,callback,thisObject);
        }

        /**
         * 普通反馈侦听器
         * @param proxy
         * @param type
         * @param callback
         * @param thisObject
         */
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

        public addChildAt(child: egret.DisplayObject,index: number):egret.DisplayObject{
            if(child.name){
                super.addChildAt(child,index);
                this._componentpool.set(child.name,child);
                return child
            }else{
                console.warn('child must have a name!');
                return null;
            }
        }


        public removeChild(child: egret.DisplayObject):egret.DisplayObject{
            if(this._componentpool.get(child.name)){
                super.removeChild(child);
                this._componentpool.delete(child.name);
                return child;
            }else{
                //super.removeChild(child);
                console.warn(getClassName(this),'remove a unname child!',getClassName(child));
                return null;
            }

        }

        public removeChildren():void{
            super.removeChildren();
            this._componentpool.clear();
        }

        public selectChild(name):any{
            return this._componentpool.get(name);
        }
    }
}
