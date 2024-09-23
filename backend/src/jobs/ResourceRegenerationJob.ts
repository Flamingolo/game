import characterServiceInstance from '../service/characterService';

class ResourceRegenerationJob {
  private static readonly ONE_MINUTE = 20 * 1000;

  run() {
    setInterval(async () => {
      console.log("ResourceRegenerationJob started")
      await characterServiceInstance.regenerateResources();
    }, ResourceRegenerationJob.ONE_MINUTE);
  }
}

export default ResourceRegenerationJob;
