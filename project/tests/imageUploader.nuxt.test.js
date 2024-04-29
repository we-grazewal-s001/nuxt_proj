import {mount} from "@vue/test-utils";
import ImageUploader from "../components/imageUploader"

describe('image upload rendering type basic', async () => {
    const props = {
        mode: 'basic',

    }
    let comp;

    beforeEach(() => {
        comp = mount(ImageUploader, {
            attachTo: document.body,
            attachToDocument: true,
            props
        });
    })

    afterEach(() => {
        comp.unmount();
    });

    test('check if component is supporting inline import', async () => {
        const comp = await import("../components/imageUploader")
        expect(comp).toBeDefined()
    })

    test('check if component is mounting', async () => {
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
    test("check if clickable div has  a button  ", async () => {
        const button = comp.find('[data-testid="buttonTobeClicked"]')
        expect(button.exists()).toBe(true)

    })
    test("check if button has  Choose as default value Choose ", async () => {
        const button = comp.find('[data-testid="buttonTobeClicked"]')
        expect(button.text()).toBe('Choose')
    })


    test("check if clickable button has on click event and is being triggering input event as well", async () => {

        const button = comp.find('[data-testid="buttonTobeClicked"]');
        await button.trigger('click');
        expect(comp.emitted('click').length).toBe(2);

    })


})
describe('image upload rendering type Advanced', async () => {
    const props = {
        mode: 'advanced'
    }
    let comp;

    beforeEach(() => {
        comp = mount(ImageUploader, {
            attachTo: document.body,
            attachToDocument: true,
            props,

        });
    })

    afterEach(() => {
        comp.unmount();
    });


    test('check if component is mounting when mode is advanced ', async () => {
        // Advanced mode specific element should be rendered
        const advancedClickableDiv = comp.find('[data-testid="ImageUploaderClickableDivAdvanced"]');
        expect(advancedClickableDiv.exists()).toBe(true);
    })
    test("check if clickable div has a chooose button  ", async () => {
        const button = comp.find('[data-testid="AdvanceChooseImageButton"]')
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe('Choose')
    })
    test("check if clickable button has on click event and is being triggering input event as well", async () => {
        const button = comp.find('[data-testid="AdvanceChooseImageButton"]');
        await button.trigger('click');
        expect(comp.emitted('click').length).toBe(2);
    })

    test("check if clickable div has a upload button and is disabled initially ", async () => {
        const button = comp.find('[data-testid="AdvanceUploadImageButton"]')
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe('Upload')
        expect(button.attributes('disabled')).toBeDefined()
    })
    test("check if clickable div has a cancel button and is disabled initially ", async () => {
        const button = comp.find('[data-testid="AdvanceCancelImageButton"]')
        expect(button.exists()).toBe(true)
        expect(button.text()).toBe('Cancel')
        expect(button.attributes('disabled')).toBeDefined()
    })



})

describe('check if component is taking props properly', async () => {

    test('check if component is using props multiple ', async () => {

        const comp = await mount(ImageUploader, {
            props: {
                mode: 'basic',
            }
        })

        const input = comp.find('input')
        expect(input.attributes('multiple')).toBeUndefined()
        const newCom = await mount(ImageUploader, {
            props: {
                mode: 'basic',
                multiple: true
            }
        })
        const newInput = newCom.find('input')
        expect(newInput.attributes('multiple')).toBeDefined()

    })

    test("check if comp is throwing error for wrong accept props values ", async () => {

        const comp = await mount(ImageUploader, {
            props: {
                mode: 'basic',
            }
        })
        let err = comp.vm.invalidError
        expect(err.length).toBe(0)
    })
    test("check if comp is getting slot values from parent in header", async () => {

        const comp = await mount(ImageUploader, {
            props: {
                mode: 'advanced',

            },
            slots: {
                header: `<template #header="{ handleChoose, handleUpload, handleCancel, uploadedFiles,Allfiles ,loading,validationError}">
                          <button @click="handleChoose" id="button">MyButton</button>
                          <button @click="handleUpload" id="uploadbutton">Upload Button</button>
                          <p id="loader">
                           {{loading}}
                           </p>
                    </template>`
            }
        })
        let button = comp.find('#button')

        expect(button.text()).toContain("MyButton")
        await  button.trigger('click')
        expect(comp.emitted('click').length).toBe(2)

        let Uploadbutton = comp.find('#uploadbutton')
        expect(Uploadbutton.text()).toContain("Upload button")
        await  Uploadbutton.trigger('click')
        expect(comp.emitted('click').length).toBe(3)

        let loader=comp.find("#loader")
        expect(loader.text()).toContain(false)
    })

    test("check if comp is getting slot values from parent in empty", async () => {
        const comp = await mount(ImageUploader, {
            props: {
                mode: 'advanced',
            },
            slots: {
                empty: `<template #empty>
                    <p id="emptySlot">Drag and drop files to here to upload.</p>
                  </template>`
            }
        })
        let emptySlot= comp.find("#emptySlot")
        expect(emptySlot.text()).toContain('Drag and drop files to here to upload.')
    })
})