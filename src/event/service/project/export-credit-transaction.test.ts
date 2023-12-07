import type { EventBase } from '../../../event.js';
import { WorkflowStatus } from '../../../workflow/status.js';
import { ServiceEventType } from '../../service.js';
import type { ProjectExportCreditTransactionAppliedServiceEvent, ProjectExportCreditTransactionApprovedServiceEvent, ProjectExportCreditTransactionCreatedServiceEvent, ProjectExportCreditTransactionDeclinedServiceEvent, ProjectExportCreditTransactionUpdatedServiceEvent } from './export-credit-transaction.js';
import { PROJECT_EXPORT_CREDIT_TRANSACTION_APPLIED_SERVICE_EVENT_SCHEMA, PROJECT_EXPORT_CREDIT_TRANSACTION_APPROVED_SERVICE_EVENT_SCHEMA, PROJECT_EXPORT_CREDIT_TRANSACTION_CREATED_SERVICE_EVENT_SCHEMA, PROJECT_EXPORT_CREDIT_TRANSACTION_DECLINED_SERVICE_EVENT_SCHEMA, PROJECT_EXPORT_CREDIT_TRANSACTION_UPDATED_SERVICE_EVENT_SCHEMA, createProjectExportCreditTransactionAppliedServiceEvent, createProjectExportCreditTransactionApprovedServiceEvent, createProjectExportCreditTransactionCreatedServiceEvent, createProjectExportCreditTransactionDeclinedServiceEvent, createProjectExportCreditTransactionUpdatedServiceEvent } from './export-credit-transaction.js';

describe('PROJECT_EXPORT_CREDIT_TRANSACTION_CREATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_EXPORT_CREDIT_TRANSACTION_CREATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Pending,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionCreatedServiceEvent),
    ).toStrictEqual<ProjectExportCreditTransactionCreatedServiceEvent>({
      user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

      export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
      export_credit_balance: 123,
      export_credit_balance_pending: 345,

      export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
      export_credit_transaction_status: WorkflowStatus.Pending,
      export_credit_transaction_amount: 2000,
      export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
      export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
    });
  });
});

describe('createProjectExportCreditTransactionCreatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectExportCreditTransactionCreatedServiceEvent({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Pending,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectExportCreditTransactionCreated,
      Detail: JSON.stringify({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Pending,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionCreatedServiceEvent),
    });
  });
});

describe('PROJECT_EXPORT_CREDIT_TRANSACTION_UPDATED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_EXPORT_CREDIT_TRANSACTION_UPDATED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Pending,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionUpdatedServiceEvent),
    ).toStrictEqual<ProjectExportCreditTransactionUpdatedServiceEvent>({
      user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

      export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
      export_credit_balance: 123,
      export_credit_balance_pending: 345,

      export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
      export_credit_transaction_status: WorkflowStatus.Pending,
      export_credit_transaction_amount: 2000,
      export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
      export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
    });
  });
});

describe('createProjectExportCreditTransactionUpdatedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectExportCreditTransactionUpdatedServiceEvent({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Pending,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectExportCreditTransactionUpdated,
      Detail: JSON.stringify({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Pending,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionUpdatedServiceEvent),
    });
  });
});

describe('PROJECT_EXPORT_CREDIT_TRANSACTION_APPROVED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_EXPORT_CREDIT_TRANSACTION_APPROVED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Approved,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionApprovedServiceEvent),
    ).toStrictEqual<ProjectExportCreditTransactionApprovedServiceEvent>({
      user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

      export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
      export_credit_balance: 123,
      export_credit_balance_pending: 345,

      export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
      export_credit_transaction_status: WorkflowStatus.Approved,
      export_credit_transaction_amount: 2000,
      export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
      export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
    });
  });
});

describe('createProjectExportCreditTransactionApprovedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectExportCreditTransactionApprovedServiceEvent({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Approved,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectExportCreditTransactionApproved,
      Detail: JSON.stringify({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Approved,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionApprovedServiceEvent),
    });
  });
});

describe('PROJECT_EXPORT_CREDIT_TRANSACTION_APPLIED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_EXPORT_CREDIT_TRANSACTION_APPLIED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Applied,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionAppliedServiceEvent),
    ).toStrictEqual<ProjectExportCreditTransactionAppliedServiceEvent>({
      user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

      export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
      export_credit_balance: 123,
      export_credit_balance_pending: 345,

      export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
      export_credit_transaction_status: WorkflowStatus.Applied,
      export_credit_transaction_amount: 2000,
      export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
      export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
    });
  });
});

describe('createProjectExportCreditTransactionAppliedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectExportCreditTransactionAppliedServiceEvent({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Applied,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectExportCreditTransactionApplied,
      Detail: JSON.stringify({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Applied,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionAppliedServiceEvent),
    });
  });
});

describe('PROJECT_EXPORT_CREDIT_TRANSACTION_DECLINED_SERVICE_EVENT_SCHEMA', (): void => {
  it('with event payload, validates', (): void => {
    expect(
      PROJECT_EXPORT_CREDIT_TRANSACTION_DECLINED_SERVICE_EVENT_SCHEMA.parse({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Declined,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionDeclinedServiceEvent),
    ).toStrictEqual<ProjectExportCreditTransactionDeclinedServiceEvent>({
      user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

      export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
      export_credit_balance: 123,
      export_credit_balance_pending: 345,

      export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
      export_credit_transaction_status: WorkflowStatus.Declined,
      export_credit_transaction_amount: 2000,
      export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
      export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
    });
  });
});

describe('createProjectExportCreditTransactionDelinedServiceEvent()', (): void => {
  it('with event payload, creates event base', (): void => {
    expect(
      createProjectExportCreditTransactionDeclinedServiceEvent({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Declined,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      }).unwrap(),
    ).toStrictEqual<EventBase>({
      DetailType: ServiceEventType.ProjectExportCreditTransactionDeclined,
      Detail: JSON.stringify({
        user_id: 'd3ab69bb-18a6-40e2-bdf5-3fba78f58454',

        export_credit_id: '5333361f-5683-4266-9f71-91db41901188',
        export_credit_balance: 123,
        export_credit_balance_pending: 345,

        export_credit_transaction_id: '13e2badf-1489-42f6-9aa0-22d9c75b2591',
        export_credit_transaction_status: WorkflowStatus.Declined,
        export_credit_transaction_amount: 2000,
        export_credit_transaction_created_at: '2023-10-19T13:57:18Z',
        export_credit_transaction_updated_at: '2023-10-19T13:57:18Z',
      } satisfies ProjectExportCreditTransactionDeclinedServiceEvent),
    });
  });
});
