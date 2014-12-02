module gp.model{
    export class GameCycler {

        //private _objpool:util.ObjectPool;
        private _setting:any;
        private _router:RouteDictionary;
        private _display:any;

        public constructor(display:gp.viewc.GameDisplay) {
            this._display = display;
            this._display.addEventListener(event.GameEvents.GAME_RUN,this._onToggleStatus,this);
            this._router = new RouteDictionary(this._initRoutes());
            this._router.addroutes(this._customRoutes());

            /**各种对象池**/
            //this._hidenpool = [];//隐藏对象池;

            if(!this._router.numkeys){
                console.error('must initialize routes in _initRoutes()');
            }
        }

        /** 映射路由 **/
        private _initRoutes():{ statu: number; circler: Function;surface: Function; }[]{
            return [
                {statu:GameStatus.READY,circler:this._onReady,surface:this.display.readyBoard},
                {statu:GameStatus.PLAYING,circler:this._onPlaying,surface:this.display.playingBoard},
                {statu:GameStatus.OVER,circler:this._onOver,surface:this.display.overBoard},
                {statu:GameStatus.RESTART,circler:this._onRestart,surface:this.display.restarBoard}
            ];
        }

        public _customRoutes():{ statu: number; circler: Function;surface: Function; }[]{
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
            this._router[e.statu].surface.apply(this.display);
            this._router[e.statu].circler.apply(this);
            if(e.statu == GameStatus.RESTART && config.gamevar.isFirstPlay){
                config.gamevar.isFirstPlay = false;
            }
        }

        //@protected
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
            return this.display._interface.select(name);
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
