module gamep {
    //@abstract
    export class GameProxyer extends egret.EventDispatcher implements IGameCom{

        private _name:string;

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

        public addDemandListener(type: string, callback: Function,thisObject: egret.DisplayObject){
            type = getClassName(this)+type;
            super.addEventListener(type,callback,thisObject);
        }

        public addTimeListener(type:TimeEvent,callback:Function){
            GameProfiler.instance.addEventListener(type+getClassName(Core.ProfilerEvent),callback,this);
        }
        public removeTimeListener(type:TimeEvent,callback:Function) {
            GameProfiler.instance.removeEventListener(type + getClassName(Core.ProfilerEvent), callback, this);
        }

        public get name(){
            return this._name;
        }
    }
}