"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/(no-carousel)/admin/users/loading";
import { getUsers } from "@/lib/users";
import UsersTableRow from "@/components/users/table/Row";

export default function UsersTable() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const get = async () => {
      const res = await getUsers();
      if (res.error) {
        setError(res.error);
      } else {
        setData(res.users);
      }
      setLoading(false);
    };
    get();
  }, []);

  if (loading) return <Loading />;

  if (error) return <span>{error}</span>;

  return (
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
          {data?.map((user, key) => (
            <UsersTableRow user={user} key={key} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
