# Mandate Playbook layers

The module is split into four replaceable layers:

1. **Interface** — Board, List, Gantt, onboarding, drawers and filters.
2. **Service** — validation and workflow rules.
3. **Repository contract** — storage operations used by the service.
4. **Storage adapter** — currently in-memory; PostgreSQL can be added later.

The interface and service do not need to know whether records are held in
memory, PostgreSQL, or supplied by the larger system. A future adapter only has
to implement `MandatePlaybookRepository`.

The current self-contained prototype remains unchanged while its screens are
migrated incrementally to call `MandatePlaybookService`. This keeps the working
prototype available during the refactor and avoids premature system integration.
