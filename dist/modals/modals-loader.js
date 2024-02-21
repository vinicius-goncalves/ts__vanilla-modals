import reqTemplate from '../utils/request-template.js';
const modals = document.querySelector('[data-modals="wrapper"]');
const modalBtns = document.querySelector('[data-modal="buttons"]');
async function getModalTemplates() {
    const modalsTemplatesNames = [
        'hello-world-modal',
        'lorem-modal'
    ];
    const modalsTemplates = modalsTemplatesNames.map((modalName) => reqTemplate(`./templates/${modalName}.html`));
    const promises = await Promise.all(modalsTemplates);
    return promises;
}
function splitModalContent(templateContent) {
    const modalsAttributes = [
        '[data-modal]',
        '[data-open-modal]'
    ];
    const modalContent = modalsAttributes.map(modalAttribute => templateContent.querySelector(modalAttribute));
    const isSomeNullish = modalContent.some(content => content === null);
    if (isSomeNullish) {
        return undefined;
    }
    const [modalWrapper, modalBtn] = [modalContent[0], modalContent[1]];
    return { modalWrapper, modalBtn };
}
function appendModal(modalWrapper, modalBtn) {
    modals.appendChild(modalWrapper);
    modalBtns.appendChild(modalBtn);
}
async function loadModals() {
    const modals = await getModalTemplates();
    modals.forEach(modalDocument => {
        const template = modalDocument.querySelector('template');
        const templateContent = document.importNode(template.content, true);
        const modalContent = splitModalContent(templateContent);
        if (!modalContent) {
            return;
        }
        const { modalWrapper, modalBtn } = modalContent;
        appendModal(modalWrapper, modalBtn);
    });
}
export default loadModals;
