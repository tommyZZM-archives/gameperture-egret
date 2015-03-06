module gamep{
    export class MyGame extends GameCycler {

        protected onStartup(data){
            trace('2.MyGame...onReady()..with',data);
            this.proxy(AssetsLoaderProxy).loadAssets('preload');
            this.proxy(AssetsLoaderProxy).debug = true;
        }

    }
}
