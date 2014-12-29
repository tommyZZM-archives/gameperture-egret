module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:utils.Dictionary;//存放所有命令
        private _logicpool:utils.Dictionary;//存放所有业务逻辑

        private _logicPostals:PostalDictionary;//逻辑->命令映射
        private _cmdPostals:PostalDictionary;//场景->场景控制器映射

        public constructor() {
            this._cmdPostals = new PostalDictionary();
            this._logicPostals = new PostalDictionary();

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
            switch (e.fatype){
                case notify.cmd:{
                    this._cmdPostals[e.notify].callback.apply(this._cmdPostals[e.notify].thisobj,e.courier);
                    break;
                }
                case notify.call:{
                    this._logicPostals[e.notify].callback.apply(this._logicPostals[e.notify].thisobj,e.courier);
                    break;
                }
                default:
                    break;
            }

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