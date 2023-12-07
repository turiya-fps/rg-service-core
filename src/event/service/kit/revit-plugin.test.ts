import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { KitRevitPluginCreatedServiceEvent, KitRevitPluginFailedServiceEvent, KitRevitPluginUpdatedServiceEvent, KitRevitPluginUploadedServiceEvent } from './revit-plugin.js';
import { KIT_REVIT_PLUGIN_CREATED_SERVICE_EVENT_SCHEMA, KIT_REVIT_PLUGIN_FAILED_SERVICE_EVENT_SCHEMA, KIT_REVIT_PLUGIN_UPDATED_SERVICE_EVENT_SCHEMA, KIT_REVIT_PLUGIN_UPLOADED_SERVICE_EVENT_SCHEMA, createKitRevitPluginCreatedServiceEvent, createKitRevitPluginFailedServiceEvent, createKitRevitPluginUpdatedServiceEvent, createKitRevitPluginUploadedServiceEvent } from './revit-plugin.js';

describe('KIT_REVIT_PLUGIN_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_CREATED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Pending,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginCreatedServiceEvent),
    ).toStrictEqual<KitRevitPluginCreatedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_status: WorkflowStatus.Pending,
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      autodesk_engine: 'test:value:engine',
      autodesk_engine_release: 2023,

      input_files_count: 1,
      input_files: [
        {
          id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
          type: 'example-file-type',
          bytes: 453,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitPluginCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginCreatedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Pending,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitPluginCreated,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Pending,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginCreatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_PLUGIN_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Pending,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginUpdatedServiceEvent),
    ).toStrictEqual<KitRevitPluginUpdatedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_status: WorkflowStatus.Pending,
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      autodesk_engine: 'test:value:engine',
      autodesk_engine_release: 2023,

      input_files_count: 1,
      input_files: [
        {
          id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
          type: 'example-file-type',
          bytes: 453,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitPluginUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginUpdatedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Pending,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitPluginUpdated,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Pending,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginUpdatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_PLUGIN_UPLOADED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_UPLOADED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Uploaded,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginUploadedServiceEvent),
    ).toStrictEqual<KitRevitPluginUploadedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_status: WorkflowStatus.Uploaded,
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      autodesk_engine: 'test:value:engine',
      autodesk_engine_release: 2023,

      input_files_count: 1,
      input_files: [
        {
          id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
          type: 'example-file-type',
          bytes: 453,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitPluginUploadedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginUploadedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Uploaded,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitPluginUploaded,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Uploaded,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginUploadedServiceEvent),
    });
  });
});

describe('KIT_REVIT_PLUGIN_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_FAILED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Failed,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginFailedServiceEvent),
    ).toStrictEqual<KitRevitPluginFailedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_status: WorkflowStatus.Failed,
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      autodesk_engine: 'test:value:engine',
      autodesk_engine_release: 2023,

      input_files_count: 1,
      input_files: [
        {
          id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
          type: 'example-file-type',
          bytes: 453,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitPluginFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginFailedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Failed,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitPluginFailed,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_status: WorkflowStatus.Failed,
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        autodesk_engine: 'test:value:engine',
        autodesk_engine_release: 2023,

        input_files_count: 1,
        input_files: [
          {
            id: 'c8a96944-ce7c-4ccf-99f7-f4f153aba46d',
            type: 'example-file-type',
            bytes: 453,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitPluginFailedServiceEvent),
    });
  });
});
