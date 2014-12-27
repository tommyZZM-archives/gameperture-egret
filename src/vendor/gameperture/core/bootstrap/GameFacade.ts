module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:utils.Dictionary;//存放所有命令
        private _logicpool:utils.Dictionary;//存放所有业务逻辑
        private _logicpostals:PostalDictionary;//逻辑->命令映射

        private _gratePostals:PostalDictionary;//场景->场景控制器映射

        public constructor() {
            this._gratePostals = new PostalDictionary();

            this._cmdpool = new gamep.utils.Dictionary();
            this._logicpool = new gamep.utils.Dictionary();
            this._logicpostals = new PostalDictionary();
        }

        public init(){
            this._gratePostals.setRoute(notify.CMD.GameReady,this._game['hello']);
            this._gratePostals.setRoutes(this._game['grateRoutes']());
            rootscene.addEventListener(FacadeEvent.UNIQUE,this._postOffice,this);
        }

        public startup(){
            if(!this._isStart){
                this._display['startup']();
                this._isStart=true;
            }
        }

        //邮局
        private _postOffice(e:FacadeEvent){
            switch (e.fatype){
                case notify.CMD:{
                    this._gratePostals[e.notify].apply(this._game,e.courier);
                    break;
                }
                case notify.CALL:{
                    //this._logicpostals[e.notify].apply(this._display,e.courier);
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