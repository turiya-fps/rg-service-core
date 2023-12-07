import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { KitRevitTaskRunCreatedServiceEvent, KitRevitTaskRunFailedServiceEvent, KitRevitTaskRunInProgressServiceEvent, KitRevitTaskRunSucceededServiceEvent, KitRevitTaskRunUpdatedServiceEvent } from './revit-task-run.js';
import { KIT_REVIT_TASK_RUN_CREATED_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_RUN_FAILED_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_RUN_IN_PROGRESS_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_RUN_SUCCEEDED_SERVICE_EVENT_SCHEMA, KIT_REVIT_TASK_RUN_UPDATED_SERVICE_EVENT_SCHEMA, createKitRevitTaskRunCreatedServiceEvent, createKitRevitTaskRunFailedServiceEvent, createKitRevitTaskRunInProgressServiceEvent, createKitRevitTaskRunSucceededServiceEvent, createKitRevitTaskRunUpdatedServiceEvent } from './revit-task-run.js';

describe('KIT_REVIT_TASK_RUN_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_RUN_CREATED_SERVICE_EVENT_SCHEMA.parse({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Pending,
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunCreatedServiceEvent),
    ).toStrictEqual<KitRevitTaskRunCreatedServiceEvent>({
      revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

      revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
      revit_task_run_status: WorkflowStatus.Pending,
      revit_task_run_created_at: '2023-10-19T16:02:30Z',
      revit_task_run_updated_at: '2023-10-19T16:02:30Z',

      project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

      project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
      project_scenario_design_building_export_label: 'test:value:label',

      input_files_count: 1,
      input_files: [
        {
          id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitTaskRunCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskRunCreatedServiceEvent({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Pending,
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskRunCreated,
      Detail: JSON.stringify({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Pending,
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunCreatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_RUN_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_RUN_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Pending,
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 0,
        output_files: [],
      } satisfies KitRevitTaskRunUpdatedServiceEvent),
    ).toStrictEqual<KitRevitTaskRunUpdatedServiceEvent>({
      revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

      revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
      revit_task_run_status: WorkflowStatus.Pending,
      revit_task_run_created_at: '2023-10-19T16:02:30Z',
      revit_task_run_updated_at: '2023-10-19T16:02:30Z',

      project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

      project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
      project_scenario_design_building_export_label: 'test:value:label',

      input_files_count: 1,
      input_files: [
        {
          id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],

      output_files_count: 0,
      output_files: [],
    });
  });
});

describe('createKitRevitTaskRunUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskRunUpdatedServiceEvent({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Pending,
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 0,
        output_files: [],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskRunUpdated,
      Detail: JSON.stringify({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Pending,
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 0,
        output_files: [],
      } satisfies KitRevitTaskRunUpdatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_RUN_IN_PROGRESS_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_RUN_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.InProgress,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunInProgressServiceEvent),
    ).toStrictEqual<KitRevitTaskRunInProgressServiceEvent>({
      revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

      revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
      revit_task_run_status: WorkflowStatus.InProgress,
      revit_task_run_external_id: 'test:value:external-id',
      revit_task_run_created_at: '2023-10-19T16:02:30Z',
      revit_task_run_updated_at: '2023-10-19T16:02:30Z',

      project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

      project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
      project_scenario_design_building_export_label: 'test:value:label',

      input_files_count: 1,
      input_files: [
        {
          id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitTaskRunInProgressServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskRunInProgressServiceEvent({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.InProgress,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskRunInProgress,
      Detail: JSON.stringify({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.InProgress,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunInProgressServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_RUN_SUCCEEDED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_RUN_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Succeeded,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunSucceededServiceEvent),
    ).toStrictEqual<KitRevitTaskRunSucceededServiceEvent>({
      revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

      revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
      revit_task_run_status: WorkflowStatus.Succeeded,
      revit_task_run_external_id: 'test:value:external-id',
      revit_task_run_created_at: '2023-10-19T16:02:30Z',
      revit_task_run_updated_at: '2023-10-19T16:02:30Z',

      project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

      project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
      project_scenario_design_building_export_label: 'test:value:label',

      input_files_count: 1,
      input_files: [
        {
          id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],

      output_files_count: 1,
      output_files: [
        {
          id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitTaskRunSucceededServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskRunSucceededServiceEvent({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Succeeded,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskRunSucceeded,
      Detail: JSON.stringify({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Succeeded,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunSucceededServiceEvent),
    });
  });
});

describe('KIT_REVIT_TASK_RUN_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_TASK_RUN_FAILED_SERVICE_EVENT_SCHEMA.parse({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Failed,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunFailedServiceEvent),
    ).toStrictEqual<KitRevitTaskRunFailedServiceEvent>({
      revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

      revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
      revit_task_run_status: WorkflowStatus.Failed,
      revit_task_run_external_id: 'test:value:external-id',
      revit_task_run_created_at: '2023-10-19T16:02:30Z',
      revit_task_run_updated_at: '2023-10-19T16:02:30Z',

      project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

      project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
      project_scenario_design_building_export_label: 'test:value:label',

      input_files_count: 1,
      input_files: [
        {
          id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],

      output_files_count: 1,
      output_files: [
        {
          id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitTaskRunFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitTaskRunFailedServiceEvent({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Failed,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitTaskRunFailed,
      Detail: JSON.stringify({
        revit_task_definition_id: 'fa6427b8-33d7-4570-8433-db1627df453b',

        revit_task_run_id: '68983c18-993d-4bf5-955b-21a601e6adbd',
        revit_task_run_status: WorkflowStatus.Failed,
        revit_task_run_external_id: 'test:value:external-id',
        revit_task_run_created_at: '2023-10-19T16:02:30Z',
        revit_task_run_updated_at: '2023-10-19T16:02:30Z',

        project_scenario_design_export_id: 'bbc7f518-f64c-4577-a452-877eeb69e134',

        project_scenario_design_building_export_id: 'e772140a-a06f-4273-a992-87b15b8e62d1',
        project_scenario_design_building_export_label: 'test:value:label',

        input_files_count: 1,
        input_files: [
          {
            id: '835f0a27-a71d-41c0-b9b3-2d22da301e08',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitTaskRunFailedServiceEvent),
    });
  });
});
