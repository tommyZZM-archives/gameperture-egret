module gamep{
    //游戏场景控制器。
    export class GameCycler extends GameCmder{

        public constructor() {
            super(null);
            GameFacade.instance['_game']=this;
        }

        /**
         * returns { notify: string; callback: Function; }[]
         */
        protected grateRoutes():{ notify: string; callback: Function; }[]{
            return null;
        }

        protected hello(){

        }

        protected get stage():any{
            return GameFacade.instance['_display'];
        }

        //控制器
        protected regCommand(command:GameCmder){
            this._cmdPool.set(command.name,command);
        }
        protected getCommand(name):any{
            return this._cmdPool[name];
        }
        private get _cmdPool():utils.Dictionary{
            return GameFacade.instance['_cmdpool']
        }

        //业务逻辑
        protected regLogic(logic:GameLogicer){
            this._logicPool.set(logic.name,logic);
        }
    }
}
