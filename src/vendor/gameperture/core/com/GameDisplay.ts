module gamep{
    export class GameDisplay extends egret.DisplayObjectContainer {

        private static _isinit:boolean;

        private _scenery = new egret.DisplayObjectContainer();
        /** 舞台 **/

        private _interface = new egret.DisplayObjectContainer();
        /** 界面 **/

        public constructor(root:egret.DisplayObjectContainer) {
            super();
            rootscene = root;
            rootscene.addChild(this);
            this.addChild(this._scenery);
            this.addChild(this._interface);
            GameFacade.instance.registDisplay(this);
        }

        //@public @final
        public dispatchNotify(notify:string, ...courier:any[]){
            this.dispatchEvent(new FacadeEvent(notify,courier));
        }

    }
}
