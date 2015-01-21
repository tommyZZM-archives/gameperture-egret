module gamep{
    export class AssetsEvent extends ProxyEvent {

        public static PRELOAD_READY:string = "preReady";
        public static ASSET_READY:string = "assetReady";
        public static ASSET_PROGRESS:string = "progressing";

        public percent:number = 0;

        public constructor(type:string) {
            //TODO:your code here
            super(type);
        }
    }

}

