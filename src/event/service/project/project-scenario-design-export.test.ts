import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { ProjectScenarioDesignExportCreatedServiceEvent, ProjectScenarioDesignExportFailedServiceEvent, ProjectScenarioDesignExportInProgressServiceEvent, ProjectScenarioDesignExportReadyServiceEvent, ProjectScenarioDesignExportSucceededServiceEvent, ProjectScenarioDesignExportUpdatedServiceEvent } from './project-scenario-design-export.js';
import { PROJECT_SCENARIO_DESIGN_EXPORT_CREATED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_EXPORT_FAILED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_EXPORT_READY_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA, createProjectScenarioDesignExportCreatedServiceEvent, createProjectScenarioDesignExportFailedServiceEvent, createProjectScenarioDesignExportInProgressServiceEvent, createProjectScenarioDesignExportReadyServiceEvent, createProjectScenarioDesignExportSucceededServiceEvent, createProjectScenarioDesignExportUpdatedServiceEvent } from './project-scenario-design-export.js';

describe('PROJECT_SCENARIO_DESIGN_EXPORT_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_CREATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Pending,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
        export_credit_transaction_amount: 123,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportCreatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignExportCreatedServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
      project_scenario_design_export_status: WorkflowStatus.Pending,
      project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

      export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
      export_credit_transaction_amount: 123,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
    });
  });
});

describe('createProjectScenarioDesignExportCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignExportCreatedServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Pending,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
        export_credit_transaction_amount: 123,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignExportCreated,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Pending,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
        export_credit_transaction_amount: 123,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportCreatedServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Pending,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
        export_credit_transaction_amount: 123,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportUpdatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignExportUpdatedServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
      project_scenario_design_export_status: WorkflowStatus.Pending,
      project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

      export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
      export_credit_transaction_amount: 123,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
    });
  });
});

describe('createProjectScenarioDesignExportUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignExportUpdatedServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Pending,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
        export_credit_transaction_amount: 123,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignExportUpdated,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Pending,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        export_credit_transaction_id: '2c4d3b96-34cf-436a-b0d9-51062c973f52',
        export_credit_transaction_amount: 123,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportUpdatedServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_EXPORT_READY_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_READY_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Ready,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_building_export_ids: [
          '2f969e23-ac54-4537-9b78-70312a9bd3d9',
          'c54971ec-117f-4960-ab3b-d914957ec24a',
          '0e6b6e2c-e9da-47be-9cf7-2fba4afb8ab0',
        ],

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportReadyServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignExportReadyServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
      project_scenario_design_export_status: WorkflowStatus.Ready,
      project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_building_export_ids: [
        '2f969e23-ac54-4537-9b78-70312a9bd3d9',
        'c54971ec-117f-4960-ab3b-d914957ec24a',
        '0e6b6e2c-e9da-47be-9cf7-2fba4afb8ab0',
      ],

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
    });
  });
});

describe('createProjectScenarioDesignExportReadyServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignExportReadyServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Ready,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_building_export_ids: [
          '2f969e23-ac54-4537-9b78-70312a9bd3d9',
          'c54971ec-117f-4960-ab3b-d914957ec24a',
          '0e6b6e2c-e9da-47be-9cf7-2fba4afb8ab0',
        ],

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignExportReady,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Ready,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_building_export_ids: [
          '2f969e23-ac54-4537-9b78-70312a9bd3d9',
          'c54971ec-117f-4960-ab3b-d914957ec24a',
          '0e6b6e2c-e9da-47be-9cf7-2fba4afb8ab0',
        ],

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportReadyServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.InProgress,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportInProgressServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignExportInProgressServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
      project_scenario_design_export_status: WorkflowStatus.InProgress,
      project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
    });
  });
});

describe('createProjectScenarioDesignExportInProgressServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignExportInProgressServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.InProgress,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignExportInProgress,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.InProgress,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportInProgressServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Succeeded,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies ProjectScenarioDesignExportSucceededServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignExportSucceededServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
      project_scenario_design_export_status: WorkflowStatus.Succeeded,
      project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

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

describe('createProjectScenarioDesignExportSucceededServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignExportSucceededServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Succeeded,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

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
      DetailType: ServiceEventType.ProjectScenarioDesignExportSucceeded,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Succeeded,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        output_files_count: 1,
        output_files: [
          {
            id: 'c89ccb7a-0545-4462-bfd5-995aa2fb8264',
            type: 'example-file-type',
            bytes: 345,
            url: 'https://www.example.com/download.zip',
          },
        ],
      } satisfies ProjectScenarioDesignExportSucceededServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_EXPORT_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_EXPORT_FAILED_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Failed,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportFailedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignExportFailedServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
      project_scenario_design_export_status: WorkflowStatus.Failed,
      project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
    });
  });
});

describe('createProjectScenarioDesignExportFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignExportFailedServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Failed,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignExportFailed,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_export_id: '3690fe79-7b62-4a2e-8467-170060595ef3',
        project_scenario_design_export_status: WorkflowStatus.Failed,
        project_scenario_design_export_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_export_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',
      } satisfies ProjectScenarioDesignExportFailedServiceEvent),
    });
  });
});
