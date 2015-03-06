module gamep{
    export class MyGame extends GameCycler {

        protected onStartup(data){
            console.log('2.MyGame...onReady()..with',data);
            a$.proxy(AssetsLoaderProxy).loadAssets('preload');
        }

    }
}
