class Main extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private start(e:egret.Event){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);

        var game = new MyGame();
        var display = new MyGameDisplay(this);

        var launch  = new gamep.GameLauncher(game,display,true);
        launch.launchWith("preload", "testload", "testload2");
    }

}