export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    console.log(serializedState);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.error('Error saving state', e);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    console.log('load', serializedState);
    return JSON.parse(serializedState);
  } catch (e) {
    
  }
};