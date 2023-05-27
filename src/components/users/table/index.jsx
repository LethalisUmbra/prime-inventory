"use client";
import { useCallback, useEffect, useState } from "react";
import UsersTableRow from "./Row";
import { HiCheck, HiX } from "react-icons/hi";
import Link from "next/link";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

export default function UsersTable({ getUsers }) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  console.log("render table");

  useEffect(() => {
    const get = async () => {
      const res = await getUsers();
      if (res.error) {
        setError(res.error);
        return;
      }
      setData(res.users);
    };
    get();
  }, [getUsers]);

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
