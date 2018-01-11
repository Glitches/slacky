import OAuth from './api/dataExchangeApi';


export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        console.error('Error saving state', e);
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return OAuth();
        }
        return JSON.parse(serializedState);
    } catch (e) {
    
    }
};