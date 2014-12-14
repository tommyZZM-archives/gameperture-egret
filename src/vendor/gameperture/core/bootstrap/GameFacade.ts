module gamep {
    export class GameFacade{
        
        //private _dispatcher:egret.EventDispatcher;
        private _game:GameCycler;
        private _display:GameDisplay;
        private _postals:PostalDictionary;

        public constructor() {
            this._postals = new PostalDictionary();
        }

        public startUp(){
            this._postals.setRoute(notify.GameReady,this._game['_onReady']);
            this._postals.setRoutes(this._game.commandRoutes());
            this._display.addEventListener(FacadeEvent.UNIQUE,this._postOffice,this);
            this._display.dispatchNotify(notify.GameReady);
        }

        private _postOffice(e:FacadeEvent){
            this._postals[e.notify].apply(this._game,e.courier);
        }

        public registGame(game:GameCycler){this._game = game;}
        public registDisplay(display:GameDisplay){this._display = display;}

        //instance mode
        private static _instance:GameFacade;
        public static get instance():GameFacade{
            if (this._instance == null) {
                this._instance = new GameFacade();
            }
            return this._instance;
        }
    }
}