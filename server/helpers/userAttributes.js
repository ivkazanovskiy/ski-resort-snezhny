function userAttributes(user) {
  const info = {};
  const attributes = ['id', 'name', 'email'];
  attributes.forEach((key) => { info[key] = user[key]; });
  return info;
}
module.exports = userAttributes;
