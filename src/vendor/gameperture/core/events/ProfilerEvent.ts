module gamep.Event{
    export class ProfilerEvent extends egret.Event {

        private _count:number;

        public constructor(type:IProfilerEvent,count:number) {
            super(type+'ProfilerEvent', false , false);
            this._count = count;
        }

        public get count():number{
            return this._count
        }

    }

    export var ON_MILLSECOND100 = IProfilerEvent.ON_MILLSECOND100;
    export var ON_SECOND = IProfilerEvent.ON_SECOND;

    export enum IProfilerEvent{
        ON_MILLSECOND100 = 1,
        ON_SECOND      = 2
    }
}