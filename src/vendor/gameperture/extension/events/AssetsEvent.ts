module gamep.Event{
    export class AssetsEvent extends egret.Event {

        public static PRELOAD_READY:string = "preReady";
        public static ASSET_READY:string = "assetReady";
        public static ASSET_PROGRESS:string = "progressing";

        public percent:number = 0;

        public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            //TODO:your code here
            super(type, bubbles, cancelable);
        }
    }

}

