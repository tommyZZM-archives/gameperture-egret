module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:Dict;//Map<string,GameCmder>;//存放所有命令
        private _proxypool:Dict;//Map<string,GameProxyer>;//存放所有业务逻辑
        //private _memorypool:Dict;//存放数据;

        private _postals:Dict;//Map<NotifyType, Map<string,{thisobj:any; callback: Function}>>;

        public constructor() {
            this._postals = new Dict();

            this._postals.set(NotifyType.Cmd,new Dict());///V->C
            //this._postals.set(NotifyType.Feedback,new Dict());//C->V

            this._cmdpool = new Dict();
            this._proxypool = new Dict();
        }

        //邮局
        private _postOffice(e:Core.FacadeEvent){
            var ant:any = this._postals.get(e.fatype).get(e.notify);
            if(ant){ant.callback.apply(ant.thisobj,e.courier);}
        }

        private proxy(proxy:any):any{
            if(getClassName(proxy)==getClassName(GameProxyer)){return;}
            return this.getCom(this._proxypool,proxy,GameProxyer);
        }

        private command(command:any):any{
            if(getClassName(command)==getClassName(GameCmder)){return;}
            //var m = this.getCom(this._cmdpool,command,GameCmder);
            return this.getCom(this._cmdpool,command,GameCmder);
        }

        public dispatchCmd(command:any,cmd:string, ...courier:any[]){
            if(getClassName(command)==getClassName(GameCmder)){return;}
            this.command(command);
            root.dispatchEvent(new Core.FacadeEvent(NotifyType.Cmd,cmd+getClassName(command),courier));
        }

        private getCom(pool:Dict,com:any,instance:any):any{
            var key = com.prototype['__class__'];
            if(!pool.get(key)){
                //var c = new com();
                if(isOfClass(com,instance)){//c instanceof instance
                    var c = new com();
                    pool.set(key,c);
                }else{
                    console.error(getClassName(com),"is not of",getClassName(instance))
                }
            }
            return pool.get(key);
        }

        public addBroadcastListener(type: string, callback: Function,thisObject: egret.DisplayObject){
            var proxy = this.proxy(BroadcastProxy);
            proxy.addEventListener(type,callback,thisObject);
        }
        public dispatchBroadcast(type:string, courier?:any){
            (<any>this.proxy(BroadcastProxy)).dispatchBroadcast(type,courier);
        }

        public addDemandListener(com:any,type: string, callback: Function,thisObject: egret.DisplayObject):boolean{
            if(isOfClass(com,GameProxyer)){
                var p = this.proxy(com);
                p.addEventListener(type,callback,thisObject);
                return true;
            }

            if(isOfClass(com,GameCmder)){
                var c:GameCmder = this.command(com);
                c.addEventListener(type,callback,thisObject);
                return true;
            }

            return false;
        }

        //instance mode
        private static _instance:GameFacade;
        public static get instance():GameFacade{
            if (this._instance == null) {
                this._instance = new GameFacade();
            }
            //if(this._instance['_game'] && this._instance['_display']){this._instance['_isinit'] = true;}
            return this._instance;
        }
    }
}