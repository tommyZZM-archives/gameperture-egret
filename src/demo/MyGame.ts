module gamep{
    export class MyGame extends GameCycler {

        public static TESTCOMMAND:string = "TESTCOMMAND";

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(AssetsLoaderProxy).loadAssets('preload');
            this.proxy(AssetsLoaderProxy).debug = true;

            (<CameraProxy>this.proxy(CameraProxy)).lookat(new egret.Point(stageWidth(0.5),stageHeight(0.5)),1)
        }

    }
}
