module gamep{
    //游戏场景控制器。
    export class GameCycler extends GameCmder{

        public constructor() {
            super();
            GameFacade.instance['_game']=this;
            //GameFacade.instance['_cmdPostals'].setRoute(notify.CMD.GameReady,this,this.onReady);
            this.addNotifyListener(NotifyType.Cmd,Notify.Cmd.GameReady,this.onReady);
        }

        /**
         * returns { notify: string; callback: Function; }[]
         */
        protected cmdRoutes():{ notify: string; callback: Function; }[]{
            return null;
        }

        protected onReady(){
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
