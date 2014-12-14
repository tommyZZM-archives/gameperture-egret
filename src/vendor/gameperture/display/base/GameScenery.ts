module gamep{
    export class GameScenery extends egret.DisplayObjectContainer{

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

        public transPan(speed:number = 1,direcion:string = 'left'){
            this.x -= speed*gamep.FPS.rateoffest();
            if(this.x<=-(this.width*2/3)){
                this.x += (this.width/3)+speed;
                this.x = +this.x.toFixed(0);
            }
        }

    }
}
