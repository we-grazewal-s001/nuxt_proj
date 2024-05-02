
export interface OptionType {
    value: string;
    title: string;
}

export const props={
    options:{

        type:Array as PropType<OptionType[]>,
        required:true,
        default:[{title:"Option 1",value:"value 1"},{title:"Option 2",value:"value 2"},{title:"Option 3",value:"value 3"}]
    },
    label:{
       type:String,
        required: true,
        default: 'Select'
    },
    required:{
        type:Boolean,
    },
    name:{
     type:String
    },
    error:{
    type:String
    }
}