class GameProfiler {

    private static s_fps:number = 0;

    private _fps:number = 0;
    private _lastTime:number = 0;

    public constructor() {
        //TODO:your code here
        this.run();
    }

    private run(){
        constant.stage.addEventListener(egret.Event.ENTER_FRAME,this.calculateFPS,this)
    }

    private calculateFPS(){
        var nowTime:number = egret.getTimer();
        this._fps = 1000/(nowTime-this._lastTime);
        this._lastTime = nowTime;

        GameProfiler.s_fps = this._fps;
    }

    public static get FPS(){
        return this.s_fps.toFixed(0);
    }

    public static rateoffest(worldrate:number = 60){
        return worldrate/GameProfiler.FPS;
    }

}