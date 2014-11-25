class GameConfigModel {

    private _config:any;

    public constructor(config) {
        this._config = config;
    }

    public get config(){
        return this._config;
    }

}