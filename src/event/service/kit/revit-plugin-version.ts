import type { ZodError } from 'zod';
import { array, number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { KitRevitPluginVersionStatus } from '../../../workflow/service/kit/revit-plugin-version.js';
import { KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR } from '../../../workflow/service/kit/revit-plugin-version.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginVersionCreated}.
 */
export type KitRevitPluginVersionCreatedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly revit_plugin_version_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_status: KitRevitPluginVersionStatus;
  readonly revit_plugin_version_created_at: TimestampStringValue;
  readonly revit_plugin_version_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginVersionCreatedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginVersionCreatedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  revit_plugin_version_id: string().uuid(),
  revit_plugin_version_status: KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR,
  revit_plugin_version_created_at: string().datetime({ offset: false }),
  revit_plugin_version_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginVersionCreatedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginVersionCreatedServiceEvent = captureToResult<KitRevitPluginVersionCreatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginVersionCreatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginVersionCreatedServiceEvent}.
 */
export const createKitRevitPluginVersionCreatedServiceEvent = createEventFactory<KitRevitPluginVersionCreatedServiceEvent>(
  ServiceEventType.KitRevitPluginVersionCreated,
  validateKitRevitPluginVersionCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginVersionUpdated}.
 */
export type KitRevitPluginVersionUpdatedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly revit_plugin_version_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_status: KitRevitPluginVersionStatus;
  readonly revit_plugin_version_created_at: TimestampStringValue;
  readonly revit_plugin_version_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginVersionUpdatedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_VERSION_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginVersionUpdatedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  revit_plugin_version_id: string().uuid(),
  revit_plugin_version_status: KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR,
  revit_plugin_version_created_at: string().datetime({ offset: false }),
  revit_plugin_version_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginVersionUpdatedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_VERSION_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginVersionUpdatedServiceEvent = captureToResult<KitRevitPluginVersionUpdatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_VERSION_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginVersionUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginVersionUpdatedServiceEvent}.
 */
export const createKitRevitPluginVersionUpdatedServiceEvent = createEventFactory<KitRevitPluginVersionUpdatedServiceEvent>(
  ServiceEventType.KitRevitPluginVersionUpdated,
  validateKitRevitPluginVersionUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginVersionUploaded}.
 */
export type KitRevitPluginVersionUploadedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly revit_plugin_version_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_status: KitRevitPluginVersionStatus;
  readonly revit_plugin_version_created_at: TimestampStringValue;
  readonly revit_plugin_version_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginVersionUploadedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_VERSION_UPLOADED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginVersionUploadedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  revit_plugin_version_id: string().uuid(),
  revit_plugin_version_status: KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR,
  revit_plugin_version_created_at: string().datetime({ offset: false }),
  revit_plugin_version_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginVersionUploadedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_VERSION_UPLOADED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginVersionUploadedServiceEvent = captureToResult<KitRevitPluginVersionUploadedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_VERSION_UPLOADED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginVersionUploadedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginVersionUploadedServiceEvent}.
 */
export const createKitRevitPluginVersionUploadedServiceEvent = createEventFactory<KitRevitPluginVersionUploadedServiceEvent>(
  ServiceEventType.KitRevitPluginVersionUploaded,
  validateKitRevitPluginVersionUploadedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginVersionFailed}.
 */
export type KitRevitPluginVersionFailedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly revit_plugin_version_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_status: KitRevitPluginVersionStatus;
  readonly revit_plugin_version_created_at: TimestampStringValue;
  readonly revit_plugin_version_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginVersionFailedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_VERSION_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginVersionFailedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  revit_plugin_version_id: string().uuid(),
  revit_plugin_version_status: KIT_REVIT_PLUGIN_VERSION_STATUS_VALIDATOR,
  revit_plugin_version_created_at: string().datetime({ offset: false }),
  revit_plugin_version_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginVersionFailedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_VERSION_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginVersionFailedServiceEvent = captureToResult<KitRevitPluginVersionFailedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_VERSION_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginVersionFailedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginVersionFailedServiceEvent}.
 */
export const createKitRevitPluginVersionFailedServiceEvent = createEventFactory<KitRevitPluginVersionFailedServiceEvent>(
  ServiceEventType.KitRevitPluginVersionFailed,
  validateKitRevitPluginVersionFailedServiceEvent,
);
