module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        private _componentpool:Map<string,egret.DisplayObject>;

        public constructor() {
            this._componentpool = new Map<string,egret.DisplayObject>();
            super();
            //TODO:your code here
        }

        //@public @final
        public dispatchCmd(controller:any,cmd:string, ...courier:any[]){
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Cmd,cmd+controller.name,courier));
        }

        //TODO:添加多个侦听有BUG...
        public addFeedbackListener(proxy:any,type: string, callback: Function,thisObject: egret.DisplayObject = this):void{
            proxy = GameFacade.instance['getProxy'](proxy);
            if(proxy){
                proxy.addEventListenerP(type,callback,thisObject);
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
            if(event._type == egret.Event.ADDED_TO_STAGE || event._type == egret.Event.ADDED){
                super.dispatchEvent(event);
                return !(!event);
            }
            console.warn('dispatchEvent() has been deprecated!use dispatchCmd() instead~');
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
