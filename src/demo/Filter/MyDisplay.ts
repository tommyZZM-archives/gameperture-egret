module game.Filter{
    export class MyDisplay extends gamep.GameStage{

        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            gamep.a$.addDemandListener(gamep.AssetsLoaderProxy,gamep.AssetsEvent.ASSET_READY,this.onAssetLoaded,this);

            var bg = new egret.Shape();
            bg.graphics.beginFill(0x2980b9);
            bg.graphics.drawRect(0,0,stageWidth(),stageHeight());
            bg.graphics.endFill();
            this.forceAddChild(bg);

            var a = new egret.Shape();
            a.width = a.height = 200;
            a.graphics.beginFill(0xffffff);
            a.graphics.drawCircle(a.width/2,a.height/2,100);
            a.graphics.endFill();
            a.anchorX = a.anchorY = 0.5;
            gamep.c$.position.lockPosition(a,0.5,0.5);
            this.forceAddChild(a);
        }

        protected onAssetLoaded(e:gamep.AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
        }

        protected onAssetProgress(e:gamep.AssetsEvent){

        }
    }
}
