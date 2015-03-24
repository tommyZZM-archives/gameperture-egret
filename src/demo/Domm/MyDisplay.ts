module game.Domm{
    export class MyDisplay extends gamep.GameStage{

        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            new gamep.BroadcastProxy();
            gamep.a$.addDemandListener(gamep.AssetsLoaderProxy,gamep.AssetsEvent.ASSET_READY,this.onAssetLoaded,this);
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x2980b9);
            bg.graphics.drawRect(0,0,stageWidth(),stageHeight());
            bg.graphics.endFill();
            this.forceAddChild(bg);
            gamep.d$.resize(()=>{
                bg.graphics.beginFill(0x2980b9);
                bg.graphics.drawRect(0,0,stageWidth(),stageHeight());
                bg.graphics.endFill();
            });

            bg.width = stageWidth();
            bg.height = stageHeight();
            bg.touchEnabled = true;
            bg.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                trace("touch");
            },this)
        }

        protected onAssetLoaded(e:gamep.AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
        }

        protected onAssetProgress(e:gamep.AssetsEvent){

        }
    }
}
