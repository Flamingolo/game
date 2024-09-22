import Encounter from '../model/Encounter';
import Character from '../model/Character';
import Mob from '../model/Mob';
import characterServiceInstance from './characterService';
import mobServiceInstance from './mobService';

export const getEncounterById = async (id: string) => {
  try {
    const encounter = await Encounter.findById(id);
    if (!encounter) {
      throw new Error('Encounter not found');
    }
    return encounter;
  } catch (error) {
    throw new Error(`Error retrieving encounter: ${error.message}`);
  }
};

export const createEncounter = async (encounterData: any) => {
  try {
    const encounter = new Encounter(encounterData);
    await encounter.save();
    return encounter;
  } catch (error) {
    throw new Error(`Error creating encounter: ${error.message}`);
  }
};

export const performEncounterAction = async (encounterId: string, action: any) => {
  try {
    const encounter = await Encounter.findById(encounterId);
    if (!encounter) {
      throw new Error('Encounter not found');
    }

    const character = await characterServiceInstance.getCharacter(encounter.CharacterId.toString());
    if (!character) {
      throw new Error('Character not found');
    }

    const mob = await mobServiceInstance.getMobById(encounter.MobId.toString());
    if (!mob) {
      throw new Error('Mob not found');
    }

    if (character.resource.currentHealth === 0) {
      throw new Error('Character is dead');
    }

    if (encounter.MobRemainingHealth === 0) {
      throw new Error('Mob is dead');
    }

    if (action.type === 'attack') {
      let characterDamage = (character.stats.baseDamage + character.stats.strength) - mob.armor;
      if (characterDamage < 0) characterDamage = 0;

      let mobDamage = (mob.baseDamage + mob.strength) - character.stats.armor;
      if (mobDamage < 0) mobDamage = 0;

      encounter.MobRemainingHealth -= characterDamage;
      if (encounter.MobRemainingHealth < 0) encounter.MobRemainingHealth = 0;

      character.resource.currentHealth -= mobDamage;
      if (character.resource.currentHealth < 0) character.resource.currentHealth = 0;

      await encounter.save();
      await character.save();

      return {
        encounter,
        character,
        mob,
        characterDamage,
        mobDamage
      };
    } else if (action.type === 'defend' || action.type === 'run') {
      throw new Error('Action not implemented');
    } else {
      throw new Error('Invalid action type');
    }
  } catch (error) {
    throw new Error(`Error performing encounter action: ${error.message}`);
  }
};
