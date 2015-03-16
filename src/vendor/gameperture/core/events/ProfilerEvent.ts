module gamep {
    export module Core {
        export class ProfilerEvent extends egret.Event {

            private _count:number;

            public constructor(type:TimeEvent, count:number) {
                super(type + getClassName(this), false, false);
                this._count = count;
            }

            public get count():number {
                return this._count
            }
        }
    }
}

module gamep{
    export enum TimeEvent{
        ON_MILLSECOND100 = 1,
        ON_SECOND      = 2
    }
}