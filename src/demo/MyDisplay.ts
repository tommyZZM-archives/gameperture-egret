module gamep{
    export class MyDisplay extends GameStage{
        protected onStartup(){
            console.log('1.'+this.name+'...onStartup()');
            a$.addDemandListener(AssetsLoaderProxy,AssetsEvent.ASSET_READY,this.onAssetLoaded,this);

            return 1;
        }

        protected onAssetLoaded(e:AssetsEvent){
            console.log('3.'+this.name+'...onAssetLaded()')
        }

        protected onAssetProgress(e:AssetsEvent){

        }
    }
}
