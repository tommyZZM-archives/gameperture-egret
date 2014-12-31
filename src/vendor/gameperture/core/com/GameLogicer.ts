module gamep {
    //model
    export class GameLogicer extends egret.EventDispatcher{

        private _name:string;

        public constructor(name) {
            super();
            this._name = name;
            //super();
        }

        protected getObject(scenery:string,obj:string):any{
            return GameFacade.instance['_display'].selectChild(scenery).selectChild(obj);
        }

        protected dispatchCall(call:string, ...courier:any[]){
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Result,call,courier));
        }

        public get name(){
            return this._name;
        }
    }
}