module.exports = (reqBody, ...allowedFields) => {
  const newObj = {};
  Object.keys(reqBody).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = reqBody[el];
    }
  });
  return newObj;
};
