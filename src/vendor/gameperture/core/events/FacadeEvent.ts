module gamep {
    export class FacadeEvent extends egret.Event{

        public static UNIQUE:string = 'FacadeEvent0811';
        private _type:any;
        private _courier:any;

        public constructor(type: string,courier?:any[]) {
            //TODO:your code here
            this._type    = type;
            this._courier = courier;
            super(FacadeEvent.UNIQUE, false, false);
        }
    }
}