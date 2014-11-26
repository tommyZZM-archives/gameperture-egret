class GameLauncher{//implements GamePertureInterface

    private _assetsloader:AssetsLoader;
    private _gamecircler:GameCircler;

    public constructor(stage:egret.DisplayObjectContainer,circle:GameCircler,debug:boolean) {
        constant.stage = stage;
        constant.debug = debug;
        if(constant.debug){
            egret.Profiler.getInstance().run();
        }
        new GameProfiler();

        this._gamecircler = circle;
    }

    public loadAssets(preload:string = null,...groups:string[]){
        this._assetsloader = new AssetsLoader(preload,groups);
        this._assetsloader.addEventListener(AssetsEvents.PRELOAD_READY,this._onPreLoaded,this);
        this._assetsloader.addEventListener(AssetsEvents.ASSET_READY,this._onAssetsLoaded,this);
        this._assetsloader.addEventListener(AssetsEvents.ASSET_PROGRESS,this._onAssetsProgress,this);
    }

    private _onPreLoaded(e:AssetsEvents){
        constant.stage.addChild(this._gamecircler.display);
        this._gamecircler._onPreLoad();
    }

    private _onAssetsLoaded(e:AssetsEvents){
        this._gamecircler._onAllLoad();
    }

    private _onAssetsProgress(e:AssetsEvents){
        this._gamecircler._onProgress();
    }

}