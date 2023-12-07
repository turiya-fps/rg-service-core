import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { KitRevitTaskDefinitionCreatedServiceEvent, KitRevitTaskDefinitionFailedServiceEvent, KitRevitTaskDefinitionSynchronisedServiceEvent, KitRevitTaskDefinitionUpdatedServiceEvent } from './revit-task-definition.js';
import { KIT_REVIT_TASK_DEFINITION_CREATED_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_DEFINITION_FAILED_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_DEFINITION_SYNCHRONISED_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_DEFINITION_UPDATED_SERVICE_EVENT_SCHEMA, createKitRevitTaskDefinitionCreatedServiceEvent, createKitRevitTaskDefinitionFailedServiceEvent, createKitRevitTaskDefinitionSynchronisedServiceEvent, createKitRevitTaskDefinitionUpdatedServiceEvent } from './revit-task-definition.js';

describe('KIT_REVIT_TASK_DEFINITION_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_DEFINITION_CREATED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Pending,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionCreatedServiceEvent),
    ).toStrictEqual<KitRevitTaskDefinitionCreatedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

      revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
      revit_task_definition_status: WorkflowStatus.Pending,
      revit_task_definition_created_at: '2023-10-19T14:50:58Z',
      revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

      kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
    });
  });
});

describe('createKitRevitTaskDefinitionCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskDefinitionCreatedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Pending,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskDefinitionCreated,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Pending,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionCreatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_DEFINITION_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_DEFINITION_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Pending,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionUpdatedServiceEvent),
    ).toStrictEqual<KitRevitTaskDefinitionUpdatedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

      revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
      revit_task_definition_status: WorkflowStatus.Pending,
      revit_task_definition_created_at: '2023-10-19T14:50:58Z',
      revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

      kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
    });
  });
});

describe('createKitRevitTaskDefinitionUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskDefinitionUpdatedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Pending,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskDefinitionUpdated,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Pending,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionUpdatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_DEFINITION_SYNCHRONISED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_DEFINITION_SYNCHRONISED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Synchronised,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionSynchronisedServiceEvent),
    ).toStrictEqual<KitRevitTaskDefinitionSynchronisedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

      revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
      revit_task_definition_status: WorkflowStatus.Synchronised,
      revit_task_definition_created_at: '2023-10-19T14:50:58Z',
      revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

      kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
    });
  });
});

describe('createKitRevitTaskDefinitionSynchronisedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskDefinitionSynchronisedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Synchronised,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskDefinitionSynchronised,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Synchronised,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionSynchronisedServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_DEFINITION_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_DEFINITION_FAILED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Failed,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionFailedServiceEvent),
    ).toStrictEqual<KitRevitTaskDefinitionFailedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

      revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
      revit_task_definition_status: WorkflowStatus.Failed,
      revit_task_definition_created_at: '2023-10-19T14:50:58Z',
      revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

      kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
    });
  });
});

describe('createKitRevitTaskDefinitionFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskDefinitionFailedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Failed,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskDefinitionFailed,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',

        revit_task_definition_id: 'daff7a2a-02f8-47a2-a02a-d34d7e048f99',
        revit_task_definition_status: WorkflowStatus.Failed,
        revit_task_definition_created_at: '2023-10-19T14:50:58Z',
        revit_task_definition_updated_at: '2023-10-19T14:50:58Z',

        kit_library_version_id: 'e51cecc0-4a50-46d5-9996-f1511ba17efd',
      } satisfies KitRevitTaskDefinitionFailedServiceEvent),
    });
  });
});
