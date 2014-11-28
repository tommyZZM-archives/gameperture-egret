class UiComponentBase extends GameObject{

    public constructor(name:string,x:number=0,y:number=0,gravity:string='default',
                       pivotX?:number,pivotY?:number) {
        this.name = name;
        super(x,y,null,gravity,pivotX,pivotY);
        //TODO:your code here
    }
}