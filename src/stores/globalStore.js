import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
    state: () => ({
        sharedVariable: 'login',
    }),
    actions: {
        setSharedVariable(newValue) {
            this.sharedVariable = newValue;
        },
    },
});
