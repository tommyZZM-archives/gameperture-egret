class GameCircler {

    private _setting:any;
    private _router:RouteDictionary;
    private _display:any;

    public constructor(display:GameDisplay,settingfile?:string) {
        this._display = display;
        this._display.addEventListener(GameEvents.GAME_RUN,this._onToggleStatus,this);
        this._router = new RouteDictionary(this._initRoutes());
        this._setting = settingfile;
        if(!this._router.numkeys){
            console.error('must initialize routes in _initRoutes()');
        }
    }

    public _initRoutes():{ key: number; value: Function; }[]{
        return [
            {key:GameStatus.READY,value:this.zReadyWrapper},
            {key:GameStatus.PLAYING,value:this.zPlayingWrapper},
            {key:GameStatus.OVER,value:this.zOverWrapper},
            {key:GameStatus.RESTART,value:this.zRestartWrapper}
        ];
    }

    public zPreLoadWrapper(){
        config.rootscene.addChild(this.display);
        config.rootscene.addEventListener(egret.Event.ENTER_FRAME,this._onEnterFrame,this);
        this._onPreLoad();
    }
    public zAllLoadWrapper(){
        if(this._setting){this._setting = new config.gamesetting(this._setting)}else{config.trace('no default setting')}
        this.display.lever();
        this._onAllLoad();
    }
    public zReadyWrapper(e:GameEvents){
        this.display.readyBoard();
        this._onReady(e);
    }
    public zPlayingWrapper(e:GameEvents){
        this.display.playingBoard();
        this._onPlaying(e);
    }
    public zOverWrapper(e:GameEvents){
        this.display.readyBoard();
        this._onOver(e);
    }
    public zRestartWrapper(e:GameEvents){
        this.display.readyBoard();
        this._onRestart(e);
        config.gamevar.isFirstPlay = false;
    }

    public _onPreLoad(){}
    public _onAllLoad(){console.error('_onAllLoad must be override!');}
    public _onProgress(){}
    public _onReady(e:GameEvents){console.error('_onStart must be override!');}
    public _onPlaying(e:GameEvents){console.error('_onPlaying must be override!');}
    public _onOver(e:GameEvents){console.error('_onOver must be override!');}
    public _onRestart(e:GameEvents){console.error('_onRestart must be override!');}

    /**
     * 状态切换器
     * @param e
     */
    private _onToggleStatus(e:GameEvents){
        this._router[e.statu].apply(this);
    }

    private get display(){
        return this._display;
    }

    public get setting(){
        return this._setting;
    }

    /**
     * 场景控制
     */
    public addChild(...obj:egret.DisplayObject[]){
        for(var i in obj){
            this.display._mainground.addChild(obj[i]);
        }
    }

    public selectUI(name):any{
        return this._display._interface.select(name);
    }

    //@override
    public _onEnterFrame(){
        //TODO:每帧的回调函数
    }
}