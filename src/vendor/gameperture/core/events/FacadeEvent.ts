module gamep.Event{
    export class FacadeEvent extends egret.Event{

        public static UNIQUE:string = 'facadeEvent0811';
        private _notify:any;
        private _courier:any;
        private _fatype:string;

        public constructor(type:string,notify:string, courier?:any[]) {
            //TODO:your code here
            this._fatype = type;
            this._notify = notify;
            this._courier = courier;
            super(FacadeEvent.UNIQUE, false, false);
        }

        public get notify(){
            return this._notify;
        }

        public get courier(){
            return this._courier;
        }

        public get fatype(){
            return this._fatype;
        }
    }
}