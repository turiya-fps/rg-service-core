import type { ZodError } from 'zod';
import { array, number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { KitRevitExportPackageStatus } from '../../../workflow/service/kit/revit-export-package.js';
import { KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR } from '../../../workflow/service/kit/revit-export-package.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.KitRevitExportPackageCreated}.
 */
export type KitRevitExportPackageCreatedServiceEvent = {
  readonly revit_export_package_id: UniqueIdentifierStringValue;
  readonly revit_export_package_status: KitRevitExportPackageStatus;
  readonly revit_export_package_created_at: TimestampStringValue;
  readonly revit_export_package_updated_at: TimestampStringValue;

  readonly revit_task_run_ids: UniqueIdentifierStringValue[];

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_ids: UniqueIdentifierStringValue[];
  readonly project_scenario_design_building_export_ids: UniqueIdentifierStringValue[];
};

/**
 * A `zod` schema for {@link KitRevitExportPackageCreatedServiceEvent}.
 */
export const KIT_REVIT_EXPORT_PACKAGE_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitExportPackageCreatedServiceEvent>>({
  revit_export_package_id: string().uuid(),
  revit_export_package_status: KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR,
  revit_export_package_created_at: string().datetime({ offset: false }),
  revit_export_package_updated_at: string().datetime({ offset: false }),

  revit_task_run_ids: array(string().uuid()).min(1),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_ids: array(string().uuid()).min(1),
  project_scenario_design_building_export_ids: array(string().uuid()).min(1),
});

/**
 * Validate {@link KitRevitExportPackageCreatedServiceEvent} using the `zod` schema {@link KIT_REVIT_EXPORT_PACKAGE_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitExportPackageCreatedServiceEvent = captureToResult<KitRevitExportPackageCreatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_EXPORT_PACKAGE_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitExportPackageCreatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitExportPackageCreatedServiceEvent}.
 */
export const createKitRevitExportPackageCreatedServiceEvent = createEventFactory<KitRevitExportPackageCreatedServiceEvent>(
  ServiceEventType.KitRevitExportPackageCreated,
  validateKitRevitExportPackageCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitExportPackageUpdated}.
 */
export type KitRevitExportPackageUpdatedServiceEvent = {
  readonly revit_export_package_id: UniqueIdentifierStringValue;
  readonly revit_export_package_status: KitRevitExportPackageStatus;
  readonly revit_export_package_created_at: TimestampStringValue;
  readonly revit_export_package_updated_at: TimestampStringValue;

  readonly revit_task_run_ids: UniqueIdentifierStringValue[];

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_ids: UniqueIdentifierStringValue[];
  readonly project_scenario_design_building_export_ids: UniqueIdentifierStringValue[];

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitExportPackageUpdatedServiceEvent}.
 */
export const KIT_REVIT_EXPORT_PACKAGE_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitExportPackageUpdatedServiceEvent>>({
  revit_export_package_id: string().uuid(),
  revit_export_package_status: KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR,
  revit_export_package_created_at: string().datetime({ offset: false }),
  revit_export_package_updated_at: string().datetime({ offset: false }),

  revit_task_run_ids: array(string().uuid()).min(1),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_ids: array(string().uuid()).min(1),
  project_scenario_design_building_export_ids: array(string().uuid()).min(1),

  output_files_count: number().int().min(0),
  output_files: array(REMOTE_FILE_SCHEMA),
});

/**
 * Validate {@link KitRevitExportPackageUpdatedServiceEvent} using the `zod` schema {@link KIT_REVIT_EXPORT_PACKAGE_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitExportPackageUpdatedServiceEvent = captureToResult<KitRevitExportPackageUpdatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_EXPORT_PACKAGE_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitExportPackageUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitExportPackageUpdatedServiceEvent}.
 */
export const createKitRevitExportPackageUpdatedServiceEvent = createEventFactory<KitRevitExportPackageUpdatedServiceEvent>(
  ServiceEventType.KitRevitExportPackageUpdated,
  validateKitRevitExportPackageUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitExportPackageInProgress}.
 */
export type KitRevitExportPackageInProgressServiceEvent = {
  readonly revit_export_package_id: UniqueIdentifierStringValue;
  readonly revit_export_package_status: KitRevitExportPackageStatus;
  readonly revit_export_package_created_at: TimestampStringValue;
  readonly revit_export_package_updated_at: TimestampStringValue;

  readonly revit_task_run_ids: UniqueIdentifierStringValue[];

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_ids: UniqueIdentifierStringValue[];
  readonly project_scenario_design_building_export_ids: UniqueIdentifierStringValue[];
};

/**
 * A `zod` schema for {@link KitRevitExportPackageInProgressServiceEvent}.
 */
export const KIT_REVIT_EXPORT_PACKAGE_IN_PROGRESS_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitExportPackageInProgressServiceEvent>>({
  revit_export_package_id: string().uuid(),
  revit_export_package_status: KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR,
  revit_export_package_created_at: string().datetime({ offset: false }),
  revit_export_package_updated_at: string().datetime({ offset: false }),

  revit_task_run_ids: array(string().uuid()).min(1),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_ids: array(string().uuid()).min(1),
  project_scenario_design_building_export_ids: array(string().uuid()).min(1),
});

/**
 * Validate {@link KitRevitExportPackageInProgressServiceEvent} using the `zod` schema {@link KIT_REVIT_EXPORT_PACKAGE_IN_PROGRESS_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitExportPackageInProgressServiceEvent = captureToResult<KitRevitExportPackageInProgressServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_EXPORT_PACKAGE_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitExportPackageInProgressServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitExportPackageInProgressServiceEvent}.
 */
export const createKitRevitExportPackageInProgressServiceEvent = createEventFactory<KitRevitExportPackageInProgressServiceEvent>(
  ServiceEventType.KitRevitExportPackageInProgress,
  validateKitRevitExportPackageInProgressServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitExportPackageSucceeded}.
 */
export type KitRevitExportPackageSucceededServiceEvent = {
  readonly revit_export_package_id: UniqueIdentifierStringValue;
  readonly revit_export_package_status: KitRevitExportPackageStatus;
  readonly revit_export_package_created_at: TimestampStringValue;
  readonly revit_export_package_updated_at: TimestampStringValue;

  readonly revit_task_run_ids: UniqueIdentifierStringValue[];

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_ids: UniqueIdentifierStringValue[];
  readonly project_scenario_design_building_export_ids: UniqueIdentifierStringValue[];

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitExportPackageSucceededServiceEvent}.
 */
export const KIT_REVIT_EXPORT_PACKAGE_SUCCEEDED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitExportPackageSucceededServiceEvent>>({
  revit_export_package_id: string().uuid(),
  revit_export_package_status: KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR,
  revit_export_package_created_at: string().datetime({ offset: false }),
  revit_export_package_updated_at: string().datetime({ offset: false }),

  revit_task_run_ids: array(string().uuid()).min(1),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_ids: array(string().uuid()).min(1),
  project_scenario_design_building_export_ids: array(string().uuid()).min(1),

  output_files_count: number().int().min(1),
  output_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitExportPackageSucceededServiceEvent} using the `zod` schema {@link KIT_REVIT_EXPORT_PACKAGE_SUCCEEDED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitExportPackageSucceededServiceEvent = captureToResult<KitRevitExportPackageSucceededServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_EXPORT_PACKAGE_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitExportPackageSucceededServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitExportPackageSucceededServiceEvent}.
 */
export const createKitRevitExportPackageSucceededServiceEvent = createEventFactory<KitRevitExportPackageSucceededServiceEvent>(
  ServiceEventType.KitRevitExportPackageSucceeded,
  validateKitRevitExportPackageSucceededServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitExportPackageFailed}.
 */
export type KitRevitExportPackageFailedServiceEvent = {
  readonly revit_export_package_id: UniqueIdentifierStringValue;
  readonly revit_export_package_status: KitRevitExportPackageStatus;
  readonly revit_export_package_created_at: TimestampStringValue;
  readonly revit_export_package_updated_at: TimestampStringValue;

  readonly revit_task_run_ids: UniqueIdentifierStringValue[];

  readonly project_scenario_design_id: UniqueIdentifierStringValue;
  readonly project_scenario_design_label: string;

  readonly project_scenario_design_export_id: UniqueIdentifierStringValue;

  readonly project_scenario_design_building_ids: UniqueIdentifierStringValue[];
  readonly project_scenario_design_building_export_ids: UniqueIdentifierStringValue[];

  readonly output_files_count: number;
  readonly output_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitExportPackageFailedServiceEvent}.
 */
export const KIT_REVIT_EXPORT_PACKAGE_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitExportPackageFailedServiceEvent>>({
  revit_export_package_id: string().uuid(),
  revit_export_package_status: KIT_REVIT_EXPORT_PACKAGE_STATUS_VALIDATOR,
  revit_export_package_created_at: string().datetime({ offset: false }),
  revit_export_package_updated_at: string().datetime({ offset: false }),

  revit_task_run_ids: array(string().uuid()).min(1),

  project_scenario_design_id: string().uuid(),
  project_scenario_design_label: string(),

  project_scenario_design_export_id: string().uuid(),

  project_scenario_design_building_ids: array(string().uuid()).min(1),
  project_scenario_design_building_export_ids: array(string().uuid()).min(1),

  output_files_count: number().int().min(0),
  output_files: array(REMOTE_FILE_SCHEMA),
});

/**
 * Validate {@link KitRevitExportPackageFailedServiceEvent} using the `zod` schema {@link KIT_REVIT_EXPORT_PACKAGE_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitExportPackageFailedServiceEvent = captureToResult<KitRevitExportPackageFailedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_EXPORT_PACKAGE_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitExportPackageFailedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitExportPackageFailedServiceEvent}.
 */
export const createKitRevitExportPackageFailedServiceEvent = createEventFactory<KitRevitExportPackageFailedServiceEvent>(
  ServiceEventType.KitRevitExportPackageFailed,
  validateKitRevitExportPackageFailedServiceEvent,
);
