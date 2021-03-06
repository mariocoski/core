import RepoFacade from '../../RepoFacade';
import LockedMigrationsError from '../errors/LockedMigrationsError';
import Migration from '../types/Migration';
import ProcessedMigration from '../types/ProcessedMigration';

let processedMigrations: ProcessedMigration[] = []; // tslint:disable-line:no-let
let hasLockedMigrations = false; // tslint:disable-line:no-let

const testRepoFactory = (migrations: Migration[]): RepoFacade => {
  return {
    clearMigrations: async () => {
      processedMigrations = [];
    },
    getMigrations: async () => {
      return migrations;
    },
    getProcessedMigrations: async () => {
      return processedMigrations;
    },
    lockMigrations: async () => {
      if (hasLockedMigrations) {
        throw new LockedMigrationsError();
      }
      hasLockedMigrations = true;
    },
    recordProcessedMigration: async (migration) => {
      processedMigrations = [...processedMigrations, migration];
    },
    removeProcessedMigration: async (key) => {
      processedMigrations = processedMigrations.filter((processedMigration) => {
        return processedMigration.key !== key;
      });
    },
    unlockMigrations: async () => {
      hasLockedMigrations = false;
    },
  };
};

export default testRepoFactory;
