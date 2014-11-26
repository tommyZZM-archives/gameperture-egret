class GameEvents extends egret.Event{

    public is_first_play:boolean;
    public static GAME_RUN:string = "gameRun";
    private _status:number = 1;
    private _courier:any;

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
        //TODO:your code here
        super(type, bubbles, cancelable);
    }

    public get status(){
        return this._status;
    }

    public set status(status:number){
        this._status = status;
    }

    public set courier(parcel){
        this._courier = parcel;
    }

}