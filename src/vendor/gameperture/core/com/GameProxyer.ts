module gamep {
    //model
    export class GameProxyer extends egret.EventDispatcher{

        private _name:string;

        public constructor() {
            super();
            this._name = this['__proto__']['__class__'];
            this._name = /\.?(\w+)$/.exec(this.name)[1];
            //super();
            this.mixExtendMethod(GameCmder,'getProxy',true);
            this.mixExtendMethod(GameCmder,'dispatchSimpleFeedback',true);
            this.mixExtendMethod(GameContainer,'dispatchCmd',true);
        }

        public init(...arg){

        }

        public get name(){
            return this._name;
        }

        protected addProxyEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number){
            super.addEventListener(type,listener,thisObject,useCapture,priority);
        }

        protected removeProxyEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean){
            super.removeEventListener(type,listener,thisObject,useCapture);
        }

        /** @deprecated */
        public addEventListener(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): void{}

        /** @mixExtendMethod **/
        protected dispatchCmd(command:any,cmd:string, ...courier:any[]){}
        protected getProxy(proxy:any):any{}
        protected dispatchSimpleFeedback(type:string, courier?:any){}

        public addTimeListener(type:Event.IProfilerEvent,callback:Function){
            GameProfiler.instance.addEventListener(type+'ProfilerEvent',callback,this);
        }

        private mixExtendMethod(Class,method:string,forceOverride:boolean=false){
            var f = Class['prototype'][method];
            if(f && method!='__class__'){
                if(!forceOverride){
                    if(this[method]){
                        console.warn(method+"() already exist in "+this._name+" use forceOverride and try?");
                        return;
                    }
                }
                this['__proto__'][method] = f;
            }
        }

        /*public destory(){
         GameFacade.instance['logoffCom'](GameFacade.instance['_proxypool'],this);
         }*/
    }
}