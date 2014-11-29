class Main extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private start(e:egret.Event){
        //初始化游戏
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);

        var display = new MyDisplay();
        var game    = new MyGame(display);
        var launch  = new gp.GameLauncher(this,game,true);
        launch.loadAssets("preload","testload","testload2");
    }

}