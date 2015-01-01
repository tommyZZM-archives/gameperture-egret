module gamep{
    export class MyGame extends GameCycler {

        protected onStartup(){
            console.log('1.MyGame...onReady()');
            this.getLogic(Proxy.AssetsLoaderProxy).loadAssets('preload');
        }

        protected onAssetLoaded(e:Event.AssetsEvent){
            console.log('2.MyGame...onAssetLaded()')
        }

        protected onAssetProgress(e:Event.AssetsEvent){

        }

    }
}
