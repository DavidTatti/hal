const { createCustomer, CUSTOMER, CUSTOMER_ACCOUNT, CUSTOMER_ACCOUNT_CASH, CUSTOMER_KYC, USER_SYSTEMS } = require('spawn-client'); // eslint-disable-line

const customerData = {
  [CUSTOMER]: {
    customerLegacyRequest: {
      ctgCode: 'PRI',
    },
    useLegacySakila: true,
    useLegacySorc: true,
  },
  [CUSTOMER_ACCOUNT_CASH]: {
    accountSum: 100,
    calcPrice: 100,
    collateral: 100,
    forwardSum: 100,
    fullMarketValue: 100,
    futureSum: 100,
    interest: 100,
    loanLimit: 100,
    ownCapital: 100,
    pawnCapacity: 100,
    pawnValue: 100,
    remainOrderValue: 100,
    totalOrderValue: 100,
  },
  [CUSTOMER_ACCOUNT]: {
    accountLegacyRequest: {
      addNewCustomerFlag: true,
    },
    useLegacySakila: true,
    useLegacySorc: true,
  },
  [CUSTOMER_KYC]: {
    questionnaireId: 8,
  },
  [USER_SYSTEMS]: [
    {
      systemId: 'NOW',
      userAccessMethods: ['PASS'],
    },
    {
      systemId: 'NEXT',
      userAccessMethods: ['PASS'],
    },
    {
      systemId: 'WEB',
      userAccessMethods: ['PASS'],
    },
  ],
};

createCustomer(customerData)
  .then(x => x.user)
  .then(x => ({
    username: x.username,
    password: x.passwd,
  }))
  .then(console.log)
  .catch(console.error);
