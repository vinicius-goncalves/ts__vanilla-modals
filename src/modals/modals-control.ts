import loadModals from './modals-loader.js';
import type ModalVisibility from '../types/ModalVisibility.js';

const modalsControl = {

    updateVisibility(modal: HTMLDivElement, newVisibility: ModalVisibility): void {
        modal.dataset.modalVisibility = newVisibility;
    },

    getVisibility(modal: HTMLDivElement): string | undefined {

        const modalAttrs = modal.attributes;
        const modalVisibility = modalAttrs.getNamedItem('data-modal-visibility')

        if(!modalVisibility) {
            return;
        }

        return modalVisibility.value
    },

    isHidden(modal: HTMLDivElement): boolean | undefined {
        return this.getVisibility(modal) === 'hidden';
    },

    getAllModals(): Array<HTMLDivElement> {
        const modals = document.querySelectorAll('[data-modal]') as NodeListOf<HTMLDivElement>;
        return [...modals].filter((modal: HTMLDivElement) => modal.dataset.modal !== 'buttons');
    },

    findModal(btnClicked: HTMLElement): HTMLDivElement | undefined {

        const modals = this.getAllModals();
        const modalTarget = Object.entries(btnClicked.dataset).find(([ k ]) => k.includes('Modal'));

        if(!modalTarget) {
            return;
        }

        const modalName = modalTarget[1];
        const modalFound = modals.find((modal: HTMLDivElement) => modal.dataset.modal === modalName);

        return modalFound;
    },

    toggleModalVisibility(btnClicked: HTMLElement): void {

        const modalFound = this.findModal(btnClicked);

        if(!modalFound) {
            return;
        }

        const newModalVisibility: ModalVisibility = this.isHidden(modalFound) ? 'visible' : 'hidden';
        this.updateVisibility(modalFound, newModalVisibility);
    },
}

function handleWithEvents(): void {

    const allOpenBtns = document.querySelectorAll('[data-open-modal]') as NodeListOf<HTMLButtonElement>;
    const allCloseBtns = document.querySelectorAll('[data-close-modal]') as NodeListOf<HTMLSpanElement>;

    const modalBtns = [ ...allCloseBtns, ...allOpenBtns ];

    for(const modalBtn of modalBtns) {
        modalBtn.addEventListener('click', (): void => {
            modalsControl.toggleModalVisibility(modalBtn)
        });
    }
}

loadModals().then(handleWithEvents);

export default modalsControl;