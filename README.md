<div align="center">
    <h1>Vanilla Modals</h1>
    <p>Modals without built in HTML tags</p>
    <div>
        <img alt="ts logo" src="https://img.shields.io/badge/TypeScript-323330?style=for-the-badge&logo=typescript&logoColor=3077C5" />
    	<img alt="html5 logo" src="https://img.shields.io/badge/HTML5-323330?style=for-the-badge&logo=html5" />
    	<img alt="css3 logo" src="https://img.shields.io/badge/CSS3-323330?style=for-the-badge&logo=css3&logoColor=007ACC" />
    </div>
    <br />
    <img width="750" src="https://live.staticflickr.com/65535/53543884359_145d212d03_b.jpg"/>
</div>

## Introduction
This project focuses on Modal features, but without using built-in HTML tags or JavaScript APIs, like `<dialog>` HTML tag, or JavaScript `Popover` API. Clicking over a button, for example, "Edit content", this will be able to simply open a modal with the context of the clicked button, in this case, a random content.

## Creating and loading new modals
By default, the project comes with two templates, inside the `templates` folder. If you notice, both will follow a standard HTML structure like this:

```html
<html>
    <body>
        <template>
            <!-- A modal wrapper, starting with a "display: none" -->
            <div data-modal="hello-world" data-modal-visibility="hidden" style="display: none;">
                <div data-modal-content="hello-world">
                    <!-- A close button -->
                    <span data-close-modal="hello-world" class="material-symbols-outlined close-btn" role="button">close</span>
                    <div>...</div>
                </div>
            </div>
            <!-- A button to open the modal wrapper -->
            <button data-open-modal="hello-world" class="modal-btn">
                ...
            </button>
        </template>
    </body>
</html>
```

After creating a new template, you need to loading it by adding it to the `modals` > `modals-loader.ts` file, in the `src` folder, at the `modalsTemplatesNames` array, inside the `getModalTemplates()` function. Once the template is loaded, the script will handle toggling the modal visibility.

## Try it out
If you want, take a look at the online version of this project - clicking on the follow link, you will be able to try it out: [modals.vinicius-goncalves.com](https://modals.vinicius-goncalves.com).
