class constant{
    public static stage;

    public static debug = true;

    public static trace(...optionalParams: any[]){
        if(constant.debug){
            console.log(optionalParams);
        }
    }

    public static get stage_width():number
    {
        return egret.MainContext.instance.stage.stageWidth;
    }

    public static get stage_height():number
    {
        return egret.MainContext.instance.stage.stageHeight;
    }
}

