import {mount} from "@vue/test-utils";
import ImageUploader from "../components/ImageUploader/ImageUploader.vue"
describe('image upload rendering type basic',async()=>{
    const props= {
         mode:'basic',

        }
    let comp;

    beforeEach(()=>{
        comp = mount(ImageUploader, {
            attachTo: document.body,
            attachToDocument: true,
            props
        });
    })

    afterEach(() => {
        comp.unmount();
    });

    test('check if component is supporting inline import',async()=>{
            const comp = await import("../components/ImageUploader/ImageUploader.vue")
        expect(comp).toBeDefined()
    })

    test('check if component is mounting',async()=>{
        expect(comp).toBeDefined()
        //if input is being rendered and has scale 0
        const inputBox = comp.find('[data-testid="ImageUploaderInputBox"]');
        expect(inputBox.exists()).toBe(true);
        expect(inputBox.element.classList).toContain('scale-0')

        // Clickable div for basic mode should be rendered
        const clickableDiv = comp.find('[data-testid="ImageUploaderClickableDivBasic"]');
        expect(clickableDiv.exists()).toBe(true);

        // Advanced mode specific elements should not be rendered
        const advancedClickableDiv = comp.find('[data-testid="ImageUploaderClickableDivAdvanced"]');
        expect(advancedClickableDiv.exists()).toBe(false);


    })
    test("check if clickable div has  a button  ", async()=>{
        const button=comp.find('[data-testid="buttonTobeClicked"]')
        expect(button.exists()).toBe(true)

    })
    test("check if button has  Choose as default value Choose and + as icon ", async()=>{
        const button=comp.find('[data-testid="buttonTobeClicked"]')
        expect(button.text()).toBe('Choose')

    })

    test("check if clickable button has on click event and is being triggered", async()=> {

        const wrapper =await mount(ImageUploader , {
            props : {
                mode : 'basic'
            }
        });
        const button = wrapper.find('[data-testid="buttonTobeClicked"]');
        await button.trigger('click');
        expect(wrapper.emitted('click').length).toBe(2);
        
    })

})