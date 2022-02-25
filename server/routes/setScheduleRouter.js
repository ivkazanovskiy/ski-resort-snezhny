const router = require('express').Router();
const { Schedule } = require('../db/models');

router.route('/')
  .put((req, res) => {
    const { id } = req.user;
    const { days } = req.body;

    const possibleDays = ['09', '10', '11'/* , '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22' */];

    days.forEach(async (date) => {
      possibleDays.forEach(async (startTime) => {
        console.log(date, startTime);

        // try {
        //   const [record, created] = await Schedule.findOrCreate({
        //     where: { trainerId: id },
        //     defaults: {
        //       date,
        //       startTime,
        //     },
        //   });
        //   if (created) {
        //     console.log(record);
        //   }
        // } catch (error) {
        //   console.log(error.message);
        // }
      });
    });

    res.json('ok');
  });

module.exports = router;
