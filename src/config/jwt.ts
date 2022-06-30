const jwt = {
  secret: process.env.JWT_SECRET || '5UP3R53CR3T=',
  expiresInDays: process.env.JWT_EXPIRES_IN_DAYS || '10',
};

export default jwt;
