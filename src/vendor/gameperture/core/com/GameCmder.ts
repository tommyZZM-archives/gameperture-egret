module gamep {
    //commander
    export class GameCmder implements ICom{

        private _name:string;

        public constructor(name) {
            this._name = name;
            //super();
        }

        protected cmdRoutes():{ notify: string; callback: Function; }[]{
            return null;
        }

        /** @deprecated */
        public createRoutes():{ notify: string; thisobj:any; callback: Function; }[]{
            var rs:any = this.cmdRoutes();
            for(var i in rs){
                rs[i].thisobj = this;
            }
            return rs;
        }

        // @final
        // 看我滥用索引...
        protected get uInterface(){
            return GameFacade.instance['_display']['_uinterface'];
        }

        // @final
        protected get scenery(){
            return GameFacade.instance['_display']['_scenery'];
        }

        public get name(){
            return this._name;
        }

        protected getLogic(name):any{
            return this._logicPool[name];
        }
        protected get _logicPool():utils.Dictionary{
            return GameFacade.instance['_logicpool']
        }
    }
}