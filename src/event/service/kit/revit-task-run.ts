import type { ZodError } from 'zod';
import { array, number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { KitRevitTaskRunStatus } from '../../../workflow/service/kit/revit-task-run.js';
import { KIT_REVIT_TASK_RUN_STATUS_VALIDATOR } from '../../../workflow/service/kit/revit-task-run.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskRunCreated}.
 */
export type KitRevitTaskRunCreatedServiceEvent = {
  readonly revit_task_definition_id: UniqueIdentifierStringValue;

  readonly revit_task_run_id: UniqueIdentifierStringValue;
  readonly revit_task_run_status: KitRevitTaskRunStatus;
  readonly revit_task_run_created_at: TimestampStringValue;
  readonly revit_task_run_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_label: string;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitTaskRunCreatedServiceEvent}.
 */
export const KIT_REVIT_TASK_RUN_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskRunCreatedServiceEvent>>({
  revit_task_definition_id: string().uuid(),

  revit_task_run_id: string().uuid(),
  revit_task_run_status: KIT_REVIT_TASK_RUN_STATUS_VALIDATOR,
  revit_task_run_created_at: string().datetime({ offset: false }),
  revit_task_run_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_label: string(),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitTaskRunCreatedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_RUN_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskRunCreatedServiceEvent = captureToResult<KitRevitTaskRunCreatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_RUN_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskRunCreatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskRunCreatedServiceEvent}.
 */
export const createKitRevitTaskRunCreatedServiceEvent = createEventFactory<KitRevitTaskRunCreatedServiceEvent>(
  ServiceEventType.KitRevitTaskRunCreated,
  validateKitRevitTaskRunCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskRunUpdated}.
 */
export type KitRevitTaskRunUpdatedServiceEvent = {
  readonly revit_task_definition_id: UniqueIdentifierStringValue;

  readonly revit_task_run_id: UniqueIdentifierStringValue;
  readonly revit_task_run_status: KitRevitTaskRunStatus;
  readonly revit_task_run_created_at: TimestampStringValue;
  readonly revit_task_run_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_label: string;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitTaskRunUpdatedServiceEvent}.
 */
export const KIT_REVIT_TASK_RUN_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskRunUpdatedServiceEvent>>({
  revit_task_definition_id: string().uuid(),

  revit_task_run_id: string().uuid(),
  revit_task_run_status: KIT_REVIT_TASK_RUN_STATUS_VALIDATOR,
  revit_task_run_created_at: string().datetime({ offset: false }),
  revit_task_run_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_label: string(),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),

  output_files_count: number().int().min(0),
  output_files: array(REMOTE_FILE_SCHEMA),
});

/**
 * Validate {@link KitRevitTaskRunUpdatedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_RUN_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskRunUpdatedServiceEvent = captureToResult<KitRevitTaskRunUpdatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_RUN_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskRunUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskRunUpdatedServiceEvent}.
 */
export const createKitRevitTaskRunUpdatedServiceEvent = createEventFactory<KitRevitTaskRunUpdatedServiceEvent>(
  ServiceEventType.KitRevitTaskRunUpdated,
  validateKitRevitTaskRunUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskRunInProgress}.
 */
export type KitRevitTaskRunInProgressServiceEvent = {
  readonly revit_task_definition_id: UniqueIdentifierStringValue;

  readonly revit_task_run_id: UniqueIdentifierStringValue;
  readonly revit_task_run_status: KitRevitTaskRunStatus;
  readonly revit_task_run_external_id: string;
  readonly revit_task_run_created_at: TimestampStringValue;
  readonly revit_task_run_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_label: string;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitTaskRunInProgressServiceEvent}.
 */
export const KIT_REVIT_TASK_RUN_IN_PROGRESS_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskRunInProgressServiceEvent>>({
  revit_task_definition_id: string().uuid(),

  revit_task_run_id: string().uuid(),
  revit_task_run_status: KIT_REVIT_TASK_RUN_STATUS_VALIDATOR,
  revit_task_run_external_id: string().min(16),
  revit_task_run_created_at: string().datetime({ offset: false }),
  revit_task_run_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_label: string(),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitTaskRunInProgressServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_RUN_IN_PROGRESS_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskRunInProgressServiceEvent = captureToResult<KitRevitTaskRunInProgressServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_RUN_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskRunInProgressServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskRunInProgressServiceEvent}.
 */
export const createKitRevitTaskRunInProgressServiceEvent = createEventFactory<KitRevitTaskRunInProgressServiceEvent>(
  ServiceEventType.KitRevitTaskRunInProgress,
  validateKitRevitTaskRunInProgressServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskRunSucceeded}.
 */
export type KitRevitTaskRunSucceededServiceEvent = {
  readonly revit_task_definition_id: UniqueIdentifierStringValue;

  readonly revit_task_run_id: UniqueIdentifierStringValue;
  readonly revit_task_run_status: KitRevitTaskRunStatus;
  readonly revit_task_run_external_id: string;
  readonly revit_task_run_created_at: TimestampStringValue;
  readonly revit_task_run_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_label: string;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitTaskRunSucceededServiceEvent}.
 */
export const KIT_REVIT_TASK_RUN_SUCCEEDED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskRunSucceededServiceEvent>>({
  revit_task_definition_id: string().uuid(),

  revit_task_run_id: string().uuid(),
  revit_task_run_status: KIT_REVIT_TASK_RUN_STATUS_VALIDATOR,
  revit_task_run_external_id: string().min(16),
  revit_task_run_created_at: string().datetime({ offset: false }),
  revit_task_run_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_label: string(),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),

  output_files_count: number().int().min(1),
  output_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitTaskRunSucceededServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_RUN_SUCCEEDED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskRunSucceededServiceEvent = captureToResult<KitRevitTaskRunSucceededServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_RUN_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskRunSucceededServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskRunSucceededServiceEvent}.
 */
export const createKitRevitTaskRunSucceededServiceEvent = createEventFactory<KitRevitTaskRunSucceededServiceEvent>(
  ServiceEventType.KitRevitTaskRunSucceeded,
  validateKitRevitTaskRunSucceededServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskRunFailed}.
 */
export type KitRevitTaskRunFailedServiceEvent = {
  readonly revit_task_definition_id: UniqueIdentifierStringValue;

  readonly revit_task_run_id: UniqueIdentifierStringValue;
  readonly revit_task_run_status: KitRevitTaskRunStatus;
  readonly revit_task_run_external_id?: string;
  readonly revit_task_run_created_at: TimestampStringValue;
  readonly revit_task_run_updated_at: TimestampStringValue;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_export_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_building_export_label: string;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitTaskRunFailedServiceEvent}.
 */
export const KIT_REVIT_TASK_RUN_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskRunFailedServiceEvent>>({
  revit_task_definition_id: string().uuid(),

  revit_task_run_id: string().uuid(),
  revit_task_run_status: KIT_REVIT_TASK_RUN_STATUS_VALIDATOR,
  revit_task_run_external_id: string().min(16).optional(),
  revit_task_run_created_at: string().datetime({ offset: false }),
  revit_task_run_updated_at: string().datetime({ offset: false }),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_export_id: string().uuid(),
  project_scenario_design_building_export_label: string(),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),

  output_files_count: number().int().min(1),
  output_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitTaskRunFailedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_RUN_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskRunFailedServiceEvent = captureToResult<KitRevitTaskRunFailedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_RUN_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskRunFailedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskRunFailedServiceEvent}.
 */
export const createKitRevitTaskRunFailedServiceEvent = createEventFactory<KitRevitTaskRunFailedServiceEvent>(
  ServiceEventType.KitRevitTaskRunFailed,
  validateKitRevitTaskRunFailedServiceEvent,
);
