module gamep {
    export class GameScenery extends GameContainer{// implements ISceneryComponent

        public constructor(name:string){
            super();
            this.name = name;
            this.display();

            extendImplements(this,GameSprite,'tween');
            extendImplements(this,GameSprite,'removeTween');
        }

        public onShow(...courier){}
        public onHide(...courier){}

        protected display(){

        }


        public clear(){this.removeChildren();}

        public get tween(){return null}
        public removeTween(){}

        public removeFromParent(){
            if(this.parent){
                this.parent.removeChild(this);
            }
        }

    }
}