 import {customButton,customImageUploader,customRadioButton,customInput} from "./components/index.js"

export const registeredComponents = [
    {
      component: customButton,
      name: 'customButton',
      inputs: [
        {
          name: 'label',
          type: 'string',
          defaultValue: '',
        },
        {
            name:'severity',
            type:String as ()=> 'primary'|'secondary'|'danger'|'success'|'help'|'warning'|'info'|'contrast',
            defaultValue:'primary'
        },
         {
          name:'disabled',
            type: 'boolean',
            defaultValue: false
        },
        
         {
            type: 'boolean',
            name: 'link',
            defaultValue: false
        },
         {
            type: 'string',
            name: 'icon',
            default: ''
        },
         {
           name:'iconPos',
            type: String as () => 'left' | 'right' | 'center',
            defaultValue: 'center',
             
        },
        {
            type: 'string',
            defaultValue: '24',
            name:'iconSize'

        },
         {
            type: 'string',
            defaultValue: '',
            name: 'iconColor',
        },
         {
            type: 'boolean',
             name:'loading',
            defaultValue: false
        },
        {
            type: 'boolean',
           name:'raised',
            defaultValue: false
        },
       {
            type: 'boolean',
            name:'rounded',
            defaultValue: false
        },
        {
            type: 'boolean',
           name:'text',
            defaultValue: false
        },
        {
            type: 'boolean',
            name:'plain',
            defaultValue: false
        },
        {
            type: 'boolean',
           name:'outlined',
            defaultValue: false
        },
         {
            type: String as () => "button" | "submit" | "reset" | undefined,
            defaultValue: 'button',
            name:'type'
        },
        {
            type: 'string',
            defaultValue: '',
           name:'styleName'
        },
        {

            type: 'string',
            defaultValue: '',
            name:'className'
        },
      ],
    },
    {
        component: customImageUploader,
        name: 'customImageUploader',
      },
      {
        component:customRadioButton,
        name:'customRadioButton'
      }
    ,{
        component:customInput,
        name:'customInput'
    }
  ]