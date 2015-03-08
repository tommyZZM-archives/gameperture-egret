module gamep{
    export class MyGame extends GameCycler {

        protected cmdStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(AssetsLoaderProxy).loadAssets('preload');
            this.proxy(AssetsLoaderProxy).debug = true;
            //console.log(m$.memory(MTemp).get("test"));
        }

    }
}
