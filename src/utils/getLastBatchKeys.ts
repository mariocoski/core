import { last } from 'lodash';
import FacadeConfig from '../FacadeConfig';

export default async (config: FacadeConfig) => {
  const processedMigrations = await config.repo.getProcessedMigrations();
  const batchStarts = processedMigrations.map((migration) => migration.lastBatch);
  const sortedBatchStarts = batchStarts.sort();
  const lastBatchStart = last(sortedBatchStarts);

  if (lastBatchStart === undefined) {
    return [];
  }

  const lastBatchMigrations = processedMigrations.filter((migration) => {
    return migration.lastBatch === lastBatchStart;
  });
  return lastBatchMigrations.map((migration) => migration.key);
};
