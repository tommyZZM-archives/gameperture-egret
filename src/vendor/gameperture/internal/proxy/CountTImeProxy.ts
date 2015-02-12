module game {
    export class CountTimeProxy extends gamep.GameProxyer{
        //计时器
        public constructor() {
            super();
            this._timecallbackdict = new Dict();
            this._timecallbacktask = [];
            this.addTimeListener(gamep.Event.ON_SECOND,this.onEnterSecond);
        }

        private onEnterSecond(e:gamep.Event.ProfilerEvent){
            for(var i=0;i<this._timecallbacktask.length;i++){
                var task:any = this._timecallbacktask.shift();
                this._timecallbackdict.set(task.name,
                    {name:task.name,curr:e.count,dtime:0,count:task.count,callback:task.callback,thisArg:task.thisArg});
            }
            this._timecallbacktask = [];

            var tasks = this._timecallbackdict.values;

            for(var i=0;i<tasks.length;i++){
                var task = tasks[i];
                task.dtime = e.count-task.curr;
                if(task.dtime>=task.count){
                    task.callback.apply(task.thisArg);
                    this._timecallbackdict.delete(task.name);
                }
            }
        }

        private _timecallbackdict:Dict;
        private _timecallbacktask:any;
        public addDisposableTimeCallback(name:string,second:number,callback:Function,thisArg:any){
            this._timecallbacktask.push({
                name:name,
                count:second,
                callback:callback,
                thisArg:thisArg
            })
        }

        public deDisposableTimeCallback(name:string){
            this._timecallbackdict.delete(name);
        }
    }
}