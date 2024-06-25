import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        sharedVariable: localStorage.getItem('typeUser') || 'login',
    }),
    actions: {
        setSharedVariable(newValue) {
            this.sharedVariable = newValue;
        },
    },
});
