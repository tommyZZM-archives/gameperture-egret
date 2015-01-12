module gamep.Event{
    export class FacadeEvent extends ProxyEvent{

        public static UNIQUE:string = 'facadeEvent0811';
        private _notify:any;
        private _fatype:NotifyType;

        public constructor(type:NotifyType,notify:string, courier?:any) {
            //TODO:your code here
            this._fatype = type;
            this._notify = notify;
            super(FacadeEvent.UNIQUE, courier);
        }

        public get notify(){
            return this._notify;
        }

        public get fatype():NotifyType{
            return this._fatype;
        }
    }
}