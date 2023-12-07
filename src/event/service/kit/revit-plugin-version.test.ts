import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { KitRevitPluginVersionCreatedServiceEvent, KitRevitPluginVersionFailedServiceEvent, KitRevitPluginVersionUpdatedServiceEvent, KitRevitPluginVersionUploadedServiceEvent } from './revit-plugin-version.js';
import { KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA, KIT_REVIT_PLUGIN_VERSION_FAILED_SERVICE_EVENT_SCHEMA, KIT_REVIT_PLUGIN_VERSION_UPLOADED_SERVICE_EVENT_SCHEMA, createKitRevitPluginVersionCreatedServiceEvent, createKitRevitPluginVersionFailedServiceEvent, createKitRevitPluginVersionUpdatedServiceEvent, createKitRevitPluginVersionUploadedServiceEvent } from './revit-plugin-version.js';

describe('KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Pending,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionCreatedServiceEvent),
    ).toStrictEqual<KitRevitPluginVersionCreatedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
      revit_plugin_version_status: WorkflowStatus.Pending,
      revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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

describe('createKitRevitPluginVersionCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginVersionCreatedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Pending,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      DetailType: ServiceEventType.KitRevitPluginVersionCreated,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Pending,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionCreatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_VERSION_CREATED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Pending,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionUpdatedServiceEvent),
    ).toStrictEqual<KitRevitPluginVersionUpdatedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
      revit_plugin_version_status: WorkflowStatus.Pending,
      revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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

describe('createKitRevitPluginVersionUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginVersionUpdatedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Pending,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      DetailType: ServiceEventType.KitRevitPluginVersionUpdated,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Pending,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionUpdatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_PLUGIN_VERSION_UPLOADED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_VERSION_UPLOADED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Uploaded,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionUploadedServiceEvent),
    ).toStrictEqual<KitRevitPluginVersionUploadedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
      revit_plugin_version_status: WorkflowStatus.Uploaded,
      revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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

describe('createKitRevitPluginVersionUploadedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginVersionUploadedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Uploaded,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      DetailType: ServiceEventType.KitRevitPluginVersionUploaded,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Uploaded,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionUploadedServiceEvent),
    });
  });
});

describe('KIT_REVIT_PLUGIN_VERSION_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_PLUGIN_VERSION_FAILED_SERVICE_EVENT_SCHEMA.parse({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Failed,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionFailedServiceEvent),
    ).toStrictEqual<KitRevitPluginVersionFailedServiceEvent>({
      revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
      revit_plugin_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_updated_at: '2023-10-19T14:57:08Z',

      revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
      revit_plugin_version_status: WorkflowStatus.Failed,
      revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
      revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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

describe('createKitRevitPluginVersionFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitPluginVersionFailedServiceEvent({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Failed,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      DetailType: ServiceEventType.KitRevitPluginVersionFailed,
      Detail: JSON.stringify({
        revit_plugin_id: '9cd5ccdb-93db-43c3-9233-94bc87b41439',
        revit_plugin_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_updated_at: '2023-10-19T14:57:08Z',

        revit_plugin_version_id: '7b0f2128-0283-4976-8b40-7c7e5f4c87f7',
        revit_plugin_version_status: WorkflowStatus.Failed,
        revit_plugin_version_created_at: '2023-10-19T14:57:08Z',
        revit_plugin_version_updated_at: '2023-10-19T14:57:08Z',

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
      } satisfies KitRevitPluginVersionFailedServiceEvent),
    });
  });
});
