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
            this.uinterface.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                trace("touch");
            },this);

            var test = gamep.d$.$("#testbtn");
            test.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this);
            test.addEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this);
            //trace(test.parents());
        }

        private touchBegin(e){
            //trace('touchBegin')
            e.target.css()["border-radius"]= "100%";
            e.target.css()["-webkit-transform"]= "scale(0.8,0.8)";
            //trace(e.target.css()["border-radius"]);
        }

        private touchEnd(e){
            e.target.css()["border-radius"]= "20%";
            e.target.css()["-webkit-transform"]= "scale(1,1)";
        }

        protected onAssetLoaded(e:gamep.AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
        }

        protected onAssetProgress(e:gamep.AssetsEvent){

        }
    }
}
