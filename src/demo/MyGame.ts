class MyGame extends gamep.GameCycler {

    protected regLogics():gamep.GameLogicer[]{
        return [
            new MyLogic('mylogic')
        ];
    }

    protected onReady(){
        console.log('MyGame...onReady()');
        this.getLogic('mylogic').hellocallback()
    }


}