import type { EventBase } from '../../../event.js';
import { ServiceEventType } from '../../service.js';
import type { ProjectExportCreditUpdatedServiceEvent } from './export-credit.js';
import { PROJECT_EXPORT_CREDIT_UPDATED_SERVICE_EVENT_SCHEMA, createProjectExportCreditUpdatedServiceEvent } from './export-credit.js';

describe('PROJECT_EXPORT_CREDIT_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_EXPORT_CREDIT_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_before: 234,
        export_credit_balance_pending: 345,
        export_credit_balance_pending_before: 456,
        export_credit_updated_at: '2023-10-18T17:32:01Z',
      } satisfies ProjectExportCreditUpdatedServiceEvent),
    ).toStrictEqual<ProjectExportCreditUpdatedServiceEvent>({
      user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

      export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
      export_credit_balance: 123,
      export_credit_balance_before: 234,
      export_credit_balance_pending: 345,
      export_credit_balance_pending_before: 456,
      export_credit_updated_at: '2023-10-18T17:32:01Z',
    });
  });
});

describe('createProjectExportCreditUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectExportCreditUpdatedServiceEvent({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_before: 234,
        export_credit_balance_pending: 345,
        export_credit_balance_pending_before: 456,
        export_credit_updated_at: '2023-10-18T17:32:01Z',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectExportCreditUpdated,
      Detail: JSON.stringify({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_before: 234,
        export_credit_balance_pending: 345,
        export_credit_balance_pending_before: 456,
        export_credit_updated_at: '2023-10-18T17:32:01Z',
      } satisfies ProjectExportCreditUpdatedServiceEvent),
    });
  });
});
