module gamep {
    export module Core {
        export class FacadeEvent extends ProxyEvent {

            public static UNIQUE:string = 'facadeEvent0811';
            private _notify:any;
            private _fatype:NotifyType;

            public constructor() {
                //:your code here
                super(FacadeEvent.UNIQUE);
            }

            public setflag(type:NotifyType, notify:string, courier?:any){
                this._fatype = type;
                this._notify = notify;
                this._courier = courier;
            }

            public get notify() {
                return this._notify;
            }

            public get fatype():NotifyType {
                return this._fatype;
            }
        }
    }
}