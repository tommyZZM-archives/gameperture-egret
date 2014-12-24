module gamep {
    export class GameFacade{

        //private _isinit:boolean;

        private _game:GameCycler;
        private _display:GameDisplay;
        private _postals:PostalDictionary;

        public constructor() {
            this._postals = new PostalDictionary();
        }

        public init(){
            this._postals.setRoute(notify.GamePre,this._game['onPre']);//默认路由
            this._postals.setRoute(notify.GameReady,this._game['onReady']);
            this._postals.setRoutes(this._game['commandRoutes']());
            this._display.addEventListener(FacadeEvent.UNIQUE,this._postOffice,this);
        }

        public prestar(){this._display['dispatchNotify'](notify.GamePre);}
        public startup(){this._display['dispatchNotify'](notify.GameReady);}

        private _postOffice(e:FacadeEvent){
            this._postals[e.notify].apply(this._game,e.courier);
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