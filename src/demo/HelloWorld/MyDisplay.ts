module game.HelloWorld{
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

            var a = new egret.Sprite();
            a.width = a.height = 100;
            a.graphics.beginFill(0xffffff);
            a.graphics.drawRect(0,0,100,100);
            a.graphics.endFill();
            a.anchorX = a.anchorY = 0.5;
            gamep.p$.lockPosition(a,0.5,0.5);
            this.forceAddChild(a);

            a.touchEnabled = true;
            a['shawod'] = new egret.Shape();
            a['shawod'].graphics.beginFill(0x000000,0.6);
            a['shawod'].graphics.drawCircle(a.width/2,a.height/2,100);
            a['shawod'].graphics.endFill();
            a['shawod'].alpha = 0;
            a['selected'] = false;

            //a['update'] = function(){
            //    this.selected?egret.Tween.get(this).to({scaleX:0.8,scaleY:0.8},200):egret.Tween.get(this).to({scaleX:1,scaleY:1},200);
            //};

            a.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            a.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,this.onTouchEnd,this);
            a.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }

        protected onAssetLoaded(e:gamep.AssetsEvent){
            trace('3.'+this.name+'...onAssetLaded()');
        }

        protected onAssetProgress(e:gamep.AssetsEvent){

        }

        protected onTouchBegin(e:egret.Event){
            //console.log('onTouchBegin');
            egret.Tween.get(e.target).to({scaleX:0.8,scaleY:0.8},200);
        }

        protected onTouchEnd(e:egret.Event){
            //console.log('onTouchEnd');
            egret.Tween.get(e.target).to({scaleX:1,scaleY:1},200);
        }
    }
}
