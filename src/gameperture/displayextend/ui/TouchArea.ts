/**
 * Created by 2014-11-06 on 2014/12/6.
 */
module gp.display.ui {
    export class TouchArea extends TouchAbleObject {

        public constructor(name:string,x:number,y:number,width:number,height:number,
                           pivotX:number=0,pivotY:number=0) {
            this._width = width;
            this._height = height;
            super(name,x,y,'custom',pivotX,pivotY);
            //TODO:your code here
        }

        public _display(){
            super._display();
        }
    }
}