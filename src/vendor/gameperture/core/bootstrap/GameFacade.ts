module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:utils.Dictionary;//存放所有命令
        private _logicpool:utils.Dictionary;//存放所有业务逻辑
        private _postals:Map<string, any>;

        public constructor() {
            this._postals = new Map();
            this._postals.set(notify.cmd,new Map());///V->C
            this._postals.set(notify.result,new Map());//M->C
            this._postals.set(notify.feedback,new Map());//C->V

            this._cmdpool = new gamep.utils.Dictionary();
            this._logicpool = new gamep.utils.Dictionary();
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