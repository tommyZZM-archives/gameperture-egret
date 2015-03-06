module gamep{
    export class MyGame extends GameCycler {

        protected onStartup(data){
            console.log('2.MyGame...onReady()..with',data);
            $.proxy(AssetsLoaderProxy).loadAssets('preload');
        }

    }
}
