module gamep{

    export var FPS:number = 0;
    export function rateoffest(worldrate:number = 60):number {
        return worldrate / FPS;
    }
    var countsecond:number = 0;
    var countmicrosecond:number = 0;

    export class GameProfiler extends egret.EventDispatcher{

        private _fps:number = 0;
        private _lastTime:number = 0;

        private _countmillisecond:number = 0;
        private _countsecond:number = 0;

        public constructor() {
            super();
            this.run();
        }

        private run(){
            root.addEventListener(egret.Event.ENTER_FRAME,this.calculateFPS,this);
            gamep.d$.ready(()=>{
                this.onResize();
                stage().changeSize();
                gamep.d$.resize(this.onResize,this);
                root.width = stageWidth();
                root.height = stageHeight();
                root.anchorX = root.anchorY = 0.5;
            });

        }

        private calculateFPS(){
            var nowTime:number = egret.getTimer();
            var dt = nowTime-this._lastTime;
            this._countsecond+=dt;
            this._countmillisecond+=dt;

            for(var i:number=0;i<(+(this._countmillisecond/100)^0);i++){
                countmicrosecond++;
                this.dispatchEvent(new gamep.Core.ProfilerEvent(TimeEvent.ON_MILLSECOND100,countmicrosecond));
                if(i>=(+(this._countmillisecond/100)^0)-1){
                    this._countmillisecond = 0;
                }
            }

            for(var i:number=0;i<(+(this._countsecond/1000)^0);i++){
                countsecond++;
                this.dispatchEvent(new gamep.Core.ProfilerEvent(TimeEvent.ON_SECOND,countsecond));
                if(i>=(+(this._countsecond/1000)^0)-1){
                    this._countsecond = 0;
                }
            }

            this._fps = 1000/dt;
            this._lastTime = nowTime;

            FPS = this._fps;
        }

        //TODO:优化
        private onResize(){
            var c_temp:number;
            var GameWin = {w:client.renderWidth,h:client.renderHeight};

            switch (client.orient){
                case client.Orient.Vertical:{
                    if(client.width()>client.height()){
                        //c_temp = GameWin.w;
                        //GameWin.w = GameWin.h;
                        //GameWin.h = c_temp;
                    }
                    //d$.select(egret_canvas_container()).transition({rotate: 0})
                }
            }

            var Gper = GameWin.h/GameWin.w;
            var per = client.height()/client.width();
            if(per<Gper){
                GameWin.w = GameWin.h/per;
            }else{
                GameWin.h = GameWin.w*per;
            }

            egret_canvas_container().style.top = "0px";
            egret_canvas_container().style.width = client.width()+"px";
            egret_canvas_container().style.height = client.height()+"px";
            //egret_canvas_container().style.margin = "0 0";

            egret_canvas().style.width = client.width()+"px";
            egret_canvas().style.height = client.height()+"px";
            egret_canvas().width = GameWin.w;
            egret_canvas().height = GameWin.h;

            stage()["_stageWidth"] = egret_canvas().width;
            stage()["_stageHeight"] = egret_canvas().height;

            //root.width = stageWidth();
            //root.height = stageHeight();
            root.x = stageWidth(0.5);
            root.y = stageHeight(0.5);

            //console.log("onResize",stageWidth(),stageHeight());
            egret.StageDelegate.getInstance().setDesignSize(GameWin.w, GameWin.h);
            stage().changeSize();

        }

        //instance mode
        private static _instance:GameProfiler;
        public static get instance():GameProfiler{
            if (GameProfiler._instance == null) {
                GameProfiler._instance = new GameProfiler();
            }
            return GameProfiler._instance;
        }
    }
}
