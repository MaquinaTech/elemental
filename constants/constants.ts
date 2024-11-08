export const CHOICES: ElementType[] = ['fire', 'water', 'plant'];

export const CHOICE_COLORS: Record<ElementType, string> = {
    fire: 'red',
    water: 'lightblue',
    plant: 'lightgreen',
};

export const RULES: Record<ElementType, ElementType> = {
  fire: 'plant',  // Fire beats Plant
  water: 'fire',  // Water beats Fire
  plant: 'water', // Plant beats Water
};

