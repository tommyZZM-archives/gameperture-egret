class Main extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private start(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);

        new MyGame();
        new MyGameDisplay(this);
        (new gamep.GameLauncher(true)).launch();
    }

    //Devlog:
    //20141230 TODO:用Map()和Set()代替字典

}