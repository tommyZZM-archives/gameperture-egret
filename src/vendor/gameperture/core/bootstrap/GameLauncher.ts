module gamep{
    export class GameLauncher{//implements GamePertureInterface

        private _facade:GameFacade = GameFacade.instance;

        public constructor(debug:boolean) {
            console.info("Welcome to %cGameperture","color:#1ac2ff;font-weight:bold;",
                "Quick Game FrameWork base on Egret Engine!");
            isdebug = debug;
            if(isdebug){
                egret.Profiler.getInstance().run();
            }
            utils.GameProfiler.instance;
        }

        public launch(){
            this._facade.init();
            this._facade.startup();
        }
    }
}
