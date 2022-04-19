import {arrayMove as dndKitArrayMove} from '@dnd-kit/sortable'

export const arrayMove = (array, oldIndex, newIndex) => {
    return dndKitArrayMove(array, oldIndex, newIndex);
  };

  export const removeAtIndex = (array, index) => {
    return [...array.slice(0, index), ...array.slice(index + 1)];
  };
  export const insertAtIndex = (array, index, item) => {
    return [...array.slice(0, index), item, ...array.slice(index)];
  };
