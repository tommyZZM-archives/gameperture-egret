module gp.event {
    export class GameEvent extends egret.Event {

        public static GAME_RUN:string = "gameRun";
        private _statu:any;
        //private _chick:any;

        public constructor(statu:any,bubbles:boolean = false, cancelable:boolean = false) {
            //TODO:your code here
            this._statu = statu;
            super(GameEvent.GAME_RUN, bubbles, cancelable);
        }

        public get statu():any {
            return this._statu + '';
        }
        /*public updatestatu(statu?:any) {
            statu ? this._statu = statu : this._statu = this._next_statu;
        }

        public set courier(parcel) {
            this._courier = parcel;
        }*/
    }
}

