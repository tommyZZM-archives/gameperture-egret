module gamep {
    export class FacadeEvent extends egret.Event{

        private _courier:any;

        public constructor(type: string,courier:any[],bubbles:boolean = false, cancelable:boolean = false) {
            //TODO:your code here
            this._courier = courier;
            super(type, bubbles, cancelable);
        }
    }
}