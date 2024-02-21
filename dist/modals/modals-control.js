import loadModals from './modals-loader.js';
const modalsControl = {
    updateVisibility(modal, newVisibility) {
        modal.dataset.modalVisibility = newVisibility;
    },
    getVisibility(modal) {
        const modalAttrs = modal.attributes;
        const modalVisibility = modalAttrs.getNamedItem('data-modal-visibility');
        if (!modalVisibility) {
            return;
        }
        return modalVisibility.value;
    },
    isHidden(modal) {
        return this.getVisibility(modal) === 'hidden';
    },
    getAllModals() {
        const modals = document.querySelectorAll('[data-modal]');
        return [...modals].filter((modal) => modal.dataset.modal !== 'buttons');
    },
    findModal(btnClicked) {
        const modals = this.getAllModals();
        const modalTarget = Object.entries(btnClicked.dataset).find(([k]) => k.includes('Modal'));
        if (!modalTarget) {
            return;
        }
        const modalName = modalTarget[1];
        const modalFound = modals.find((modal) => modal.dataset.modal === modalName);
        return modalFound;
    },
    toggleModalVisibility(btnClicked) {
        const modalFound = this.findModal(btnClicked);
        if (!modalFound) {
            return;
        }
        const newModalVisibility = this.isHidden(modalFound) ? 'visible' : 'hidden';
        this.updateVisibility(modalFound, newModalVisibility);
    },
};
function handleWithEvents() {
    const allOpenBtns = document.querySelectorAll('[data-open-modal]');
    const allCloseBtns = document.querySelectorAll('[data-close-modal]');
    const modalBtns = [...allCloseBtns, ...allOpenBtns];
    for (const modalBtn of modalBtns) {
        modalBtn.addEventListener('click', () => {
            modalsControl.toggleModalVisibility(modalBtn);
        });
    }
}
loadModals().then(handleWithEvents);
export default modalsControl;
