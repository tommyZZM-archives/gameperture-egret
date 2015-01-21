module gamep {
    export class ProxyEvent extends egret.Event{

        private _courier:any;

        public constructor(type:string, courier?:any) {
            //TODO:your code here
            this._courier = courier;
            super(type, false, false);
        }

        public get courier(){
            return this._courier;
        }
    }
}