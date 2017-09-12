/**
 * MIDDLEWARE IMPORT
**/
const mongoose = require('mongoose');
const Bootcamp = require('../../models/bootcamp-model');


/**
 * MIDDLEWARE CONFIGURATION
**/
// Database connection
mongoose.connect(process.env.MONGODB_URI); // Databse name from local .env


/**
 * BOOTCAMP DATA
**/
const bootcamps = [
  {
    campus: 'Madrid',
    program: 'Web Development Bootcamp',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'Spanish',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 6500,
    deposit: 750,
    womenScholarship: 1000,
    currency: 'EUR',
  },
  {
    campus: 'Madrid',
    program: 'Web Development Part-Time',
    startDate: new Date('2017-09-12'),
    endDate: new Date('2018-03-16'),
    language: 'Spanish',
    schedule: `Tue & Thu, 18:30 - 21:30
Sat, 10:00 - 17:00`,
    price: 7500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Madrid',
    program: 'UX/UI Design Bootcamp',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'Spanish',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 6500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Madrid',
    program: 'UX/UI Design Part-Time',
    startDate: new Date('2017-10-24'),
    endDate: new Date('2018-04-24'),
    language: 'Spanish',
    schedule: `Tue & Thu, 18:30 - 21:30
Sat, 10:00 - 17:00`,
    price: 7500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Barcelona',
    program: 'Web Development Bootcamp',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'English',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 6500,
    deposit: 750,
    womenScholarship: 1000,
    currency: 'EUR',
  },
  {
    campus: 'Barcelona',
    program: 'Web Development Part-Time',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'Spanish',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 6500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Barcelona',
    program: 'UX/UI Design Bootcamp',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'English',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 6500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Barcelona',
    program: 'UX/UI Design Part-Time',
    startDate: new Date('2017-10-24'),
    endDate: new Date('2018-04-24'),
    language: 'Spanish',
    schedule: `Tue & Thu, 18:30 - 21:30
Sat, 10:00 - 17:00`,
    price: 7500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Barcelona',
    program: 'UX/UI Design Part-Time',
    startDate: new Date('2017-10-24'),
    endDate: new Date('2018-04-24'),
    language: 'English',
    schedule: `Tue & Thu, 18:30 - 21:30
               Sat, 10:00 - 17:00`,
    price: 7500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Miami',
    program: 'Web Development Bootcamp',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'English',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 11000,
    deposit: 1000,
    womenScholarship: 1000,
    currency: 'USD',
  },
  {
    campus: 'Miami',
    program: 'Web Development Part-Time',
    startDate: new Date('2017-08-28'),
    endDate: new Date('2018-03-02'),
    language: 'English',
    schedule: `Tue & Thu, 18:30 - 21:30
               Sat, 10:00 - 17:00`,
    price: 12000,
    deposit: 1000,
    currency: 'USD',
  },
  {
    campus: 'Miami',
    program: 'UX/UI Design Bootcamp',
    startDate: new Date('2017-06-12'),
    endDate: new Date('2017-08-11'),
    language: 'English',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 12000,
    deposit: 1000,
    currency: 'USD',
  },
  {
    campus: 'Paris',
    program: 'Web Development Bootcamp',
    startDate: new Date('2017-09-04'),
    endDate: new Date('2017-11-03'),
    language: 'English',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 7500,
    discountedPrice: 6500,
    deposit: 750,
    womenScholarship: 1000,
    currency: 'EUR',
    cohortPictureUrl: "http://ignaciodenuevo.com/images/post-irnohack-week-one-a.jpg",
  },
  {
    campus: 'Paris',
    program: 'UX/UI Design Bootcamp',
    startDate: new Date('2017-10-23'),
    endDate: new Date('2017-12-15'),
    language: 'English',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 7500,
    discountedPrice: 6500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Paris',
    program: 'UX/UI Design Part-Time',
    startDate: new Date('2017-10-17'),
    endDate: new Date('2018-04-18'),
    language: 'English',
    schedule: `Tue & Thu, 18:30 - 21:30
               Sat, 10:00 - 17:00`,
    price: 7500,
    deposit: 750,
    currency: 'EUR',
  },
  {
    campus: 'Mexico',
    program: 'Web Development Bootcamp',
    startDate: new Date('2018-01-22'),
    endDate: new Date('2017-03-23'),
    language: 'Spanish',
    schedule: 'Mon - Fri, 9:00 - 18:30',
    price: 70000,
    deposit: 8100,
    womenScholarship: 9000,
    currency: 'MXN',
  },
]


/**
 * CREATE BOOTCAMP
**/
// Add the bootcamps to the database
Bootcamp.create(bootcamps, (err, docs) => {
  if (err) {
    throw err;
  }
  console.log('---------------');
  console.log('BOOTCAMPS:');
  
  docs.forEach((bootcamp) => {
    console.log(bootcamp._id)
  });
  mongoose.connection.close();
});
