module gamep{
    //游戏场景控制器。
    export class GameCycler extends GameCmder{

        //private _assetLoader:Proxy.AssetsLoaderProxy;

        public constructor() {
            super();
            GameFacade.instance['_game']=this;
            //GameFacade.instance['_cmdPostals'].setRoute(notify.CMD.GameReady,this,this.onReady);
            this.addCmdHandler(Notify.Cmd.GameReady,this.cmdStartup);
        }

        protected cmdStartup(...courier){
        }

        protected get stage():any{
            return GameFacade.instance['_display'];
        }

        /** @deprecated */
        /*private getCommand(command:any):any{
            return GameFacade.instance['getCommand'](command);
        }*/
    }
}
