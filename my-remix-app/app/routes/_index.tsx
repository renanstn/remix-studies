import { json } from "@remix-run/node"
import type { MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { PrismaClient } from '@prisma/client'


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

async function createUser() {
  const prisma = new PrismaClient()
  await prisma.user.create({
    data: {
      name: 'Roger',
      email: 'roger@prisma.io',
    },
  })
}

async function getAllUSers() {
  const prisma = new PrismaClient()
  const users = await prisma.user.findMany()
  console.log(users)
  return users
}

export const loader = async() => {
  // createUser()
  const users = await getAllUSers()
  return json({ users })
}

export default function Index() {
  const { users } = useLoaderData<typeof loader>()

  return (
    <div className="font-sans p-4">
      <h1 className="text-3xl">Remix + Prisma test</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
