import type { ZodError } from 'zod';
import { array, number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { ProjectScenarioDesignExportStatus } from '../../../workflow/service/project/project-scenario-design-export.js';
import { PROJECT_SCENARIO_DESIGN_EXPORT_STATUS } from '../../../workflow/service/project/project-scenario-design-export.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignExportCreated}.
 */
export type ProjectScenarioDesignExportCreatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_export_status: ProjectScenarioDesignExportStatus;
  readonly project_scenario_design_export_created_at: TimestampStringValue;
  readonly project_scenario_design_export_updated_at: TimestampStringValue;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_amount: number;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignExportCreatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignExportCreatedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string().min(1),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),
  project_scenario_design_export_status: PROJECT_SCENARIO_DESIGN_EXPORT_STATUS,
  project_scenario_design_export_created_at: string().datetime({ offset: false }),
  project_scenario_design_export_updated_at: string().datetime({ offset: false }),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_amount: number(),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignExportCreatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_EXPORT_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignExportCreatedServiceEvent = captureToResult<ProjectScenarioDesignExportCreatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_EXPORT_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignExportCreatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignExportCreatedServiceEvent}.
 */
export const createProjectScenarioDesignExportCreatedServiceEvent = createEventFactory<ProjectScenarioDesignExportCreatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignExportCreated,
  validateProjectScenarioDesignExportCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignExportUpdated}.
 */
export type ProjectScenarioDesignExportUpdatedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_export_status: ProjectScenarioDesignExportStatus;
  readonly project_scenario_design_export_created_at: TimestampStringValue;
  readonly project_scenario_design_export_updated_at: TimestampStringValue;

  readonly export_credit_transaction_id: UniqueIdentifierStringValue;
  readonly export_credit_transaction_amount: number;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignExportUpdatedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignExportUpdatedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),
  project_scenario_design_export_status: PROJECT_SCENARIO_DESIGN_EXPORT_STATUS,
  project_scenario_design_export_created_at: string().datetime({ offset: false }),
  project_scenario_design_export_updated_at: string().datetime({ offset: false }),

  export_credit_transaction_id: string().uuid(),
  export_credit_transaction_amount: number(),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignExportUpdatedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignExportUpdatedServiceEvent = captureToResult<ProjectScenarioDesignExportUpdatedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignExportUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignExportUpdatedServiceEvent}.
 */
export const createProjectScenarioDesignExportUpdatedServiceEvent = createEventFactory<ProjectScenarioDesignExportUpdatedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignExportUpdated,
  validateProjectScenarioDesignExportUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignExportReady}.
 */
export type ProjectScenarioDesignExportReadyServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_export_status: ProjectScenarioDesignExportStatus;
  readonly project_scenario_design_export_created_at: TimestampStringValue;
  readonly project_scenario_design_export_updated_at: TimestampStringValue;

  readonly project_scenario_design_building_export_ids: UniqueIdentifierStringValue[];

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignExportReadyServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_READY_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignExportReadyServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),
  project_scenario_design_export_status: PROJECT_SCENARIO_DESIGN_EXPORT_STATUS,
  project_scenario_design_export_created_at: string().datetime({ offset: false }),
  project_scenario_design_export_updated_at: string().datetime({ offset: false }),

  project_scenario_design_building_export_ids: array(string().uuid()).min(1),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignExportReadyServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_EXPORT_READY_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignExportReadyServiceEvent = captureToResult<ProjectScenarioDesignExportReadyServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_EXPORT_READY_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignExportReadyServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignExportReadyServiceEvent}.
 */
export const createProjectScenarioDesignExportReadyServiceEvent = createEventFactory<ProjectScenarioDesignExportReadyServiceEvent>(
  ServiceEventType.ProjectScenarioDesignExportReady,
  validateProjectScenarioDesignExportReadyServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignExportInProgress}.
 */
export type ProjectScenarioDesignExportInProgressServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_export_status: ProjectScenarioDesignExportStatus;
  readonly project_scenario_design_export_created_at: TimestampStringValue;
  readonly project_scenario_design_export_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignExportInProgressServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignExportInProgressServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),
  project_scenario_design_export_status: PROJECT_SCENARIO_DESIGN_EXPORT_STATUS,
  project_scenario_design_export_created_at: string().datetime({ offset: false }),
  project_scenario_design_export_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignExportInProgressServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignExportInProgressServiceEvent = captureToResult<ProjectScenarioDesignExportInProgressServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignExportInProgressServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignExportInProgressServiceEvent}.
 */
export const createProjectScenarioDesignExportInProgressServiceEvent = createEventFactory<ProjectScenarioDesignExportInProgressServiceEvent>(
  ServiceEventType.ProjectScenarioDesignExportInProgress,
  validateProjectScenarioDesignExportInProgressServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignExportSucceeded}.
 */
export type ProjectScenarioDesignExportSucceededServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_export_status: ProjectScenarioDesignExportStatus;
  readonly project_scenario_design_export_created_at: TimestampStringValue;
  readonly project_scenario_design_export_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignExportSucceededServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignExportSucceededServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),
  project_scenario_design_export_status: PROJECT_SCENARIO_DESIGN_EXPORT_STATUS,
  project_scenario_design_export_created_at: string().datetime({ offset: false }),
  project_scenario_design_export_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),

  output_files_count: number().int().min(1),
  output_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link ProjectScenarioDesignExportSucceededServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignExportSucceededServiceEvent = captureToResult<ProjectScenarioDesignExportSucceededServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignExportSucceededServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignExportSucceededServiceEvent}.
 */
export const createProjectScenarioDesignExportSucceededServiceEvent = createEventFactory<ProjectScenarioDesignExportSucceededServiceEvent>(
  ServiceEventType.ProjectScenarioDesignExportSucceeded,
  validateProjectScenarioDesignExportSucceededServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.ProjectScenarioDesignExportFailed}.
 */
export type ProjectScenarioDesignExportFailedServiceEvent = {
  readonly user_id: UniqueIdentifierStringValue;

  readonly project_id: UniqueIdentifierStringValue;
  readonly project_label: string;

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;
  readonly project_scenario_design_created_at: TimestampStringValue;
  readonly project_scenario_design_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_export_status: ProjectScenarioDesignExportStatus;
  readonly project_scenario_design_export_created_at: TimestampStringValue;
  readonly project_scenario_design_export_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link ProjectScenarioDesignExportFailedServiceEvent}.
 */
export const PROJECT_SCENARIO_DESIGN_EXPORT_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<ProjectScenarioDesignExportFailedServiceEvent>>({
  user_id: string().uuid(),

  project_id: string().uuid(),
  project_label: string(),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),
  project_scenario_design_created_at: string().datetime({ offset: false }),
  project_scenario_design_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),
  project_scenario_design_export_status: PROJECT_SCENARIO_DESIGN_EXPORT_STATUS,
  project_scenario_design_export_created_at: string().datetime({ offset: false }),
  project_scenario_design_export_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link ProjectScenarioDesignExportFailedServiceEvent} using the `zod` schema {@link PROJECT_SCENARIO_DESIGN_EXPORT_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateProjectScenarioDesignExportFailedServiceEvent = captureToResult<ProjectScenarioDesignExportFailedServiceEvent, ZodError>()((x) => {
  return PROJECT_SCENARIO_DESIGN_EXPORT_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as ProjectScenarioDesignExportFailedServiceEvent;
});

/**
 * Create the base event information for {@link ProjectScenarioDesignExportFailedServiceEvent}.
 */
export const createProjectScenarioDesignExportFailedServiceEvent = createEventFactory<ProjectScenarioDesignExportFailedServiceEvent>(
  ServiceEventType.ProjectScenarioDesignExportFailed,
  validateProjectScenarioDesignExportFailedServiceEvent,
);
