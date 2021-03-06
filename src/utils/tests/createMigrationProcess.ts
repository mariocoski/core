import delay from '../delay';

export default () => {
  let processed: Date | undefined; // tslint:disable-line:no-let
  const process = async () => {
    await Promise.resolve(delay(1));
    processed = new Date();
  };
  const getProcessed = () => {
    return processed;
  };
  return { getProcessed, process };
};
