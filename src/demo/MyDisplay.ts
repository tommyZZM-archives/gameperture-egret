module gamep{
    export class MyDisplay extends GameStage{

        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            new BroadcastProxy()
            a$.addDemandListener(AssetsLoaderProxy,AssetsEvent.ASSET_READY,this.onAssetLoaded,this);
        }

        protected onAssetLoaded(e:AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');

            var a = new egret.Sprite();
            a.width = a.height = 200;
            a.graphics.beginFill(0xffffff);
            a.graphics.drawCircle(a.width/2,a.height/2,100);
            a.graphics.endFill();
            a.anchorX = a.anchorY = 0.5;
            a.x = stageWidth(0.5);a.y=stageHeight(0.5);
            this.forceAddChild(a)
        }

        protected onAssetProgress(e:AssetsEvent){

        }
    }
}
