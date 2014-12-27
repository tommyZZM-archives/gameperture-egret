module gamep {
    //commander
    export class GameCmder {

        private _name:string;

        public constructor(name) {
            this._name = name;
            //super();
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