module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:Map<string,GameCmder>;//存放所有命令
        private _logicpool:Map<string,GameProxyer>;//存放所有业务逻辑

        private _postals:Map<NotifyType, Map<string,{thisobj:any; callback: Function}>>;

        public constructor() {
            this._postals = new Map<NotifyType, Map<string,{thisobj:any; callback: Function}>>();

            this._postals.set(NotifyType.Cmd,new Map<string,{thisobj:any; callback: Function}>());///V->C
            this._postals.set(NotifyType.Feedback,new Map<string,{thisobj:any; callback: Function}>());//C->V

            this._cmdpool = new Map<string, GameCmder>();
            this._logicpool = new Map<string, GameProxyer>();

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
            ant.callback.apply(ant.thisobj,e.courier);
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