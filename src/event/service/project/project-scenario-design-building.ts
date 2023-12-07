import type { ZodError } from 'zod';
import { number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingCreated}.
 */
export type ProjectScenarioDesignBuildingCreatedServiceEvent = {
  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_building_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_index: number;
  readonly project_scenario_design_building_label: string;
  readonly project_scenario_design_building_created_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: string;
  readonly aggregation_building_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingCreatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingCreatedServiceEvent>>({
  project_id: string().uuid(),
  project_label: string(),

  project_scenario_id: string().uuid(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string().min(1),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_building_id: string().uuid(),
  project_scenario_design_building_index: number().min(0),
  project_scenario_design_building_label: string(),
  project_scenario_design_building_created_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
  aggregation_building_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignBuildingCreatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingCreatedServiceEvent = captureToResult<ProjectScenarioDesignBuildingCreatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingCreatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingCreatedServiceEvent}.
 */
export const createProjectScenarioDesignBuildingCreatedServiceEvent = createEventFactory<ProjectScenarioDesignBuildingCreatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingCreated,
  validateProjectScenarioDesignBuildingCreatedServiceEvent,
);
