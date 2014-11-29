module gp.display{
    export class Scenery extends egret.DisplayObjectContainer{

        public constructor() {
            super();
            //TODO:your code here
        }

        public clear(){
            this.removeChildren();
        }

        public hide():void{
            this.visible = false;
        }

        public get tween(){
            return egret.Tween.get(this);
        }

    }
}
