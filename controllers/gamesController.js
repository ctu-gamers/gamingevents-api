const fs = require('fs');
const util = require('util');
const catchAsync = require('./../utils/catchAsync');

exports.getPopularGames = catchAsync(async (req, res, next) => {
  const filePath = 'dev-data/games.json';
  const readFile = util.promisify(fs.readFile);
  const dataString = await readFile(filePath, { encoding: 'utf-8' });
  const dataObject = JSON.parse(dataString);
  res.status(200).json({
    status: 'success',
    data: dataObject.games
  });
});
