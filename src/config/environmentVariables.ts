import 'dotenv/config';

const environmentsVariables = {
  isProduction: process.env.NODE_ENV === 'production',
  port: process.env.API_PORT || 3000,
};

export default environmentsVariables;
