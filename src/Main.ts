class Main extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private start(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);

        new gamep.MyGame();
        new gamep.MyGameDisplay(this);
        (new gamep.GameLauncher(true)).launch();
    }

    //Devlog:
    //20141230 done:用Map()和Set()代替字典
    //201511   TODO:场景切换

}