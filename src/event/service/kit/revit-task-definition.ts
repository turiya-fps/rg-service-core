import type { ZodError } from 'zod';
import { object, string } from 'zod';
import type { UniqueIdentifierStringValue } from '../../../data/identifier.js';
import type { TimestampStringValue } from '../../../data/timestamp.js';
import { createEventFactory } from '../../../event.js';
import { captureToResult } from '../../../result.js';
import type { ToZodSchema } from '../../../validation/zod.js';
import type { KitRevitTaskDefinitionStatus } from '../../../workflow/service/kit/revit-task-definition.js';
import { KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR } from '../../../workflow/service/kit/revit-task-definition.js';
import { ServiceEventType } from '../../service.js';

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskDefinitionCreated}.
 */
export type KitRevitTaskDefinitionCreatedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_id: UniqueIdentifierStringValue;

  readonly revit_task_definition_id: UniqueIdentifierStringValue;
  readonly revit_task_definition_status: KitRevitTaskDefinitionStatus;
  readonly revit_task_definition_created_at: TimestampStringValue;
  readonly revit_task_definition_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link KitRevitTaskDefinitionCreatedServiceEvent}.
 */
export const KIT_REVIT_TASK_DEFINITION_CREATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskDefinitionCreatedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_version_id: string().uuid(),

  revit_task_definition_id: string().uuid(),
  revit_task_definition_status: KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR,
  revit_task_definition_created_at: string().datetime({ offset: false }),
  revit_task_definition_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link KitRevitTaskDefinitionCreatedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_DEFINITION_CREATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskDefinitionCreatedServiceEvent = captureToResult<KitRevitTaskDefinitionCreatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_DEFINITION_CREATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskDefinitionCreatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskDefinitionCreatedServiceEvent}.
 */
export const createKitRevitTaskDefinitionCreatedServiceEvent = createEventFactory<KitRevitTaskDefinitionCreatedServiceEvent>(
  ServiceEventType.KitRevitTaskDefinitionCreated,
  validateKitRevitTaskDefinitionCreatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskDefinitionUpdated}.
 */
export type KitRevitTaskDefinitionUpdatedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_id: UniqueIdentifierStringValue;

  readonly revit_task_definition_id: UniqueIdentifierStringValue;
  readonly revit_task_definition_status: KitRevitTaskDefinitionStatus;
  readonly revit_task_definition_created_at: TimestampStringValue;
  readonly revit_task_definition_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link KitRevitTaskDefinitionUpdatedServiceEvent}.
 */
export const KIT_REVIT_TASK_DEFINITION_UPDATED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskDefinitionUpdatedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_version_id: string().uuid(),

  revit_task_definition_id: string().uuid(),
  revit_task_definition_status: KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR,
  revit_task_definition_created_at: string().datetime({ offset: false }),
  revit_task_definition_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link KitRevitTaskDefinitionUpdatedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_DEFINITION_UPDATED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskDefinitionUpdatedServiceEvent = captureToResult<KitRevitTaskDefinitionUpdatedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_DEFINITION_UPDATED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskDefinitionUpdatedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskDefinitionUpdatedServiceEvent}.
 */
export const createKitRevitTaskDefinitionUpdatedServiceEvent = createEventFactory<KitRevitTaskDefinitionUpdatedServiceEvent>(
  ServiceEventType.KitRevitTaskDefinitionUpdated,
  validateKitRevitTaskDefinitionUpdatedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskDefinitionSynchronised}.
 */
export type KitRevitTaskDefinitionSynchronisedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_id: UniqueIdentifierStringValue;

  readonly revit_task_definition_id: UniqueIdentifierStringValue;
  readonly revit_task_definition_status: KitRevitTaskDefinitionStatus;
  readonly revit_task_definition_created_at: TimestampStringValue;
  readonly revit_task_definition_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link KitRevitTaskDefinitionSynchronisedServiceEvent}.
 */
export const KIT_REVIT_TASK_DEFINITION_SYNCHRONISED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskDefinitionSynchronisedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_version_id: string().uuid(),

  revit_task_definition_id: string().uuid(),
  revit_task_definition_status: KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR,
  revit_task_definition_created_at: string().datetime({ offset: false }),
  revit_task_definition_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link KitRevitTaskDefinitionSynchronisedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_DEFINITION_SYNCHRONISED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskDefinitionSynchronisedServiceEvent = captureToResult<KitRevitTaskDefinitionSynchronisedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_DEFINITION_SYNCHRONISED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskDefinitionSynchronisedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskDefinitionSynchronisedServiceEvent}.
 */
export const createKitRevitTaskDefinitionSynchronisedServiceEvent = createEventFactory<KitRevitTaskDefinitionSynchronisedServiceEvent>(
  ServiceEventType.KitRevitTaskDefinitionSynchronised,
  validateKitRevitTaskDefinitionSynchronisedServiceEvent,
);

/**
 * Event payload for {@link ServiceEventType.KitRevitTaskDefinitionFailed}.
 */
export type KitRevitTaskDefinitionFailedServiceEvent = {
  readonly revit_plugin_id: UniqueIdentifierStringValue;
  readonly revit_plugin_version_id: UniqueIdentifierStringValue;

  readonly revit_task_definition_id: UniqueIdentifierStringValue;
  readonly revit_task_definition_status: KitRevitTaskDefinitionStatus;
  readonly revit_task_definition_created_at: TimestampStringValue;
  readonly revit_task_definition_updated_at: TimestampStringValue;

  readonly kit_library_version_id: UniqueIdentifierStringValue;
};

/**
 * A `zod` schema for {@link KitRevitTaskDefinitionFailedServiceEvent}.
 */
export const KIT_REVIT_TASK_DEFINITION_FAILED_SERVICE_EVENT_SCHEMA = object<ToZodSchema<KitRevitTaskDefinitionFailedServiceEvent>>({
  revit_plugin_id: string().uuid(),
  revit_plugin_version_id: string().uuid(),

  revit_task_definition_id: string().uuid(),
  revit_task_definition_status: KIT_REVIT_TASK_DEFINITION_STATUS_VALIDATOR,
  revit_task_definition_created_at: string().datetime({ offset: false }),
  revit_task_definition_updated_at: string().datetime({ offset: false }),

  kit_library_version_id: string().uuid(),
});

/**
 * Validate {@link KitRevitTaskDefinitionFailedServiceEvent} using the `zod` schema {@link KIT_REVIT_TASK_DEFINITION_FAILED_SERVICE_EVENT_SCHEMA}.
 */
export const validateKitRevitTaskDefinitionFailedServiceEvent = captureToResult<KitRevitTaskDefinitionFailedServiceEvent, ZodError>()((x) => {
  return KIT_REVIT_TASK_DEFINITION_FAILED_SERVICE_EVENT_SCHEMA.parse(x) as KitRevitTaskDefinitionFailedServiceEvent;
});

/**
 * Create the base event information for {@link KitRevitTaskDefinitionFailedServiceEvent}.
 */
export const createKitRevitTaskDefinitionFailedServiceEvent = createEventFactory<KitRevitTaskDefinitionFailedServiceEvent>(
  ServiceEventType.KitRevitTaskDefinitionFailed,
  validateKitRevitTaskDefinitionFailedServiceEvent,
);
