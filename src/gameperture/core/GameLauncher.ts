class GameLauncher{//implements GamePertureInterface

    private _assetsloader:AssetsLoader;
    private _gamecircler:GameCircler;
    private _progressbar:ProgressBar;

    public constructor(stage:egret.DisplayObjectContainer,circle:GameCircler,debug:boolean) {
        config.rootscene = stage;
        config.isdebug = debug;
        if(config.isdebug){
            egret.Profiler.getInstance().run();
        }
        new GameProfiler();

        this._gamecircler = circle;
    }

    public addProgress(progress:ProgressBar){
        this._progressbar = progress;
    }

    public loadAssets(preload:string = null,...groups:string[]){
        if(groups.length > 0){
            this._assetsloader = new AssetsLoader(preload,groups);
            this._assetsloader.addEventListener(AssetsEvents.PRELOAD_READY,this._onPreLoaded,this);
            this._assetsloader.addEventListener(AssetsEvents.ASSET_READY,this._onAssetsLoaded,this);
            this._assetsloader.addEventListener(AssetsEvents.ASSET_PROGRESS,this._onAssetsProgress,this);
        }else{
            groups.push(preload);
            this._onPreLoaded();
            this._assetsloader = new AssetsLoader(null,groups);
            this._assetsloader.addEventListener(AssetsEvents.ASSET_READY,this._onAssetsLoaded,this);
            this._assetsloader.addEventListener(AssetsEvents.ASSET_PROGRESS,this._onAssetsProgress,this);
        }
    }

    private _onPreLoaded(){

        if(this._progressbar)config.rootscene.addChild(this._progressbar);
        this._gamecircler.zPreLoadWrapper();
    }

    private _onAssetsLoaded(){
        if(this._progressbar)this._progressbar.removeFromParent();
        this._gamecircler.zAllLoadWrapper();
    }

    private _onAssetsProgress(e:AssetsEvents){
        if(this._progressbar)this._progressbar.update(e.percent);
        this._gamecircler._onProgress();
    }

}