module gamep{
    export class MyDisplay extends GameStage{

        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            new BroadcastProxy()
            a$.addDemandListener(AssetsLoaderProxy,AssetsEvent.ASSET_READY,this.onAssetLoaded,this);
            //a$.addBroadcastListener("testbroadcast",this.onTest,this);
            //m$.memory(MTemp).set("test",233);
        }

        protected onAssetLoaded(e:AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
            a$.dispatchCmd(MyGame,MyGame.TESTCOMMAND);
        }

        protected onAssetProgress(e:AssetsEvent){

        }

        private onTest(){

        }
    }
}
