class MyLogic extends gamep.GameLogicer{

    public hellocallback(){
        console.log('MyLogic...hellocallback()');
        this.dispatchCall('hellocalbck','happynewyear!')
    }

}