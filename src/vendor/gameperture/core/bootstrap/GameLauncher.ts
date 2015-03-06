module gamep{
    export var a$:GameFacade;

    export class GameLauncher{//implements GamePertureInterface

        //private _facade:GameFacade = GameFacade.instance;

        public constructor(debug:boolean) {
            if(debug){
                console.info("Welcome to %cGameperture","color:#1ac2ff;font-weight:bold;",
                    "Quick Game Devlope Template base on Egret Engine!");
                console.info("gitHub:",'https://github.com/tommyZZM/gameperture-egret');
            }
            isdebug = debug;
            if(isdebug){
                //egret.Profiler.getInstance().run();
            }
            GameProfiler.instance;
            a$ =  GameFacade.instance;
        }

        public launch(){
            root.addEventListener(Core.FacadeEvent.UNIQUE,(<any>a$)._postOffice,a$);
            (<any>a$)._display['startup']();
        }
    }
}
