import type { ZodError } from 'zod';
import { array, number, object, string } from 'zod';
import type { RemoteFile } from '../../../data/file.js';
import { REMOTE_FILE_SCHEMA } from '../../../data/file.js';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { KitRevitPluginStatus } from '../../../workflow/service/kit/revit-plugin.js';
import { KIT_REVIT_PLUGIN_STATUS_VALIDATOR } from '../../../workflow/service/kit/revit-plugin.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginCreated}.
 */
export type KitRevitPluginCreatedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_status: KitRevitPluginStatus;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginCreatedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginCreatedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_status: KIT_REVIT_PLUGIN_STATUS_VALIDATOR,
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginCreatedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginCreatedServiceEvent = captureToResult<KitRevitPluginCreatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginCreatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginCreatedServiceEvent}.
 */
export const createKitRevitPluginCreatedServiceEvent = createEventFactory<KitRevitPluginCreatedServiceEvent>(
  ServiceEventType.KitRevitPluginCreated,
  validateKitRevitPluginCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginUpdated}.
 */
export type KitRevitPluginUpdatedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_status: KitRevitPluginStatus;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginUpdatedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginUpdatedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_status: KIT_REVIT_PLUGIN_STATUS_VALIDATOR,
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginUpdatedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginUpdatedServiceEvent = captureToResult<KitRevitPluginUpdatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginUpdatedServiceEvent}.
 */
export const createKitRevitPluginUpdatedServiceEvent = createEventFactory<KitRevitPluginUpdatedServiceEvent>(
  ServiceEventType.KitRevitPluginUpdated,
  validateKitRevitPluginUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginUploaded}.
 */
export type KitRevitPluginUploadedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_status: KitRevitPluginStatus;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginUploadedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_UPLOADED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginUploadedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_status: KIT_REVIT_PLUGIN_STATUS_VALIDATOR,
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginUploadedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_UPLOADED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginUploadedServiceEvent = captureToResult<KitRevitPluginUploadedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_UPLOADED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginUploadedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginUploadedServiceEvent}.
 */
export const createKitRevitPluginUploadedServiceEvent = createEventFactory<KitRevitPluginUploadedServiceEvent>(
  ServiceEventType.KitRevitPluginUploaded,
  validateKitRevitPluginUploadedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitPluginFailed}.
 */
export type KitRevitPluginFailedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_status: KitRevitPluginStatus;
  readonly revit_plugin_created_at: TimestampStringValue;
  readonly revit_plugin_updated_at: TimestampStringValue;

  readonly autodesk_engine: string;
  readonly autodesk_engine_release: number;

  readonly input_files_count: number;
  readonly input_files: RemoteFile[];
};

/**
 * A `zod` schema for {@link KitRevitPluginFailedServiceEvent}.
 */
export const KIT_REVIT_PLUGIN_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitPluginFailedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_status: KIT_REVIT_PLUGIN_STATUS_VALIDATOR,
  revit_plugin_created_at: string().datetime({ offset: false }),
  revit_plugin_updated_at: string().datetime({ offset: false }),

  autodesk_engine: string().min(3),
  autodesk_engine_release: number().min(2000),

  input_files_count: number().int().min(1),
  input_files: array(REMOTE_FILE_SCHEMA).min(1),
});

/**
 * Validate {@link KitRevitPluginFailedServiceEvent} using the `zod` schema {@link KIT_REVIT_PLUGIN_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitPluginFailedServiceEvent = captureToResult<KitRevitPluginFailedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_PLUGIN_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitPluginFailedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitPluginFailedServiceEvent}.
 */
export const createKitRevitPluginFailedServiceEvent = createEventFactory<KitRevitPluginFailedServiceEvent>(
  ServiceEventType.KitRevitPluginFailed,
  validateKitRevitPluginFailedServiceEvent,
);
