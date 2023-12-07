import type { ZodError } from 'zod';
import { number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ProjectScenarioDesignBuildingExportStatus } from '../../../workflow/service/project/project-scenario-design-building-export.js';
import { PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS } from '../../../workflow/service/project/project-scenario-design-building-export.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingExportCreated}.
 */
export type ProjectScenarioDesignBuildingExportCreatedServiceEvent = {
  readonly user_id: string;

  readonly project_id: string;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_status: ProjectScenarioDesignBuildingExportStatus;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingExportCreatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingExportCreatedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_status: PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS,

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignBuildingExportCreatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingExportCreatedServiceEvent = captureToResult<ProjectScenarioDesignBuildingExportCreatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingExportCreatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingExportCreatedServiceEvent}.
 */
export const createProjectScenarioDesignBuildingExportCreatedServiceEvent = createEventFactory<ProjectScenarioDesignBuildingExportCreatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingExportCreated,
  validateProjectScenarioDesignBuildingExportCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingExportUpdated}.
 */
export type ProjectScenarioDesignBuildingExportUpdatedServiceEvent = {
  readonly user_id: string;

  readonly project_id: string;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_status: ProjectScenarioDesignBuildingExportStatus;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingExportUpdatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingExportUpdatedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_status: PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS,

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignBuildingExportUpdatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingExportUpdatedServiceEvent = captureToResult<ProjectScenarioDesignBuildingExportUpdatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingExportUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingExportUpdatedServiceEvent}.
 */
export const createProjectScenarioDesignBuildingExportUpdatedServiceEvent = createEventFactory<ProjectScenarioDesignBuildingExportUpdatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingExportUpdated,
  validateProjectScenarioDesignBuildingExportUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingExportReady}.
 */
export type ProjectScenarioDesignBuildingExportReadyServiceEvent = {
  readonly user_id: string;

  readonly project_id: string;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_index: number;
  readonly project_scenario_design_building_label: string;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_status: ProjectScenarioDesignBuildingExportStatus;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: UniqueIdentifierStringValue;
  readonly aggregation_building_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingExportReadyServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_READY_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingExportReadyServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_id: string().uuid(),
  project_scenario_design_building_index: number().min(0),
  project_scenario_design_building_label: string(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_status: PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS,

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
  aggregation_building_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignBuildingExportReadyServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_READY_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingExportReadyServiceEvent = captureToResult<ProjectScenarioDesignBuildingExportReadyServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_READY_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingExportReadyServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingExportReadyServiceEvent}.
 */
export const createProjectScenarioDesignBuildingExportReadyServiceEvent = createEventFactory<ProjectScenarioDesignBuildingExportReadyServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingExportReady,
  validateProjectScenarioDesignBuildingExportReadyServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingExportInProgress}.
 */
export type ProjectScenarioDesignBuildingExportInProgressServiceEvent = {
  readonly user_id: string;

  readonly project_id: string;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_index: number;
  readonly project_scenario_design_building_label: string;

  readonly project_scenario_design_building_export_id: string;
  readonly project_scenario_design_building_export_status: ProjectScenarioDesignBuildingExportStatus;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: string;
  readonly aggregation_building_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingExportInProgressServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingExportInProgressServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_id: string().uuid(),
  project_scenario_design_building_index: number().min(0),
  project_scenario_design_building_label: string(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_status: PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS,

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
  aggregation_building_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignBuildingExportInProgressServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingExportInProgressServiceEvent = captureToResult<ProjectScenarioDesignBuildingExportInProgressServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingExportInProgressServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingExportInProgressServiceEvent}.
 */
export const createProjectScenarioDesignBuildingExportInProgressServiceEvent = createEventFactory<ProjectScenarioDesignBuildingExportInProgressServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingExportInProgress,
  validateProjectScenarioDesignBuildingExportInProgressServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingExportSucceeded}.
 */
export type ProjectScenarioDesignBuildingExportSucceededServiceEvent = {
  readonly user_id: string;

  readonly project_id: string;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_index: number;
  readonly project_scenario_design_building_label: string;

  readonly project_scenario_design_building_export_id: string;
  readonly project_scenario_design_building_export_status: ProjectScenarioDesignBuildingExportStatus;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: string;
  readonly aggregation_building_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingExportSucceededServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingExportSucceededServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_id: string().uuid(),
  project_scenario_design_building_index: number().min(0),
  project_scenario_design_building_label: string(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_status: PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS,

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
  aggregation_building_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignBuildingExportSucceededServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingExportSucceededServiceEvent = captureToResult<ProjectScenarioDesignBuildingExportSucceededServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingExportSucceededServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingExportSucceededServiceEvent}.
 */
export const createProjectScenarioDesignBuildingExportSucceededServiceEvent = createEventFactory<ProjectScenarioDesignBuildingExportSucceededServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingExportSucceeded,
  validateProjectScenarioDesignBuildingExportSucceededServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignBuildingExportFailed}.
 */
export type ProjectScenarioDesignBuildingExportFailedServiceEvent = {
  readonly user_id: string;

  readonly project_id: string;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_index: number;
  readonly project_scenario_design_building_label: string;

  readonly project_scenario_design_building_export_id: string;
  readonly project_scenario_design_building_export_status: ProjectScenarioDesignBuildingExportStatus;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly aggregation_building_id: string;
  readonly aggregation_building_file: RemoteFile;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignBuildingExportFailedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignBuildingExportFailedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_id: string().uuid(),
  project_scenario_design_building_index: number().min(0),
  project_scenario_design_building_label: string(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_status: PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_STATUS,

  kit_library_version_id: string().uuid(),

  aggregation_building_id: string().uuid(),
  aggregation_building_file: REMOTE_FILE_SCHEMA,
});

/**
 * Validate {@link ProjectScenarioDesignBuildingExportFailedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignBuildingExportFailedServiceEvent = captureToResult<ProjectScenarioDesignBuildingExportFailedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignBuildingExportFailedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignBuildingExportFailedServiceEvent}.
 */
export const createProjectScenarioDesignBuildingExportFailedServiceEvent = createEventFactory<ProjectScenarioDesignBuildingExportFailedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignBuildingExportFailed,
  validateProjectScenarioDesignBuildingExportFailedServiceEvent,
);
