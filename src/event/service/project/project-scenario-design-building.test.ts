import type { EventBase } from '../../../event.js';
import { ServiceEventType } from '../../service.js';
import type { ProjectScenarioDesignBuildingCreatedServiceEvent } from './project-scenario-design-building.js';
import { PROJECT_SCENARIO_DESIGN_BUILDING_CREATED_SERVICE_EVENT_SCHEMA, createProjectScenarioDesignBuildingCreatedServiceEvent } from './project-scenario-design-building.js';

describe('PROJECT_SCENARIO_DESIGN_BUILDING_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_SCENARIO_DESIGN_BUILDING_CREATED_SERVICE_EVENT_SCHEMA.parse({
        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_building_id: '81faec3e-ed5d-4f56-99bf-0ea61462a9bc',
        project_scenario_design_building_index: 2,
        project_scenario_design_building_label: 'test:value:label',
        project_scenario_design_building_created_at: '2023-10-19T14:41:18Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingCreatedServiceEvent),
    ).toStrictEqual<ProjectScenarioDesignBuildingCreatedServiceEvent>({
      project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
      project_label: 'test:value:label',

      project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

      project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
      project_scenario_design_label: 'test:value:label',
      project_scenario_design_created_at: '2023-10-18T17:32:01Z',
      project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

      project_scenario_design_building_id: '81faec3e-ed5d-4f56-99bf-0ea61462a9bc',
      project_scenario_design_building_index: 2,
      project_scenario_design_building_label: 'test:value:label',
      project_scenario_design_building_created_at: '2023-10-19T14:41:18Z',

      kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

      aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
      aggregation_building_file: {
        id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
        type: 'example-file-type',
        bytes: 1234,
        url: 'https://www.example.com/download.zip',
      },
    });
  });
});

describe('createProjectScenarioDesignBuildingCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectScenarioDesignBuildingCreatedServiceEvent({
        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_building_id: '81faec3e-ed5d-4f56-99bf-0ea61462a9bc',
        project_scenario_design_building_index: 2,
        project_scenario_design_building_label: 'test:value:label',
        project_scenario_design_building_created_at: '2023-10-19T14:41:18Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectScenarioDesignBuildingCreated,
      Detail: JSON.stringify({
        project_id: '2595f1e2-bb46-4a88-a035-2659e25ce533',
        project_label: 'test:value:label',

        project_scenario_id: 'b828429d-f9f0-4033-9e37-0b91a6ef09bb',

        project_scenario_design_id: 'aa474bc6-863d-4402-aa3a-48d1a31d18f1',
        project_scenario_design_label: 'test:value:label',
        project_scenario_design_created_at: '2023-10-18T17:32:01Z',
        project_scenario_design_updated_at: '2023-10-18T17:32:01Z',

        project_scenario_design_building_id: '81faec3e-ed5d-4f56-99bf-0ea61462a9bc',
        project_scenario_design_building_index: 2,
        project_scenario_design_building_label: 'test:value:label',
        project_scenario_design_building_created_at: '2023-10-19T14:41:18Z',

        kit_library_version_id: '22ef24a1-d9bd-4679-ba06-d867bcf1ba79',

        aggregation_building_id: '0d439dc8-c55f-47a3-b171-571953793849',
        aggregation_building_file: {
          id: '06a35908-e94e-4af7-bd5a-bfd8b67f12b9',
          type: 'example-file-type',
          bytes: 1234,
          url: 'https://www.example.com/download.zip',
        },
      } satisfies ProjectScenarioDesignBuildingCreatedServiceEvent),
    });
  });
});
