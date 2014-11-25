class GamePerture {

    private _game

    public constructor(stage:egret.DisplayObjectContainer,debug:boolean) {
        constant.stage = stage;
        constant.debug = debug;
        if(constant.debug){
            egret.Profiler.getInstance().run();
        }
        new GameProfiler();

        //constant.stage.addEventListener(egret.Event.ENTER_FRAME,this.test,this)
    }


}