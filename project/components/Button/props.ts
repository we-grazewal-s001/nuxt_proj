


export const props =
    {
        severity: {
            type: String as () => 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger' | 'contrast',
            required: false,
            default: ''
        },

        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        label: {
            type: String,
            required: false,
            default: null
        },
        link: {
            type: Boolean,
            required: false,
            default: false
        },
        icon: {
            type: String,
            required: false,
            default: ''
        },
        iconPos: {
            type: String as () => 'left' | 'right' | 'center',
            default: 'center',
            required: false
        },
        iconSize: {
            type: String,
            default: '24',
            required: false,

        },
        iconColor: {
            type: String,
            default: '',
            required: false,
        },
        loading: {
            type: Boolean,
            required: false,
            default: false
        },
        raised: {
            type: Boolean,
            required: false,
            default: false
        },
        rounded: {
            type: Boolean,
            required: false,
            default: false
        },
        text: {
            type: Boolean,
            required: false,
            default: false
        },
        plain: {
            type: Boolean,
            required: false,
            default: false
        },
        outlined: {
            type: Boolean,
            required: false,
            default: false
        },
        type: {
            type: String as () => "button" | "submit" | "reset" | undefined,
            default: 'button',
            required: false
        },
        styleName: {
            type: String,
            default: '',
            required: false
        },
        className: {

            type: String,
            default: '',
            required: false
        },
    }