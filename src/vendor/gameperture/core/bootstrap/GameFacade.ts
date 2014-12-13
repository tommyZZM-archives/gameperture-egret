module gamep {
    export class GameFacade{
        
        private _dispatcher:egret.EventDispatcher;
        private _game:GameCycler;
        private _display:GameDisplay;

        public constructor() {
            this._dispatcher = new egret.DisplayObject();
        }



        public registGame(game:GameCycler){
            this._game = game;
        }

        public registDisplay(display:GameDisplay){
            this._display = display;
        }

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