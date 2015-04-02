module gamep{
    export function rateoffest(worldrate:number = 60):number {
        return worldrate / GameContext.instance.FPS;
    }

    export class GameContext extends egret.EventDispatcher{

        private _fps:number = 0;
        private _lastTime:number = 0;

        private _totalmicrosecond:number = 0;
        private _totalsecond:number = 0;

        private _countmillisecond:number = 0;
        private _countsecond:number = 0;

        public constructor() {
            super();
            this.egretHack();
            this.run();
        }

        private _onnextframetask:Array<Function>;
        private _onreadyframetask:Array<Function>;

        private _on100mircrosecond:gamep.Core.TickerEvent;
        private _onsecond:gamep.Core.TickerEvent;
        private run(){
            this._onnextframetask = [];
            this._onreadyframetask = [];

            this._on100mircrosecond = <gamep.Core.TickerEvent>ProxyEvent.newEvent(Core.TickerEvent,TickerType.ON_MILLSECOND100+"");
            this._onsecond = <gamep.Core.TickerEvent>ProxyEvent.newEvent(Core.TickerEvent,TickerType.ON_SECOND+"");
            root.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            gamep.d$.ready(()=>{
                this.onResize();
                gamep.d$.resize(()=>{
                    this.onResize();
                    //stage().changeSize();
                });
                //root.anchorX = root.anchorY = 0.5;
            });
        }

        /**
         * 计算FPS
         */
        private onEnterFrame(){
            /**calculateFPS**/
            var nowTime:number = egret.getTimer();
            var dt = nowTime-this._lastTime;
            this._countsecond+=dt;
            this._countmillisecond+=dt;

            for(var i:number=0;i<(+(this._countmillisecond/100)^0);i++){
                this._totalmicrosecond++;
                this._on100mircrosecond.conut = this._totalmicrosecond;
                this.dispatchEvent(this._on100mircrosecond);
                if(i>=(+(this._countmillisecond/100)^0)-1){
                    this._countmillisecond = 0;
                }
            }

            for(var i:number=0;i<(+(this._countsecond/1000)^0);i++){
                this._totalsecond++;
                this._onsecond.conut = this._totalsecond;
                this.dispatchEvent(this._onsecond);
                if(i>=(+(this._countsecond/1000)^0)-1){
                    this._countsecond = 0;
                }
            }

            this._fps = 1000/dt;
            this._lastTime = nowTime;

            /**FrameTask**/
            for(var i=0;i<this._onreadyframetask.length;i++){
                var fn = this._onreadyframetask[i];
                if(fn instanceof Function)fn();
            }
            this._onreadyframetask = [];
            this._onreadyframetask = this._onnextframetask;
            this._onnextframetask = [];
        }

        public pushNextFrameTask(fn:Function){
            this._onnextframetask.push(fn);
        }

        /**
         * 横竖屏以及大小动态适应
         */
        //NOTE:优化
        private _hastransitionendlisten:boolean;
        private onResize(){
            var container = new egret.EqualToFrame();
            this._contentstrategy = new gamep.AutoOrient();
            var policy = new egret.ResolutionPolicy(container, this._contentstrategy);
            egret.StageDelegate.getInstance()._setResolutionPolicy(policy);
            if(!this._hastransitionendlisten) {
                this._hastransitionendlisten = true;
                client.canvas_container().addEventListener('webkitTransitionEnd', ()=> {
                    client.canvas_container().removeEventListener('webkitTransitionEnd', <any>arguments.callee, false);
                    this._hastransitionendlisten = false;
                    stage().dispatchEventWith(egret.Event.RESIZE);
                }, false)
            }
            client.context().rendererContext["onResize"]();
            egret.RenderFilter.getInstance()["_defaultDrawAreaList"] = null;
            root.width = stageWidth();
            root.height = stageHeight();
        }

        /**
         * 改进egret内置的方法
         */
        private _contentstrategy:gamep.AutoOrient;
        private egretHack(){
            trace("egretHacked");
            if(client.context().rendererContext instanceof egret.HTML5CanvasRenderer){
                trace("client.context().rendererContext instanceof egret.HTML5CanvasRenderer")
                implementMethod(client.context().rendererContext,"onRenderFinish",this.onRenderFinish);
            }

            /**
             * improve TouchContext
             */
            var relocationtouch = (x,y)=>{
                var tmp:number;
                switch (this._contentstrategy.orient){
                    default :
                    case 0:{
                        break;
                    }
                    case -90:{
                        tmp = x;
                        x = stageWidth()-y;
                        y = tmp;
                        break;
                    }
                    case 90:{
                        tmp = x;
                        x = y;
                        y = stageHeight()-tmp;
                        break;
                    }
                }
                return {x:x,y:y}
            };
            implementMethod(client.context().touchContext, "onTouchBegan",
                (x:number, y:number, identifier:number)=>{
                    var result = relocationtouch(x,y);
                    x = result.x;
                    y = result.y;
                    client.context().touchContext["__origin__"]["onTouchBegan"](x,y,identifier)
                }
            );
            implementMethod(client.context().touchContext, "onTouchMove",
                (x:number, y:number, identifier:number)=>{
                    var result = relocationtouch(x,y);
                    x = result.x;
                    y = result.y;
                    client.context().touchContext["__origin__"]["onTouchMove"](x,y,identifier)
                }
            );
            implementMethod(client.context().touchContext, "onTouchEnd",
                (x:number, y:number, identifier:number)=>{
                    var result = relocationtouch(x,y);
                    x = result.x;
                    y = result.y;
                    client.context().touchContext["__origin__"]["onTouchEnd"](x,y,identifier)
                }
            );
        }

        private onRenderFinish(){
            //trace("onRenderFinish...hack");
            var that:any = this;
            that.drawCanvasContext.restore();
            that.drawCanvasContext.setTransform(1, 0, 0, 1, 0, 0);

            if(that.useCacheCanvas) {
                var canvasWidth = that._cacheCanvas.width;
                var canvasHeight = that._cacheCanvas.height;
                var list = egret.RenderFilter.getInstance().getDrawAreaList();
                for (var i:number = 0 , l:number = list.length; i < l; i++) {
                    var area:any = list[i];
                    var areaX = area.x;
                    var areaY = area.y;
                    var areaWidth = area.width;
                    var areaHeight = area.height;
                    if (areaX + areaWidth > canvasWidth) {
                        areaWidth = canvasWidth - areaX;
                    }
                    if (areaY + areaHeight > canvasHeight) {
                        areaHeight = canvasHeight - areaY;
                    }

                    //var canvasData:ImageData = that._cacheCanvasContext.getImageData(0,0,areaWidth,areaHeight);
                    //TODO:applyFilter
                    //var resultData = (<any>a$).proxy(FilterProxy).filter.call(this,canvasData);
                    //that._cacheCanvasContext.putImageData(canvasData,0,0);

                    if (areaWidth > 0 && areaHeight > 0) {
                        that.canvasContext.drawImage(that._cacheCanvas, areaX, areaY, areaWidth, areaHeight, areaX, areaY, areaWidth, areaHeight);
                    }
                }
            }
        }

        public get FPS():number{
            return this._fps;
        }

        //instance mode
        private static _instance:GameContext;
        public static get instance():GameContext{
            if (GameContext._instance == null) {
                GameContext._instance = new GameContext();
            }
            return GameContext._instance;
        }
    }
}
