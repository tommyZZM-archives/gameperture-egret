class MyGame extends gamep.GameCycler {

    protected onReady(){
        console.log('MyGame...onReady()');
        this.addNotifyListener(gamep.NotifyType.Result,'hellocalbck',this.hellocallback)
        this.getLogic(MyLogic).hellocallback();
    }

    private hellocallback(hi){
        console.log('MyGame...hellocallback(hi) hi='+hi);
        this.dispatchFeedback('hellofeedback')
    }


}