const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('📝 Adding data...');

  // Grades
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.upsert({
      where: { level: i },
      update: {},
      create: { level: i }
    });
  }
  console.log('✅ Grades added');

  // Classes
  for (let i = 1; i <= 6; i++) {
    await prisma.class.upsert({
      where: { name: i + "A" },
      update: {},
      create: { name: i + "A", gradeId: i, capacity: 25 }
    });
  }
  console.log('✅ Classes added');

  // Subjects
  const subjects = ["Mathematics", "Science", "English", "History", "Geography"];
  for (let i = 0; i < subjects.length; i++) {
    await prisma.subject.upsert({
      where: { name: subjects[i] },
      update: {},
      create: { name: subjects[i] }
    });
  }
  console.log('✅ Subjects added');

  // Teachers
  for (let i = 1; i <= 3; i++) {
    await prisma.teacher.upsert({
      where: { id: "teacher" + i },
      update: {},
      create: {
        id: "teacher" + i,
        username: "teacher" + i,
        name: "Teacher" + i,
        surname: "Surname" + i,
        address: i + " Main St",
        bloodType: "A+",
        sex: "MALE",
        birthday: new Date("1990-01-01"),
        subjects: { connect: [{ id: i }] },
        classes: { connect: [{ id: i }] }
      }
    });
  }
  console.log('✅ Teachers added');

  console.log('🎉 All data added successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
