import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { KitRevitExportPackageCreatedServiceEvent, KitRevitExportPackageFailedServiceEvent, KitRevitExportPackageInProgressServiceEvent, KitRevitExportPackageSucceededServiceEvent, KitRevitExportPackageUpdatedServiceEvent } from './revit-export-package.js';
import { KIT_REVIT_EXPORT_PACKAGE_CREATED_SERVICE_EVENT_SCHEMA, KIT_REVIT_EXPORT_PACKAGE_FAILED_SERVICE_EVENT_SCHEMA, KIT_REVIT_EXPORT_PACKAGE_IN_PROGRESS_SERVICE_EVENT_SCHEMA, KIT_REVIT_EXPORT_PACKAGE_SUCCEEDED_SERVICE_EVENT_SCHEMA, KIT_REVIT_EXPORT_PACKAGE_UPDATED_SERVICE_EVENT_SCHEMA, createKitRevitExportPackageCreatedServiceEvent, createKitRevitExportPackageFailedServiceEvent, createKitRevitExportPackageInProgressServiceEvent, createKitRevitExportPackageSucceededServiceEvent, createKitRevitExportPackageUpdatedServiceEvent } from './revit-export-package.js';

describe('KIT_REVIT_EXPORT_PACKAGE_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_EXPORT_PACKAGE_CREATED_SERVICE_EVENT_SCHEMA.parse({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Pending,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],
      } satisfies KitRevitExportPackageCreatedServiceEvent),
    ).toStrictEqual<KitRevitExportPackageCreatedServiceEvent>({
      revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
      revit_export_package_status: WorkflowStatus.Pending,
      revit_export_package_created_at: '2023-10-19T14:57:08Z',
      revit_export_package_updated_at: '2023-10-19T14:57:08Z',

      revit_task_run_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

      project_scenario_design_building_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_building_export_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],
    });
  });
});

describe('createKitRevitExportPackageCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitExportPackageCreatedServiceEvent({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Pending,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitExportPackageCreated,
      Detail: JSON.stringify({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Pending,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],
      } satisfies KitRevitExportPackageCreatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_EXPORT_PACKAGE_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_EXPORT_PACKAGE_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Pending,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 1,
        output_files: [
          {
            id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
            type: 'example-file-type',
            bytes: 343,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitExportPackageUpdatedServiceEvent),
    ).toStrictEqual<KitRevitExportPackageUpdatedServiceEvent>({
      revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
      revit_export_package_status: WorkflowStatus.Pending,
      revit_export_package_created_at: '2023-10-19T14:57:08Z',
      revit_export_package_updated_at: '2023-10-19T14:57:08Z',

      revit_task_run_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

      project_scenario_design_building_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_building_export_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      output_files_count: 1,
      output_files: [
        {
          id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
          type: 'example-file-type',
          bytes: 343,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitExportPackageUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitExportPackageUpdatedServiceEvent({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Pending,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 1,
        output_files: [
          {
            id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
            type: 'example-file-type',
            bytes: 343,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitExportPackageUpdated,
      Detail: JSON.stringify({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Pending,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 1,
        output_files: [
          {
            id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
            type: 'example-file-type',
            bytes: 343,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitExportPackageUpdatedServiceEvent),
    });
  });
});

describe('KIT_REVIT_EXPORT_PACKAGE_IN_PROGRESS_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_EXPORT_PACKAGE_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.InProgress,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],
      } satisfies KitRevitExportPackageInProgressServiceEvent),
    ).toStrictEqual<KitRevitExportPackageInProgressServiceEvent>({
      revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
      revit_export_package_status: WorkflowStatus.InProgress,
      revit_export_package_created_at: '2023-10-19T14:57:08Z',
      revit_export_package_updated_at: '2023-10-19T14:57:08Z',

      revit_task_run_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

      project_scenario_design_building_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_building_export_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],
    });
  });
});

describe('createKitRevitExportPackageInProgressServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitExportPackageInProgressServiceEvent({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.InProgress,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitExportPackageInProgress,
      Detail: JSON.stringify({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.InProgress,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],
      } satisfies KitRevitExportPackageInProgressServiceEvent),
    });
  });
});

describe('KIT_REVIT_EXPORT_PACKAGE_SUCCEEDED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_EXPORT_PACKAGE_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Succeeded,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 1,
        output_files: [
          {
            id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
            type: 'example-file-type',
            bytes: 343,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitExportPackageSucceededServiceEvent),
    ).toStrictEqual<KitRevitExportPackageSucceededServiceEvent>({
      revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
      revit_export_package_status: WorkflowStatus.Succeeded,
      revit_export_package_created_at: '2023-10-19T14:57:08Z',
      revit_export_package_updated_at: '2023-10-19T14:57:08Z',

      revit_task_run_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

      project_scenario_design_building_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_building_export_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      output_files_count: 1,
      output_files: [
        {
          id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
          type: 'example-file-type',
          bytes: 343,
          url: 'https://www.example.com/download.zip',
        },
      ],
    });
  });
});

describe('createKitRevitExportPackageSucceededServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitExportPackageSucceededServiceEvent({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Succeeded,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 1,
        output_files: [
          {
            id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
            type: 'example-file-type',
            bytes: 343,
            url: 'https://www.example.com/download.zip',
          },
        ],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitExportPackageSucceeded,
      Detail: JSON.stringify({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Succeeded,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 1,
        output_files: [
          {
            id: '828aa069-3aa5-4f34-9ea7-935a125a0cfb',
            type: 'example-file-type',
            bytes: 343,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies KitRevitExportPackageSucceededServiceEvent),
    });
  });
});

describe('KIT_REVIT_EXPORT_PACKAGE_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      KIT_REVIT_EXPORT_PACKAGE_FAILED_SERVICE_EVENT_SCHEMA.parse({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Failed,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 0,
        output_files: [],
      } satisfies KitRevitExportPackageFailedServiceEvent),
    ).toStrictEqual<KitRevitExportPackageFailedServiceEvent>({
      revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
      revit_export_package_status: WorkflowStatus.Failed,
      revit_export_package_created_at: '2023-10-19T14:57:08Z',
      revit_export_package_updated_at: '2023-10-19T14:57:08Z',

      revit_task_run_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

      project_scenario_design_building_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      project_scenario_design_building_export_ids: [
        '8ac99806-06f4-4071-8ef3-12751dff1b68',
        '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
        '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
      ],

      output_files_count: 0,
      output_files: [],
    });
  });
});

describe('createKitRevitExportPackageFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createKitRevitExportPackageFailedServiceEvent({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Failed,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 0,
        output_files: [],
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.KitRevitExportPackageFailed,
      Detail: JSON.stringify({
        revit_export_package_id: '5a7e6bc6-c1ac-4a3d-86fd-fdf72615d33c',
        revit_export_package_status: WorkflowStatus.Failed,
        revit_export_package_created_at: '2023-10-19T14:57:08Z',
        revit_export_package_updated_at: '2023-10-19T14:57:08Z',

        revit_task_run_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_id: 'c9622e74-4a2d-44ad-b1bd-5735d687e585',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: '678b7440-414c-4ba7-a3b4-2c80fbb86cd9',

        project_scenario_design_building_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        project_scenario_design_building_export_ids: [
          '8ac99806-06f4-4071-8ef3-12751dff1b68',
          '40cbf3a2-4481-4d0f-8fcf-9c7f70908eec',
          '8ca496f7-5e8d-40b6-8591-ea9e34dda3a5',
        ],

        output_files_count: 0,
        output_files: [],
      } satisfies KitRevitExportPackageFailedServiceEvent),
    });
  });
});
