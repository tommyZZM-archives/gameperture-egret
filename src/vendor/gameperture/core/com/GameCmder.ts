module gamep {
    //@abstract
    export class GameCmder extends egret.EventDispatcher implements IGameCom{

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

        //Interact with
        protected dispatchDemand(type:string, courier?:any){
            super.dispatchEvent(new gamep.BroadcastEvent(type,courier));
        }

        public dispatchCmd(cmd:string, ...courier:any[]){
            root.dispatchEvent(new Core.FacadeEvent(NotifyType.Cmd,cmd+getClassName(this),courier));
        }

        protected proxy(proxy:any):any{
            return a$["proxy"](proxy);
        }

        public get name(){
            return this._name;
        }
    }
}