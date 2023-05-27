"use client";
import UsersTableRow from "./Row";

export default async function UsersTable({ users }) {
  return (
    users && (
      <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-sm text-left text-gray-400'>
          <thead className='bg-neutral-800 text-white'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                Username
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Email
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Is admin
              </th>
              <th scope='col' className='px-6 py-3 text-center'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, key) => (
              <UsersTableRow key={key} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
