module gamep{
    export class MyDisplay extends GameStage{
        protected onStartup(){
            this.addProxyListener(AssetsLoaderProxy,AssetsEvent.ASSET_READY,this.onAssetLoaded,this)
        }

        protected onAssetLoaded(e:AssetsEvent){
            console.log('2.'+this.name+'...onAssetLaded()')
        }

        protected onAssetProgress(e:AssetsEvent){

        }
    }
}
