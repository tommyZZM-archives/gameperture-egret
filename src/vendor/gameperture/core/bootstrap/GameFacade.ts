module gamep {
    export class GameFacade{

        private _isStart:boolean;

        private _game:GameCycler;
        private _display:GameStage;

        private _cmdpool:utils.Dictionary;//存放所有命令
        private _logicpool:utils.Dictionary;//存放所有业务逻辑

        private _logicPostals:PostalDictionary;//M->C
        private _cmdPostals:PostalDictionary;//V->C
        private _viewPostals:PostalDictionary;//C->V

        public constructor() {
            this._cmdPostals = new PostalDictionary();
            this._logicPostals = new PostalDictionary();
            this._viewPostals = new PostalDictionary();

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
            var postals:PostalDictionary;
            switch (e.fatype){
                case notify.cmd:{
                    postals = this._cmdPostals;
                    break;
                }
                case notify.call:{
                    postals = this._logicPostals;
                    break;
                }
                case notify.feedback:{
                    postals = this._viewPostals;
                    break;
                }
                default:
                    break;
            }
            postals[e.notify].callback.apply(postals[e.notify].thisobj,e.courier);

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