module gamep {
    //@abstract
    export class GameProxyer extends egret.EventDispatcher{

        private _name:string;
        protected _debug:boolean;

        public constructor() {
            super();
            this._name = getClassName(this);
            this._name = /\.?(\w+)$/.exec(this.name)[1];
            //super();
        }

        public init(...arg){

        }

        protected dispatchDemand(type:string, courier?:any){
            super.dispatchEvent(new gamep.BroadcastEvent(type,courier));
        }

        public addTimeListener(type:TimeEvent,callback:Function){
            GameProfiler.instance.addEventListener(type+getClassName(Core.ProfilerEvent),callback,this);
        }
        public removeTimeListener(type:TimeEvent,callback:Function) {
            GameProfiler.instance.removeEventListener(type + getClassName(Core.ProfilerEvent), callback, this);
        }

        protected proxy(proxy:any):any{
            return a$["proxy"](proxy);
        }

        public get name(){
            return this._name;
        }

        public set debug(need:boolean){
            this._debug = need;
        }
    }
}