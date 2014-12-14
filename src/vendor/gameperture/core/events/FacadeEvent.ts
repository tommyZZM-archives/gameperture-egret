module gamep {
    export class FacadeEvent extends egret.Event{

        public static UNIQUE:string = 'FacadeEvent0811';
        private _notify:any;
        private _courier:any;

        public constructor(notify:string, courier?:any[]) {
            //TODO:your code here
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
    }
}