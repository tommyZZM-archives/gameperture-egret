class MyGame extends gamep.GameCycler {

    protected onReady(){
        console.log('2.MyGame...onReady()');
        this.addNotifyListener(gamep.NotifyType.Result,'hellocalbck',this.hellocallback)
        this.getLogic(MyLogic).hellocallback();
    }

    private hellocallback(hi){
        console.log('4.MyGame...hellocallback(hi) hi='+hi);
        this.dispatchFeedback('hellofeedback');
    }


}