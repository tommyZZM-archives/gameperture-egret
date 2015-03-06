module gamep{
    export class MyGame extends GameCycler {

        protected onStartup(data){
            console.log('2.MyGame...onReady()..with',data);
            this.proxy(AssetsLoaderProxy).loadAssets('preload');
            //console.log(a$.memory(GameMemory));
        }

    }
}
