module gamep{
    export var a$:GameFacade;
    export var m$:GameMemory;
    export var d$:domele.GIDomManager;
    export var c$:canvasele.GIDisplay;

    export class GameLauncher{//implements GamePertureInterface

        private _facade:GameFacade;

        public constructor(renderparam:{width:number;height:number;free?:boolean;offset?:number},debug:boolean=true,banchmark:boolean=true) {
            isdebug = debug;
            client.setRender(renderparam.width,renderparam.height,renderparam.free,renderparam.offset);
            quickdebug.init();
            info("%cGameperture","color:#1ac2ff;font-weight:bold;",
                "A Quick Game Devlope Template for Egret Engine!");
            info("gitHub:",'https://github.com/tommyZZM/gameperture-egret');
            //info("curr egret version","1.6.0");
            if(isdebug&&banchmark){
                egret.Profiler.getInstance().run();
            }

            c$ =  canvasele.GIDisplay.instance;
            d$ =  domele.GIDomManager.instance;
            GameContext.instance;
            a$ =  GameFacade.instance;
            m$ =  GameMemory.instance;

            //p$ =  canvasele.GamePosition.instance;
        }

        public launch(){
            this._facade = a$;
            root.addEventListener(Core.FacadeEvent.UNIQUE,(<any>a$)._postOffice,a$);
            d$.ready((<any>a$)._display['startup'],(<any>a$)._display)
        }
    }
}
