module game.Camera{
    export class MyGame extends gamep.GameCycler {

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(gamep.AssetsLoaderProxy).loadAssets('preload');
            this.proxy(gamep.AssetsLoaderProxy).debug = true;
            (<gamep.CameraProxy>this.proxy(gamep.CameraProxy)).lookat(new egret.Point(stageWidth(0.5),stageHeight(0.5)),1,1000);

            //gamep.a$.addTimeListener(gamep.TickerType.ON_SECOND,()=>{
            //    trace(Math.probabilityPool([0.3,0.4,0.1,0.3]));
            //},this)

        }

    }
}
