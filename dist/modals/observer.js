import modalsControl from './modals-control.js';
const modals = document.querySelector('[data-modals="wrapper"]');
const observer = new MutationObserver((mutations) => {
    if (mutations.length >= 2) {
        return;
    }
    const mutation = mutations[0];
    const mutationType = mutation.type;
    if (mutationType === 'attributes') {
        const modalTarget = mutation.target;
        const visibility = modalsControl.getVisibility(modalTarget) === 'visible' ? 'flex' : 'none';
        modalTarget.style.setProperty('display', visibility);
    }
});
observer.observe(modals, {
    subtree: true,
    attributes: true,
    attributeFilter: ['data-modal-visibility']
});
export default {};
