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
                gamep.d$.resize(()=>{
                    this.onResize();
                    //stage().changeSize();
                });
                //root.anchorX = root.anchorY = 0.5;
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
            var _client_height = client.height();
            var _client_width  = client.width();

            var game_height = client.renderHeight();
            var game_width = client.renderWidth();

            var orient_callback=()=>{
                d$.select(egret_canvas_container()).transition({rotate: 0});
            };

            var _orient_flag:boolean;
            var _domcsspos=()=>{};
            switch (client.orient){
                case client.Orient.Vertical:{
                    _orient_flag = client.width()>client.height()
                    if(_orient_flag){
                        _client_height = client.width();
                        _client_width  = client.height();
                        orient_callback=()=>{
                            d$.select(egret_canvas_container()).transition({rotate: -90});
                        }
                    }
                    _domcsspos = ()=>{
                        if(per>=client.perfectSize()){
                            _client_height = _client_width*client.perfectSize();
                            game_width = game_height/client.perfectSize();
                        }else{
                            game_height = game_width*per;
                        }
                        //console.log(game_width,game_height,client.renderWidth(),client.renderHeight());
                        egret_canvas_container().style.top = (client.height()-_client_height)/2+"px";
                    };
                    break;
                }
                case client.Orient.Horizontal:{
                    _orient_flag = client.height()>client.width();
                    if(_orient_flag){
                        _client_height = client.width();
                        _client_width  = client.height();
                        orient_callback=()=>{
                            d$.select(egret_canvas_container()).transition({rotate: 90});
                        }
                    }
                    _domcsspos = ()=>{
                        if(per>=client.perfectSize()){
                            game_width = game_height/per;
                        }else{
                            _client_width = _client_height/client.perfectSize();
                            game_height = game_width*client.perfectSize();
                        }
                        if(_orient_flag){
                            egret_canvas_container().style.left = (client.width()-_client_width)/2+"px";
                        }
                    };
                    break;
                }
                default :{
                    _domcsspos = ()=>{
                        var _renderper = client.renderSize()<1?1/client.renderSize():client.renderSize();
                        if(per<_renderper){
                            //console.log(per,"per<<client.renderSize()",client.renderSize());
                            game_width = game_height/per;
                        }else{
                            //console.log(per,"per>>client.renderSize()",client.renderSize());
                            game_height = game_width*per;
                        }
                    };
                    break;
                }
            }

            egret_canvas_container().style.top = "0px";
            egret_canvas_container().style.left = "0px";
            var per = _client_height/_client_width;
            _domcsspos();
            egret_canvas_container().style.top = (client.height()-_client_height)/2+"px";
            egret_canvas_container().style.width = _client_width+"px";
            egret_canvas_container().style.height = _client_height+"px";

            egret_canvas().style.width = _client_width+"px";
            egret_canvas().style.height = _client_height+"px";
            egret_canvas().width = game_width;
            egret_canvas().height = game_height;

            stage()["_stageWidth"] = egret_canvas().width;
            stage()["_stageHeight"] = egret_canvas().height;

            orient_callback();
            egret.StageDelegate.getInstance().setDesignSize(game_width, game_height);
            root.width = stageWidth();
            root.height = stageHeight();

            stage().dispatchEventWith(egret.Event.RESIZE);
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
