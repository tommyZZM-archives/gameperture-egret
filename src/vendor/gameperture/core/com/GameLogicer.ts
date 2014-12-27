module gamep {
    //model
    export class GameLogicer extends egret.EventDispatcher{

        private _name:string;

        public constructor(name) {
            super();
            this._name = name;
            //super();
        }

        protected get object():any{
            return null;
        }

        protected dispatchCall(call:string, ...courier:any[]){
            rootscene.dispatchEvent(new FacadeEvent(notify.call,call,courier));
        }

        public get name(){
            return this._name;
        }
    }
}