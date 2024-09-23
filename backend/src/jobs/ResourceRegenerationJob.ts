import characterServiceInstance from '../service/characterService';

class ResourceRegenerationJob {
  private static readonly ONE_MINUTE = 60 * 1000;

  run() {
    setInterval(async () => {
      await characterServiceInstance.regenerateResources();
    }, ResourceRegenerationJob.ONE_MINUTE);
  }
}

export default ResourceRegenerationJob;
