module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        //private _componentpool:Dict;//Map<string,egret.DisplayObject>;

        public constructor() {
            //this._componentpool = new Dict();//new Map<string,egret.DisplayObject>();
            super();
            //:your code here
        }

        //@public @final
        public dispatchCmd(command:any,cmd:string, ...courier:any[]){
            if(getClassName(command) != getClassName(GameFacade.instance['_game']))GameFacade.instance['getCommand'](command);
            //console.log(cmd+command.name,cmd+getClassName(command));//DONE:这里不能用name.. 默认情况下name表示该实例的名字.. 如果压缩器改变了实例名,就会造成错误.
            root.dispatchEvent(new Core.FacadeEvent(NotifyType.Cmd,cmd+getClassName(command),courier));
        }

        /**
         * 广播侦听器
         * @param type
         * @param callback
         * @param thisObject
         */
        public addBroadcastListener(type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            proxy.addProxyEventListener(type,callback,thisObject);
        }

        /**
         * 点播侦听器
         * @param command
         * @param type
         * @param callback
         * @param thisObject
         */
        public addDemandListener(command:Function,type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            type = getClassName(command)+type;
            //console.log('addTargetFeedbackListener:'+type);
            proxy.addProxyEventListener(type,callback,thisObject);
        }

        /**
         * 反馈侦听器
         * @param proxy
         * @param type
         * @param callback
         * @param thisObject
         */
        public addProxyListener(proxy:any,type: string, callback: Function,thisObject: egret.DisplayObject = this):void{
            if(proxy.prototype['__class__']==SimpleFeedbackProxy.prototype['__class__']){console.warn('use addProxyListener() instead!');return;}
            proxy = GameFacade.instance['getProxy'](proxy);
            if(proxy){
                proxy.addProxyEventListener(type,callback,thisObject);
            }
        }

        public removeDemandListener(type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            proxy.removeProxyEventListener(type,callback,thisObject);
        }
        public removeBroadcastListener(type: string, callback: Function,thisObject: egret.DisplayObject = this){
            var proxy = GameFacade.instance['getProxy'](SimpleFeedbackProxy);
            proxy.removeProxyEventListener(type,callback,thisObject);
        }
        public removeProxyListener(proxy:any,type: string, callback: Function,thisObject: egret.DisplayObject = this):void{
            if(proxy.prototype['__class__']==SimpleFeedbackProxy.prototype['__class__']){console.warn('use removeSimpleFeedbackListener() instead!');return;}
            proxy = GameFacade.instance['getProxy'](proxy);
            if(proxy){
                proxy.removeProxyEventListener(type,callback,thisObject);
            }
        }
    }
}
