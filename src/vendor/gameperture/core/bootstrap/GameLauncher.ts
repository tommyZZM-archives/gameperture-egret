module gamep{
    export var a$:GameFacade;
    export var m$:GameMemory;

    export class GameLauncher{//implements GamePertureInterface

        //private _facade:GameFacade = GameFacade.instance;

        public constructor(renderWidth:number,renderHeight:number,debug:boolean=true,banchmark:boolean=true) {
            isdebug = debug;
            client.renderWidth = renderWidth;
            client.renderHeight = renderHeight;
            init();
            info("Welcome to %cGameperture","color:#1ac2ff;font-weight:bold;",
                "Quick Game Devlope Template base on Egret Engine!");
            info("gitHub:",'https://github.com/tommyZZM/gameperture-egret');
            if(isdebug&&banchmark){
                egret.Profiler.getInstance().run();
            }
            GameProfiler.instance;
            a$ =  GameFacade.instance;
            m$ =  GameMemory.instance;
        }

        public launch(){
            root.addEventListener(Core.FacadeEvent.UNIQUE,(<any>a$)._postOffice,a$);
            d$.ready((<any>a$)._display['startup'],(<any>a$)._display)
        }
    }
}
