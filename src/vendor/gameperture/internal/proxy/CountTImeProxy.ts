module gamep {
    export class CountTimeProxy extends gamep.GameProxyer{
        //计时器
        public constructor() {
            super();
            this._timecallbackdict = new Dict();
            this._timecallbacktask = [];
            this.addTimeListener(TimeEvent.ON_SECOND,this.onEnterSecond);
        }

        private onEnterSecond(e:gamep.Core.ProfilerEvent){
            for(var i=0;i<this._timecallbacktask.length;i++){
                var task:any = this._timecallbacktask[i];
                this._timecallbackdict.set(task.name,
                    {name:task.name,curr:e.count,dtime:0,count:task.count,callback:task.callback,thisArg:task.thisArg,para:task.para});
            }
            this._timecallbacktask = [];

            var tasks = this._timecallbackdict.values;

            for(var i=0;i<tasks.length;i++){
                var task = tasks[i];
                task.dtime = e.count-task.curr;
                if(task.dtime>=task.count){
                    task.callback.apply(task.thisArg,task.para);
                    this._timecallbackdict.delete(task.name);
                }
            }
        }

        private _timecallbackdict:Dict;
        private _timecallbacktask:any;
        public addDisposableTimeCallback(name:string,second:number,callback:Function,thisArg:any,...para){
            this._timecallbacktask.push({
                name:name,
                count:second,
                callback:callback,
                thisArg:thisArg,
                para:para
            })
        }

        public deDisposableTimeCallback(name:string){
            this._timecallbackdict.delete(name);
            for(var i=0;i<this._timecallbacktask.length;i++){
                var task:any = this._timecallbacktask[i];
                if(task.name == name){
                    this._timecallbacktask.splice(i,1);
                }
            }
        }
    }
}