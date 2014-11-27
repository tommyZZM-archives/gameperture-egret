class GameEvents extends egret.Event{

    public static GAME_RUN:string = "gameRun";
    private _status:any = GameStatus.NOTRUN;
    private _courier:any;

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
        //TODO:your code here
        super(type, bubbles, cancelable);
    }

    public get status():any{
        return this._status+'';
    }

    public set status(status:any){
        this._status = status;
    }

    public set courier(parcel){
        this._courier = parcel;
    }

}

class GameStatus{
    public static NOTRUN = -1;
    public static READY = 1;
    public static PLAYING = 2;
    public static OVER = 0;
}