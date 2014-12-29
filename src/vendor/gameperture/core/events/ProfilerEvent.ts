module gamep.Event{
    export class ProfilerEvent extends egret.Event {

        public static ON_MICROSECOND:string = "profiler_onmicrosecond";
        public static ON_SECOND:string = "profiler_onsecond";

        public constructor(type:string) {
            super(type, false , false);
        }
    }

}