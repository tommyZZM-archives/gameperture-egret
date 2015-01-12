module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:Dict;//Map<string,GameCmder>;//存放所有命令
        private _proxypool:Dict;//Map<string,GameProxyer>;//存放所有业务逻辑

        private _postals:Dict;//Map<NotifyType, Map<string,{thisobj:any; callback: Function}>>;

        public constructor() {
            this._postals = new Dict();

            this._postals.set(NotifyType.Cmd,new Dict());///V->C
            this._postals.set(NotifyType.Feedback,new Dict());//C->V

            this._cmdpool = new Dict();
            this._proxypool = new Dict();

        }

        public init(){
            root.addEventListener(Event.FacadeEvent.UNIQUE,this._postOffice,this);
        }

        public startup(){
            if(!this._isStart){
                this._display['startup']();
                this._isStart=true;
            }
        }

        //邮局
        private _postOffice(e:Event.FacadeEvent){
            var ant:any = this._postals.get(e.fatype).get(e.notify);
            if(ant){ant.callback.apply(ant.thisobj,e.courier);}
        }

        private getProxy(proxy:any):any{
            return this.getCom(this._proxypool,proxy);
        }

        private getCommand(command:any):any{
            return this.getCom(this._cmdpool,command);
        }

        private getCom(pool:Dict,com:any):any{
            var key = com.prototype['__class__'];
            if(!pool.get(key)){
                pool.set(key,new com());
            }
            return pool.get(key);
        }

        /*private logoffCom(pool:Map<string,any>,proxy:any):boolean{
            if(pool.get(proxy.name)){
                pool.delete(proxy.name);
                console.log(pool);
                return true;
            }
            return false;
        }*/

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