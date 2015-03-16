
var demo:any;
class Main extends egret.DisplayObjectContainer{

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
    }

    private start(){
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);

        if(!demo)demo = {
            name: "HelloWorld"
        };
        //console.log(demo);

        var width = 320;
        var height = 480;
        if(demo.width&&demo.height){
            width = demo.width;
            height = demo.height
        }

        new this.demolist[demo.name].Cyc();
        new this.demolist[demo.name].Display(this);
        (new gamep.GameLauncher(width,height,true)).launch();
    }
    private demosize = {
        width:320,
        height:480
    };
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