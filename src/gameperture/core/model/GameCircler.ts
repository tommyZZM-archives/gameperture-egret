class GameCircler {

    private _router:RouteDictionary;
    private _display:any;

    public constructor(display:GameDisplay) {
        this._display = display;
        this._display.addEventListener(GameEvents.GAME_RUN,this._onToggleStatus,this);
        this._router = new RouteDictionary(this._initRoutes());
        if(!this._router.numkeys){
            console.error('must initialize routes in _initRoutes()')
        }
    }

    public _initRoutes():{ key: number; value: Function; }[]{
        return [];
    }

    public _onPreLoad(){
        //console.error('_onPreLoad must be override!');
    }

    public _onAllLoad(){
        console.error('_onAllLoad must be override!');
    }

    public _onProgress(){

    }

    public _onReady(e:GameEvents){
        console.error('_onStart must be override!');
    }

    public _onPlaying(e:GameEvents){
        console.error('_onPlaying must be override!');
    }

    public _onOver(e:GameEvents){
        console.error('_onOver must be override!');
    }

    /**
     * 状态切换器
     * @param e
     */
    private _onToggleStatus(e:GameEvents){
        this._router[e.status].apply(this);
    }

    public get display(){
        return this._display;
    }

}