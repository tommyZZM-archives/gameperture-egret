module gamep{
    //游戏场景控制器。
    export class GameCycler extends GameCmder{

        private _assetLoader:Proxy.AssetsLoaderProxy;

        public constructor() {
            super();
            GameFacade.instance['_game']=this;
            //GameFacade.instance['_cmdPostals'].setRoute(notify.CMD.GameReady,this,this.onReady);
            this.addNotifyListener(NotifyType.Cmd,Notify.Cmd.GameReady,this.onStartup);
            this._assetLoader = this.getLogic(Proxy.AssetsLoaderProxy);
            this._assetLoader.addEventListener(Event.AssetsEvent.PRELOAD_READY,this.onPreLoaded,this);
            this._assetLoader.addEventListener(Event.AssetsEvent.ASSET_PROGRESS,this.onAssetProgress,this);
            this._assetLoader.addEventListener(Event.AssetsEvent.ASSET_READY,this._onAssetLoaded,this);
        }

        protected onPreLoaded(){

        }
        protected onAssetProgress(e:Event.AssetsEvent){

        }
        protected onAssetLoaded(e:Event.AssetsEvent){

        }
        private _onAssetLoaded(e:Event.AssetsEvent){
            this._assetLoader.removeEventListener(Event.AssetsEvent.PRELOAD_READY,this.onPreLoaded,this);
            this._assetLoader.removeEventListener(Event.AssetsEvent.ASSET_PROGRESS,this.onAssetProgress,this);
            this._assetLoader.removeEventListener(Event.AssetsEvent.ASSET_READY,this._onAssetLoaded,this);
            this.onAssetLoaded(e);
            this.logoffLogic(this._assetLoader);
        }

        protected onStartup(){
        }

        protected get stage():any{
            return GameFacade.instance['_display'];
        }

        /** @deprecated */
        protected getCommand(command:any):any{
            if(!this._cmdPool.get(command.name)){
                this._cmdPool.set(command.name,new command());
            }
            return this._cmdPool.get(command.name);
        }
        private get _cmdPool():Map<string,GameCmder>{
            return GameFacade.instance['_cmdpool']
        }
    }
}
