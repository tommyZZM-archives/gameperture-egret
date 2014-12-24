module gamep{
    export class GameContainer extends egret.DisplayObjectContainer{

        private components:utils.Dictionary;

        public constructor() {
            this.components = new utils.Dictionary();
            super();
            //TODO:your code here
        }

        public addChild(child: GameSprite):GameSprite{
            this.components.set(child.name,child);
            super.addChild(child);
            return child;
        }

        public clear(){this.removeChildren();}

        public hide(...arg):void{this.visible = false;}
        public show(...arg):void{this.visible = true;}

        public select(name):GameUiObject{
            return this.components[name];
        }
    }
}
