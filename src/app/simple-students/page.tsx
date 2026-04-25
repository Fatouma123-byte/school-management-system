'use client'

import { useEffect, useState } from 'react'

export default function SimpleStudentsPage() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch('/api/students-list')
      .then(res => res.json())
      .then(data => setStudents(data))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des étudiants</h1>
      {students.length === 0 ? (
        <p>Chargement ou aucun étudiant...</p>
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
