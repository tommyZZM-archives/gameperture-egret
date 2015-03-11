module game.Camera{
    export class MyDisplay extends gamep.GameStage{

        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            new gamep.BroadcastProxy();
            gamep.a$.addDemandListener(gamep.AssetsLoaderProxy,gamep.AssetsEvent.ASSET_READY,this.onAssetLoaded,this);

            var a = new egret.Sprite();
            a.width = a.height = 200;
            a.graphics.beginFill(0xffffff);
            a.graphics.drawCircle(a.width/2,a.height/2,100);
            a.graphics.endFill();
            a.anchorX = a.anchorY = 0.5;
            a.x = stageWidth(0.5);a.y=stageHeight(0.5);
            this.forceAddChild(a);
        }

        protected onAssetLoaded(e:gamep.AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
        }

        protected onAssetProgress(e:gamep.AssetsEvent){

        }
    }
}
