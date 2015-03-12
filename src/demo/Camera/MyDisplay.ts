module game.Camera{
    export class MyDisplay extends gamep.GameStage{

        protected onStartup(){
            trace('1.'+this.name+'...onStartup()');
            new gamep.BroadcastProxy();
            gamep.a$.addDemandListener(gamep.AssetsLoaderProxy,gamep.AssetsEvent.ASSET_READY,this.onAssetLoaded,this);

            console.log("MyDisplay onStartup",stageWidth(),stageHeight());
            var bg = new egret.Shape();
            bg.graphics.beginFill(0x2980b9);
            bg.graphics.drawRect(0,0,stageWidth(),stageHeight());
            bg.graphics.endFill();
            this.forceAddChild(bg);
            gamep.d$.resize(()=>{
                /*bg.graphics.beginFill(0x2980b9);
                bg.graphics.drawRect(0,0,stageWidth(),stageHeight());
                bg.graphics.endFill();*/
            });

            var a = new egret.Shape();
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
