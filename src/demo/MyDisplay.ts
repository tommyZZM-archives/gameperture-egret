module gamep{
    export class MyDisplay extends GameStage{
        protected onStartup(){
            this.addFeedbackListener(AssetsLoaderProxy,Event.AssetsEvent.ASSET_READY,this.onAssetLoaded,this)
        }

        protected onAssetLoaded(e:Event.AssetsEvent){
            console.log('2.'+this.name+'...onAssetLaded()')
        }

        protected onAssetProgress(e:Event.AssetsEvent){

        }
    }
}
