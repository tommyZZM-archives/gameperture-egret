class GameEvents extends egret.Event{

    public static GAME_RUN:string = "gameRun";
    private _statu:any = GameStatus.NOTRUN;
    private _next_statu:any;
    private _courier:any;

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
        //TODO:your code here
        super(type, bubbles, cancelable);
    }

    public get statu():any{
        return this._statu+'';
    }

    public updatestatu(statu?:any){
        statu?this._statu = statu:this._statu = this._next_statu;
    }

    public set nextstatu(statu:any){
        this._next_statu = statu;
    }

    public set courier(parcel){
        this._courier = parcel;
    }

}

class GameStatus{
    public static NOTRUN = -2;
    public static READY = 1;
    public static PLAYING = 2;
    public static RESTART = -1;
    public static OVER = 0;
}