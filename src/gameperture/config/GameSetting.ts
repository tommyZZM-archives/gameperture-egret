module config{

    export module gamevar{
        export var isFirstPlay:boolean = true;
        export var score:number = 0;
    }

    export class gamesetting {

        private _setting:Dictionary;

        public constructor(settingfile) {
            var setting = RES.getRes(settingfile);
            if(!setting){
                console.error('setting file '+settingfile+' is '+setting)
                return;
            }
            this._setting = new Dictionary();
            for(var i in setting){
                this._setting.add(i+'',setting[i])
            }
        }

        public getpara(name:string){
            return this._setting[name];
        }

        public setpara(name:string,value:any){
            if(typeof(value) === typeof(this._setting[name])){
                this._setting[name] = value;
            }
        }

    }
}