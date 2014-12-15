module gamep{
    export class GameLauncher{//implements GamePertureInterface

        private _assetsloader:AssetsLoader;
        private _progressbar:display.ui.ProgressBar;
        private _facade:GameFacade = GameFacade.instance;


        public constructor(debug:boolean) {
            console.info("Welcome to %cGameperture","color:#1ac2ff;font-weight:bold;",
                "Quick Game FrameWork base on Egret Engine!");
            isdebug = debug;
            if(isdebug){
                egret.Profiler.getInstance().run();
            }
            new gamep.utils.GameProfiler();
        }

        public addProgress(progress:display.ui.ProgressBar){
            this._progressbar = progress;
        }

        public launchWith(preload:string = null,...groups:string[]){
            if(preload && groups.length > 0){
                this._assetsloader = new AssetsLoader(preload,groups);
                this._assetsloader.addEventListener(event.AssetsEvent.PRELOAD_READY,this._preLoaded,this);
            }else{
                if(groups.length == 0){groups.push(preload)}
                this._preLoaded();
                this._assetsloader = new AssetsLoader(null,groups);
            }
            this._assetsloader.addEventListener(event.AssetsEvent.ASSET_READY,this._launch,this);
            this._assetsloader.addEventListener(event.AssetsEvent.ASSET_PROGRESS,this._onprogress,this);
        }

        private _preLoaded(){

        }

        /** 启动 **/
        private _launch(){
            this._facade.startUp();
        }

        private _onprogress(e:event.AssetsEvent){
            if(this._progressbar)this._progressbar.update(e.percent);
        }

    }
}
