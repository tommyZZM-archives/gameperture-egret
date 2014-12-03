module gp{
    export class GameLauncher{//implements GamePertureInterface

        private _assetsloader:model.AssetsLoader;
        private _gamecircler:model.GameCycler;
        private _progressbar:display.ui.ProgressBar;

        public constructor(stage:egret.DisplayObjectContainer,circle:model.GameCycler,debug:boolean) {
            console.info("Welcome to %cGameperture","color:#1ac2ff;font-weight:bold;",
                "Quick Game FrameWork base on Egret Engine!");
            rootscene = stage;
            isdebug = debug;
            if(isdebug){
                egret.Profiler.getInstance().run();
            }
            new gp.util.GameProfiler();

            this._gamecircler = circle;
        }

        public addProgress(progress:display.ui.ProgressBar){
            this._progressbar = progress;
        }

        public loadAssets(preload:string = null,...groups:string[]){
            if(preload && groups.length > 0){
                this._assetsloader = new model.AssetsLoader(preload,groups);
                this._assetsloader.addEventListener(event.AssetsEvents.PRELOAD_READY,this._onPreLoaded,this);
                this._assetsloader.addEventListener(event.AssetsEvents.ASSET_READY,this._onAssetsLoaded,this);
                this._assetsloader.addEventListener(event.AssetsEvents.ASSET_PROGRESS,this._onAssetsProgress,this);
            }else{
                //groups.push(preload);
                this._onPreLoaded();
                this._assetsloader = new model.AssetsLoader(null,groups);
                this._assetsloader.addEventListener(event.AssetsEvents.ASSET_READY,this._onAssetsLoaded,this);
                this._assetsloader.addEventListener(event.AssetsEvents.ASSET_PROGRESS,this._onAssetsProgress,this);
            }
        }

        private _onPreLoaded(){

            if(this._progressbar)rootscene.addChild(this._progressbar);
            this._gamecircler.zPreLoadWrapper();
        }

        private _onAssetsLoaded(){
            if(this._progressbar)this._progressbar.removeFromParent();
            this._gamecircler.zAllLoadWrapper();
        }

        private _onAssetsProgress(e:event.AssetsEvents){
            if(this._progressbar)this._progressbar.update(e.percent);
            this._gamecircler._onProgress();
        }

    }
}
