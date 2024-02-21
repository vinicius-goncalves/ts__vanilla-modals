import reqTemplate from '../utils/request-template.js';

const modals = document.querySelector('[data-modals="wrapper"]') as HTMLDivElement;
const modalBtns = document.querySelector('[data-modal="buttons"]') as HTMLDivElement;

async function getModalTemplates(): Promise<Document[]> {

    const modalsTemplatesNames: Array<string> = [
        'hello-world-modal',
        'lorem-modal'
    ];

    const modalsTemplates = modalsTemplatesNames.map((modalName: string) => reqTemplate(`./templates/${modalName}.html`));
    const promises = await Promise.all(modalsTemplates);

    return promises;
}

function splitModalContent(templateContent: DocumentFragment): { modalWrapper: HTMLDivElement, modalBtn: HTMLButtonElement } | undefined {

    const modalsAttributes: Array<string> = [
        '[data-modal]',
        '[data-open-modal]'
    ]

    const modalContent = modalsAttributes.map(modalAttribute => templateContent.querySelector(modalAttribute));
    const isSomeNullish = modalContent.some(content => content === null);

    if(isSomeNullish) {
        return undefined;
    }

    const [ modalWrapper, modalBtn ] = [ modalContent[0] as HTMLDivElement, modalContent[1] as HTMLButtonElement ];
    return { modalWrapper, modalBtn };
}

function appendModal(modalWrapper: HTMLDivElement, modalBtn: HTMLButtonElement): void {

    modals.appendChild(modalWrapper);
    modalBtns.appendChild(modalBtn);
}

async function loadModals() {

    const modals = await getModalTemplates();

    modals.forEach(modalDocument => {

        const template = modalDocument.querySelector('template') as HTMLTemplateElement;
        const templateContent = document.importNode(template.content, true);

        const modalContent = splitModalContent(templateContent);

        if(!modalContent) {
            return;
        }

        const { modalWrapper, modalBtn } = modalContent;
        appendModal(modalWrapper, modalBtn);
    });
}

export default loadModals;