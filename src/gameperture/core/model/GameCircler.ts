module gp.model{
    export class GameCircler {

        private _objpool:util.ObjectPool;
        private _setting:any;
        private _router:RouteDictionary;
        private _display:any;

        public constructor(display:gp.viewc.GameDisplay) {
            this._display = display;
            this._display.addEventListener(event.GameEvents.GAME_RUN,this._onToggleStatus,this);
            this._router = new RouteDictionary(this._initRoutes());
            this._router.addgroup(this._customRoutes());
            this._objpool = new util.ObjectPool();//TODO:对象池
            if(!this._router.numkeys){
                console.error('must initialize routes in _initRoutes()');
            }
        }

        /** 映射路由 **/
        private _initRoutes():{ key: number; value: Function; }[]{
            return [
                {key:GameStatus.READY,value:this.zReadyWrapper},
                {key:GameStatus.PLAYING,value:this.zPlayingWrapper},
                {key:GameStatus.OVER,value:this.zOverWrapper},
                {key:GameStatus.RESTART,value:this.zRestartWrapper}
            ];
        }

        public _customRoutes():{ key: number; value: Function; }[]{
            return null;
        }

        /** 设置文件 **/
        public addSetting(setting:string){
            this._setting = setting;
        }

        public get setting():gp.config.gamesetting{
            return gp.config.gamesetting.getInstance();
        }

        public zPreLoadWrapper(){
            rootscene.addChild(this.display);
            this._onPreLoad();
        }
        public zAllLoadWrapper(){
            if(this._setting){this._setting = config.gamesetting.getInstance(this._setting)}else{trace('no default setting')}
            this.display.dispatchStatu();
            this._onAllLoad();
        }
        public zReadyWrapper(e:event.GameEvents){
            this.display.readyBoard();
            this._onReady(e);
        }
        public zPlayingWrapper(e:event.GameEvents){
            this.display.playingBoard();
            this._onPlaying(e);
        }
        public zOverWrapper(e:event.GameEvents){
            this.display.overBoard();
            this._onOver(e);
        }
        public zRestartWrapper(e:event.GameEvents){
            this.display.restarBoard();
            this._onRestart(e);
            config.gamevar.isFirstPlay = false;
        }

        public _onPreLoad(){}
        public _onAllLoad(){console.error('_onAllLoad must be override!');}
        public _onProgress(){}
        public _onReady(e:event.GameEvents){console.error('_onStart must be override!');}
        public _onPlaying(e:event.GameEvents){console.error('_onPlaying must be override!');}
        public _onOver(e:event.GameEvents){console.error('_onOver must be override!');}
        public _onRestart(e:event.GameEvents){console.error('_onRestart must be override!');}

        /**
         * 状态切换器
         * @param e
         */
        private _onToggleStatus(e:event.GameEvents){
            this._router[e.statu].apply(this);
        }

        private get display(){
            return this._display;
        }

        public gameGover(){
            this.display.dispatchStatu(GameStatus.OVER);
            this._pauseEnterFrame();
        }

        /**
         * 场景控制
         */

        //@protected @final
        public viewAddChild(...obj:egret.DisplayObject[]){
            for(var i in obj){
                this.display._mainground.addChild(obj[i]);
            }
        }

        //@protected @final
        public viewSelectUI(name):any{
            return this._display._interface.select(name);
        }

        //@protected
        public _onEnterFrame(){
            //TODO:每帧的回调函数
        }

        //@protected @final
        public _pauseEnterFrame(){
            rootscene.removeEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame,this);
        }

        //@protected @final
        public _startEnterFrame(){
            rootscene.addEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame,this);
        }

    }
}
