module game.Filter{
    export class MyGame extends gamep.GameCycler {

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            //this.proxy(gamep.AssetsLoaderProxy).
            this.assetsLoadP.resourceConfig = "resource/resource_custom.json";
            this.proxy(gamep.AssetsLoaderProxy).loadAssets('preloadhaha');
            this.proxy(gamep.AssetsLoaderProxy).debug = true;

            this.proxy(gamep.FilterProxy).applyGlobalFilter((imagedata)=>{
                //trace("filter");
                //for (var i = 0, n = imagedata.data.length; i < n; i += 4) {
                //    imagedata.data[i + 0] = 255 - imagedata.data[i + 0]; //red;
                //    imagedata.data[i + 1] = 255 - imagedata.data[i + 1]; //green
                //    imagedata.data[i + 2] = 255 - imagedata.data[i + 2]; //blue
                //    //imagedata.data[i + 3] = 255 - imagedata.data[i + 3]; //a
                //}
                return imagedata;
            });
            //(<CameraProxy>this.proxy(CameraProxy)).lookat(new egret.Point(stageWidth(0.5),stageHeight(0.5)),1)
        }

    }
}
