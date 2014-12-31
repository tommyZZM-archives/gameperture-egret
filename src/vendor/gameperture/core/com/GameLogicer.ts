module gamep {
    //model
    export class GameLogicer extends egret.EventDispatcher{

        private _name:string;

        public constructor(name) {
            super();
            this._name = this['__proto__']['__class__'];
            //super();
        }

        protected getObject(scenery:string,obj:string):any{
            return GameFacade.instance['_display'].selectChild(scenery).selectChild(obj);
        }

        protected dispatchCall(controller:any,call:string, ...courier:any[]){
            root.dispatchEvent(new Event.FacadeEvent(NotifyType.Result,call+controller.name,courier));
        }

        public get name(){
            return this._name;
        }
    }
}