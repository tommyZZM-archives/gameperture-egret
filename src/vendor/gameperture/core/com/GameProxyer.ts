module gamep {
    //model
    export class GameProxyer extends egret.EventDispatcher{

        private _name:string;

        public constructor() {
            super();
            this._name = this['__proto__']['__class__'];
            this._name = /\.?(\w+)$/.exec(this.name)[1];
            //super();
            extendImplements(this,GameCmder,'getProxy',true);
            extendImplements(this,GameCmder,'dispatchBroadcast',true);
            extendImplements(this,GameContainer,'dispatchCmd',true);
            extendImplements(this,GameContainer,'addProxyListener',true);
        }

        public init(...arg){

        }

        public get name(){
            return this._name;
        }

        public addProxyEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number){
            super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        public removeProxyEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean){
            super.removeEventListener(type,listener,thisObject,useCapture);
        }

        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{}

        /** @mixExtendMethod **/
        protected dispatchCmd(command:any,cmd:string, ...courier:any[]){}
        protected getProxy(proxy:any):any{}
        protected dispatchBroadcast(type:string, courier?:any){}
        public addProxyListener(proxy:any,type: string, callback: Function,thisObject=this):void{}

        public addTimeListener(type:TimeEvent,callback:Function){
            GameProfiler.instance.addEventListener(type+getClassName(Core.ProfilerEvent),callback,this);
        }
        public removeTimeListener(type:TimeEvent,callback:Function){
            GameProfiler.instance.removeEventListener(type+getClassName(Core.ProfilerEvent),callback,this);
        }
        /*public addTimeListener(type:Event.IProfilerEvent,callback:Function){
            GameProfiler.instance.addEventListener(type+'ProfilerEvent',callback,this);
        }*/
        /*public destory(){
         GameFacade.instance['logoffCom'](GameFacade.instance['_proxypool'],this);
         }*/
    }
}