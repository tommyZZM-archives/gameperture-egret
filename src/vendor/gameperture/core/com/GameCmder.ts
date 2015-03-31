module gamep {
    //@abstract
    export class GameCmder extends egret.EventDispatcher{

        private _name:string;

        public constructor() {
            super();
            this._name = getClassName(this);
            this._name = /\.?(\w+)$/.exec(this.name)[1];
        }

        //FIX:添加多个侦听有BUG...
        protected addCmdHandler(notify: string, callback: Function):void{//,thisObject: any
            //console.log("addCmdHandler..",notify+this.name,notify+getClassName(this))
            GameFacade.instance['_postals'].get(NotifyType.Cmd).set(notify+getClassName(this),{thisobj:this, callback: callback})
        }

        //DONE:使用单一的Broadcast事件
        protected dispatchDemand(type:string, courier?:any){
            ProxyEvent.dispatchProxyEvent(this,ProxyEvent,type,courier);
        }

        protected proxy(proxy:any):any{//GameProxyer|any
            return a$["proxy"](proxy);
        }

        public get name(){
            return this._name;
        }
    }
}