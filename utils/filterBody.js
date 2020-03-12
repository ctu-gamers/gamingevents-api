exports.objectFilterIn = (reqBody, ...allowedFields) => {
  const newObj = {};
  Object.keys(reqBody).forEach(el => {
    if (allowedFields.includes(el)) {
      newObj[el] = reqBody[el];
    }
  });
  return newObj;
};

exports.objectFilterOut = (reqBody, ...excludedFields) => {
  const newObj = {};
  Object.keys(reqBody).forEach(el => {
    if (excludedFields.includes(el)) {
      return;
    }
    newObj[el] = reqBody[el];
  });
  return newObj;
};
