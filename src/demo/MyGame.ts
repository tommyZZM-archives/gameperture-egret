module gamep{
    export class MyGame extends GameCycler {

        protected onStartup(){
            console.log('1.MyGame...onReady()');
            this.getProxy(Proxy.AssetsLoaderProxy).loadAssets('preload');
        }

    }
}
