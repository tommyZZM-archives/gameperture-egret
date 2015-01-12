module gamep {
    //model
    export class GameProxyer extends egret.EventDispatcher{

        private _name:string;

        public constructor() {
            super();
            this._name = this['__proto__']['__class__'];
            this._name = /\.?(\w+)$/.exec(this.name)[1];
            //super();
        }

        public init(...arg){

        }

        public get name(){
            return this._name;
        }

        protected addProxyEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number){
            super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{}

        protected dispatchCmd(command:any,cmd:string, ...courier:any[]){
            if(command.name != GameFacade.instance['_game'].name)GameFacade.instance['getCommand'](command);
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Cmd,cmd+command.name,courier));
        }
        /*public dispatchEvent(event:{event:Event}){
            super.dispatchEvent()
        }*/
        /*public destory(){
            GameFacade.instance['logoffCom'](GameFacade.instance['_proxypool'],this);
        }*/

        /*protected getProxy(proxy:any):any{
            return GameFacade.instance['getProxy'](proxy);
        }*/

    }
}