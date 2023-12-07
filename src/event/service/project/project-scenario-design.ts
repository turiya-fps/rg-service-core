import type { ZodError } from 'zod';
import { object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ProjectScenarioDesignAggregationFileExtractionStatus } from '../../../workflow/service/project/project-scenario-design.js';
import { PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS } from '../../../workflow/service/project/project-scenario-design.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignCreated}.
 */
export type ProjectScenarioDesignCreatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_file_extraction_status: ProjectScenarioDesignAggregationFileExtractionStatus;
  readonly aggregation_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignCreatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignCreatedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_id: string().uuid(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string().min(1),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),

  aggregation_file_extraction_status: PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS,
  aggregation_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignCreatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignCreatedServiceEvent = captureToResult<ProjectScenarioDesignCreatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignCreatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignCreatedServiceEvent}.
 */
export const createProjectScenarioDesignCreatedServiceEvent = createEventFactory<ProjectScenarioDesignCreatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignCreated,
  validateProjectScenarioDesignCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignUpdated}.
 */
export type ProjectScenarioDesignUpdatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_file_extraction_status: ProjectScenarioDesignAggregationFileExtractionStatus;
  readonly aggregation_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignUpdatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignUpdatedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_id: string().uuid(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string().min(1),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),

  aggregation_file_extraction_status: PROJECT_SCENARIO_DESIGN_AGGREGATION_FILE_EXTRACTION_STATUS,
  aggregation_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignUpdatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignUpdatedServiceEvent = captureToResult<ProjectScenarioDesignUpdatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignUpdatedServiceEvent}.
 */
export const createProjectScenarioDesignUpdatedServiceEvent = createEventFactory<ProjectScenarioDesignUpdatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignUpdated,
  validateProjectScenarioDesignUpdatedServiceEvent,
);
