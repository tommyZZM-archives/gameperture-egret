module gp.viewc{
    export class GameDisplay extends egret.DisplayObjectContainer {

        private _rune:event.GameEvents;

        public _background = new display.Scenery();
        /** 背景 **/
        public _mainground = new display.Scenery();
        /** 主要逻辑层 **/
        public _foreground = new display.Scenery();
        /** 前景 **/
        public _interface = new GameInterface();
        /** 界面 **/

        public constructor() {
            super();
            this.addChild(this._background);
            this.addChild(this._mainground);
            this.addChild(this._foreground);
            this.addChild(this._interface);
        }

        public loadingBoard() {

        }

        public dispatchStatu(statu:any = GameStatus.READY) {
            this.dispatchEvent(new event.GameEvents(statu));
        }

        public readyBoard() {

        }

        public playingBoard() {

        }

        public overBoard() {

        }

        public restarBoard() {

        }

        /*public addChild(child: egret.DisplayObject){
         this._mainground.addChild(child);
         return child;
         }*/

        /**
         * Getter
         */
        /*public get runevent() {
            return this._rune
        }*/
    }
}
