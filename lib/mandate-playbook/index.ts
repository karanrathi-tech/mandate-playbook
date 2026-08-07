export * from "./domain";
export * from "./repository";
export * from "./in-memory-repository";
export * from "./service";

import { InMemoryMandatePlaybookRepository, type InMemorySeed } from "./in-memory-repository";
import { MandatePlaybookService } from "./service";

export function createLocalMandatePlaybook(seed: InMemorySeed = {}) {
  const repository = new InMemoryMandatePlaybookRepository(seed);
  return new MandatePlaybookService(repository);
}
