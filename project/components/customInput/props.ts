export const props={
   placeholder:{
     type:String,
     default:"Placeholder"
   },
    label:{
     type:String,
        default: "Label"
    },
    required:{
       type:Boolean,
        default:false,

    },
    type:{
       type:String as () =>  'email'|'text'|'number',
    }
}