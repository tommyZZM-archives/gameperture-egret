
var demo:string;
class Main extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private start(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);

        if(!demo)demo = "HelloWorld";
        //console.log(demo);

        new this.demolist[demo].Cyc();
        new this.demolist[demo].Display(this);
        (new gamep.GameLauncher(320,480,true)).launch();
    }

    private demolist = {
        HelloWorld:{
           Cyc:game.HelloWorld.MyGame,
           Display:game.HelloWorld.MyDisplay
        },
        Camera:{
            Cyc:game.Camera.MyGame,
            Display:game.Camera.MyDisplay
        }
    };

    //Devlog:
    //20141230 done:用Map()和Set()代替字典
    //201511   TODO:场景切换
    //201503   CameraProxy;FliterProxy;FuildDeviceApply

}