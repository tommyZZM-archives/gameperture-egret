module gamep {
    export class GameScenery extends GameContainer{// implements ISceneryComponent

        public constructor(name:string){
            super();
            this.name = name;
            this.display();
            extendImplements(this,GameSprite,'removeTween');
        }

        public onShow(...courier){}
        public onHide(...courier){}

        protected display(){

        }


        public clear(){this.removeChildren();}

        public get tween():egret.Tween{
            var tween = egret.Tween.get(this);
            tween.setPaused(false);
            return tween;
        }
        public removeTween(){}

        public removeFromParent(){
            if(this.parent){
                this.parent.removeChild(this);
            }
        }

    }
}