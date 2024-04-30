export const props={
options:{
    type:Array,
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
        required:false,
        default:false
    }
}