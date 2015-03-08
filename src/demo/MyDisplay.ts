module gamep{
    export class MyDisplay extends GameStage{
        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            a$.addDemandListener(AssetsLoaderProxy,AssetsEvent.ASSET_READY,this.onAssetLoaded,this);

            //m$.memory(MTemp).set("test",233);
        }

        protected onAssetLoaded(e:AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
        }

        protected onAssetProgress(e:AssetsEvent){

        }
    }
}
