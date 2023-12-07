import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { ProjectScenarioDesignBuildingExportCreatedServiceEvent, ProjectScenarioDesignBuildingExportFailedServiceEvent, ProjectScenarioDesignBuildingExportInProgressServiceEvent, ProjectScenarioDesignBuildingExportReadyServiceEvent, ProjectScenarioDesignBuildingExportSucceededServiceEvent, ProjectScenarioDesignBuildingExportUpdatedServiceEvent } from './project-scenario-design-building-export.js';
import { PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_CREATED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_FAILED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_READY_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA, PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA, createProjectScenarioDesignBuildingExportCreatedServiceEvent, createProjectScenarioDesignBuildingExportFailedServiceEvent, createProjectScenarioDesignBuildingExportInProgressServiceEvent, createProjectScenarioDesignBuildingExportReadyServiceEvent, createProjectScenarioDesignBuildingExportSucceededServiceEvent, createProjectScenarioDesignBuildingExportUpdatedServiceEvent } from './project-scenario-design-building-export.js';

describe('PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_CREATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Pending,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      } satisfies ProjectScenarioDesignBuildingExportCreatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingExportCreatedServiceEvent>({
      user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

      project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

      project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
      project_scenario_design_building_export_status: WorkflowStatus.Pending,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
    });
  });
});

describe('createProjectScenarioDesignBuildingExportCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingExportCreatedServiceEvent({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Pending,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingExportCreated,
      Detail: JSON.stringify({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Pending,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      } satisfies ProjectScenarioDesignBuildingExportCreatedServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Pending,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      } satisfies ProjectScenarioDesignBuildingExportUpdatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingExportUpdatedServiceEvent>({
      user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

      project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

      project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
      project_scenario_design_building_export_status: WorkflowStatus.Pending,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
    });
  });
});

describe('createProjectScenarioDesignBuildingExportUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingExportUpdatedServiceEvent({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Pending,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingExportUpdated,
      Detail: JSON.stringify({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Pending,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      } satisfies ProjectScenarioDesignBuildingExportUpdatedServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_READY_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_READY_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Ready,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportReadyServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingExportReadyServiceEvent>({
      user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

      project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

      project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
      project_scenario_design_building_index: 3,
      project_scenario_design_building_label: 'test:value:label',

      project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
      project_scenario_design_building_export_status: WorkflowStatus.Ready,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      aggregation_building_file: {
        id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
        type: 'example-file-type',
        bytes: 345,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignBuildingExportReadyServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingExportReadyServiceEvent({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Ready,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingExportReady,
      Detail: JSON.stringify({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Ready,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportReadyServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_IN_PROGRESS_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.InProgress,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportInProgressServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingExportInProgressServiceEvent>({
      user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

      project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

      project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
      project_scenario_design_building_index: 3,
      project_scenario_design_building_label: 'test:value:label',

      project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
      project_scenario_design_building_export_status: WorkflowStatus.InProgress,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      aggregation_building_file: {
        id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
        type: 'example-file-type',
        bytes: 345,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignBuildingExportInProgressServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingExportInProgressServiceEvent({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.InProgress,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingExportInProgress,
      Detail: JSON.stringify({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.InProgress,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportInProgressServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_SUCCEEDED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Succeeded,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportSucceededServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingExportSucceededServiceEvent>({
      user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

      project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

      project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
      project_scenario_design_building_index: 3,
      project_scenario_design_building_label: 'test:value:label',

      project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
      project_scenario_design_building_export_status: WorkflowStatus.Succeeded,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      aggregation_building_file: {
        id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
        type: 'example-file-type',
        bytes: 345,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignBuildingExportSucceededServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingExportSucceededServiceEvent({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Succeeded,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingExportSucceeded,
      Detail: JSON.stringify({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Succeeded,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportSucceededServiceEvent),
    });
  });
});

describe('PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_FAILED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_EXPORT_FAILED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Failed,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportFailedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingExportFailedServiceEvent>({
      user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

      project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
      project_label: 'test:value:label',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',

      project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

      project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
      project_scenario_design_building_index: 3,
      project_scenario_design_building_label: 'test:value:label',

      project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
      project_scenario_design_building_export_status: WorkflowStatus.Failed,

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      aggregation_building_file: {
        id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
        type: 'example-file-type',
        bytes: 345,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignBuildingExportFailedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingExportFailedServiceEvent({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Failed,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingExportFailed,
      Detail: JSON.stringify({
        user_id: 'd04cee10-099e-41f7-a79d-08195686ca56',

        project_id: 'afce8344-2ce3-4c96-a9f8-f9fdf4d27bf8',
        project_label: 'test:value:label',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',

        project_scenario_design_export_id: 'b4201554-fef0-4cf6-a3e4-7d980cb4ca1c',

        project_scenario_design_building_id: 'f68e53ed-1698-4ba6-beb9-a17eb659592c',
        project_scenario_design_building_index: 3,
        project_scenario_design_building_label: 'test:value:label',

        project_scenario_design_building_export_id: '07464610-0a57-4184-9431-4f8c88d9a37a',
        project_scenario_design_building_export_status: WorkflowStatus.Failed,

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: 'd24719d5-f79e-4e66-8d61-b66a3e4b30c3',
          type: 'example-file-type',
          bytes: 345,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingExportFailedServiceEvent),
    });
  });
});
