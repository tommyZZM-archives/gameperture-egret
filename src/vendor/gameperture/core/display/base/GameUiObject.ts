module gamep{
    export class GameUiObject extends GameSprite{

        public constructor(name:string,x:number=0,y:number=0,
                           pivotX?:number,pivotY?:number) {
            this.name = name;
            super(x,y,null,pivotX,pivotY);
            //TODO:your code here
        }
    }
}
