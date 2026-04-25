import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function StudentsPage() {
  const students = await prisma.student.findMany()
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des étudiants</h1>
      {students.length === 0 ? (
        <p>Aucun étudiant dans la base</p>
      ) : (
        <ul>
          {students.map((student: any) => (
            <li key={student.id}>{student.name} {student.surname}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
