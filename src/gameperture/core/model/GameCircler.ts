class GameCircler {

    private _display:GameDisplay;

    public constructor(display:GameDisplay) {
        this._display = display;
        this._display.addEventListener(GameEvents.GAME_RUN,this._onToggleStatus,this);
    }

    public _onPreLoad(){
        console.error('_onPreLoad must be override!');
    }

    public _onAllLoad(){
        console.error('_onAllLoad must be override!');
    }

    public _onProgress(){

    }

    public _onStart(e:GameEvents){
        console.error('_onStart must be override!');
    }

    public _onPlaying(e:GameEvents){
        console.error('_onPlaying must be override!');
    }

    public _onOver(e:GameEvents){
        console.error('_onOver must be override!');
    }

    /**
     * 状态切换器
     * @param e
     */
    public _onToggleStatus(e:GameEvents){
        console.error('_onToggleStatus must be override!');
    }

    public get display(){
        return this._display;
    }

}