import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      id: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
      profilePhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
      firstName: 'Emeka',
      lastName: 'Okafor',
      dob: new Date('1995-07-15'),
      occupation: 'Software Engineer',
      gender: 'Male',
      academics: {
        create: {
          school: 'University of Lagos',
        },
      },
      address: {
        create: {
          address: 'Ikeja',
          city: 'Lagos',
          state: 'Lagos',
          country: 'Nigeria',
          zipCode: '100001',
        },
      },
      contact: {
        create: {
          email: 'emeka.okafor@example.com',
          phoneNumber: '+2348123456789',
          linkedInUrl: 'https://www.linkedin.com/in/emekaokafor',
        },
      },
    },
    {
      id: 'b2c3d4e5-6789-01ab-cdef-234567890abc',
      profilePhoto: 'https://randomuser.me/api/portraits/women/32.jpg',
      firstName: 'Aisha',
      lastName: 'Bello',
      dob: new Date('1990-05-22'),
      occupation: 'Doctor',
      gender: 'Female',
      academics: {
        create: {
          school: 'Ahmadu Bello University',
        },
      },
      address: {
        create: {
          address: 'Ungwan Rimi',
          city: 'Kaduna',
          state: 'Kaduna',
          country: 'Nigeria',
          zipCode: '800001',
        },
      },
      contact: {
        create: {
          email: 'aisha.bello@example.com',
          phoneNumber: '+2348034567890',
          linkedInUrl: 'https://www.linkedin.com/in/aishabello',
        },
      },
    },
    {
      id: 'c3d4e5f6-7890-12ab-cdef-34567890abcd',
      profilePhoto: 'https://randomuser.me/api/portraits/men/60.jpg',
      firstName: 'Chinedu',
      lastName: 'Ikechukwu',
      dob: new Date('1987-12-10'),
      occupation: 'Entrepreneur',
      gender: 'Male',
      academics: {
        create: {
          school: 'Covenant University',
        },
      },
      address: {
        create: {
          address: 'Lekki',
          city: 'Lagos',
          state: 'Lagos',
          country: 'Nigeria',
          zipCode: '105102',
        },
      },
      contact: {
        create: {
          email: 'chinedu.ikechukwu@example.com',
          phoneNumber: '+2348167890123',
          linkedInUrl: 'https://www.linkedin.com/in/chineduikechukwu',
        },
      },
    },
  ];

  for (const user of users) {
    await prisma.userInfo.create({
      data: user,
    });
  }

  console.log('✅ Seed data added successfully');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
