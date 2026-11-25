// Integration guides: one page per pair of systems we connect often. Each describes the approach we take,
// not a past client project, so nothing here needs a customer's permission. Edit the wording here, not in the page.

export const INTEGRATIONS = [
  {
    slug: 'sap-salesforce',
    a: 'SAP',
    b: 'Salesforce',
    title: 'SAP and Salesforce integration',
    summary: 'Quote-to-cash without retyping: accounts, orders, prices, invoices and payment status moving between Salesforce and SAP S/4HANA or ECC.',
    pains: [
      'Sales closes an order in Salesforce and someone retypes it into SAP',
      'Account teams cannot see credit holds, deliveries or open invoices',
      'Prices and products drift between the two systems',
    ],
    flows: [
      { from: 'Salesforce', to: 'SAP', what: 'Accounts and closed orders become customers and sales orders' },
      { from: 'SAP', to: 'Salesforce', what: 'Prices, product availability and credit status' },
      { from: 'SAP', to: 'Salesforce', what: 'Delivery, invoice and payment status on the account' },
    ],
    tech: ['SAP OData and BAPI interfaces', 'Salesforce REST and Platform Events', 'Change data capture', 'MuleSoft or lightweight services'],
    ai: 'An account briefing before each call that combines the opportunity, open orders and unpaid invoices; and a draft order that a person confirms before it posts to SAP.',
  },
  {
    slug: 'workday-netsuite',
    a: 'Workday',
    b: 'NetSuite',
    title: 'Workday and NetSuite integration',
    summary: 'People data and finance in step: employees, departments, cost centers and expenses flowing from Workday HCM into NetSuite.',
    pains: [
      'New hires and transfers are set up twice, by HR and by finance',
      'Cost centers and departments do not match, so reports disagree',
      'Expenses and payroll journals are uploaded by hand each period',
    ],
    flows: [
      { from: 'Workday', to: 'NetSuite', what: 'Employees, managers and department changes' },
      { from: 'Workday', to: 'NetSuite', what: 'Cost centers and the organization structure' },
      { from: 'Workday', to: 'NetSuite', what: 'Approved expenses and payroll journal summaries' },
    ],
    tech: ['Workday web services and reports as a service', 'NetSuite SuiteTalk REST', 'Scheduled and event-driven sync', 'Reconciliation reports'],
    ai: 'A month-end check that flags journals whose cost center does not match the employee record, with a suggested fix for a person to approve.',
  },
  {
    slug: 'servicenow-jira',
    a: 'ServiceNow',
    b: 'Jira',
    title: 'ServiceNow and Jira integration',
    summary: 'Service and engineering on one thread: incidents and problems in ServiceNow linked to the Jira work that fixes them, with status flowing both ways.',
    pains: [
      'Support copies incidents into Jira by hand and loses the link',
      'Engineers cannot see customer impact; support cannot see progress',
      'Status, comments and resolution notes drift apart',
    ],
    flows: [
      { from: 'ServiceNow', to: 'Jira', what: 'Escalated incidents and problems become linked issues' },
      { from: 'Jira', to: 'ServiceNow', what: 'Status, fix version and resolution notes' },
      { from: 'Both', to: 'Both', what: 'Comments and attachments, with a clear owner for each field' },
    ],
    tech: ['ServiceNow Table API and business rules', 'Jira REST API and webhooks', 'Field mapping with conflict rules', 'Duplicate and loop protection'],
    ai: 'A triage draft for each escalation: likely component, similar past issues and a suggested priority, confirmed by the on-call engineer.',
  },
];

export const integrationBySlug = (slug) => INTEGRATIONS.find((i) => i.slug === slug);

// How we run every integration project, whatever the systems.
export const APPROACH = [
  { title: 'Map', text: 'We list every object, field and owner, and agree which system is the source of truth for each.' },
  { title: 'Build one flow', text: 'The most painful flow goes live first, with retries, alerts and a log of every record moved.' },
  { title: 'Reconcile', text: 'A daily report compares both systems, so mismatches are found by us, not by customers.' },
  { title: 'Add AI', text: 'With clean, connected data, assistants and automations can propose actions for people to approve.' },
];
