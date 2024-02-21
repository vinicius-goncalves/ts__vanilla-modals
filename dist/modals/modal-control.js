const modalButtons = document.querySelectorAll('[data-modal-btn]');
const modalControl = {
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
        return [...modals].filter((modal) => modal.dataset.modal != 'buttons');
    },
    findModal(btnClicked) {
        const modals = this.getAllModals();
        const modalFound = modals.find((modal) => modal.dataset.modal === btnClicked.dataset.modalBtn);
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
modalButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        modalControl.toggleModalVisibility(btn);
    });
});
export default modalControl;
