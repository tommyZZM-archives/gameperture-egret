module gamep{
    //游戏场景控制器。
    export class GameCycler extends GameCmder{

        public constructor() {
            super(null);
            GameFacade.instance['_game']=this;
            this._regCommands();
        }

        protected regCommands():GameCmder[]{
            return null;
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

        //控制器
        private _regCommands(){
            for(var i in this.regCommands()){
                var cmd = (this.regCommands())[i];
                if(cmd)this._cmdPool.set(cmd.name,cmd);
            }
        }
        protected getCommand(name):any{
            return this._cmdPool[name];
        }
        private get _cmdPool():utils.Dictionary{
            return GameFacade.instance['_cmdpool']
        }
    }
}
