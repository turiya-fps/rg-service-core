import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { ProjectScenarioDesignCreatedServiceEvent, ProjectScenarioDesignUpdatedServiceEvent } from './project-scenario-design.js';
import { PROJECT_SCENARIO_DESIGN_CREATED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_UPDATED_SERVICE_EVENT_SCHEMA, createProjectScenarioDesignCreatedServiceEvent, createProjectScenarioDesignUpdatedServiceEvent } from './project-scenario-design.js';

describe('PROJECT_SCENARIO_DESIGN_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_CREATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_file_extraction_status: WorkflowStatus.Pending,
        aggregation_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignCreatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignCreatedServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_file_extraction_status: WorkflowStatus.Pending,
      aggregation_file: {
        id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
        type: 'example-file-type',
        bytes: 1234,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignCreatedServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_file_extraction_status: WorkflowStatus.Pending,
        aggregation_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignCreated,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_file_extraction_status: WorkflowStatus.Pending,
        aggregation_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignCreatedServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_file_extraction_status: WorkflowStatus.Pending,
        aggregation_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignUpdatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignUpdatedServiceEvent>({
      user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_file_extraction_status: WorkflowStatus.Pending,
      aggregation_file: {
        id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
        type: 'example-file-type',
        bytes: 1234,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignUpdatedServiceEvent({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_file_extraction_status: WorkflowStatus.Pending,
        aggregation_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignUpdated,
      Detail: JSON.stringify({
        user_id: '515c87c7-1640-4aec-a6d7-6309ffe03f7a',

        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_file_extraction_status: WorkflowStatus.Pending,
        aggregation_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignUpdatedServiceEvent),
    });
  });
});
