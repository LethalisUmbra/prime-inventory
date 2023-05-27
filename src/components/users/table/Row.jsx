"use client";
import Link from "next/link";
import React from "react";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { HiCheck, HiX } from "react-icons/hi";

export default function UsersTableRow({ user }) {
  return (
    <tr className='bg-white border-b hover:bg-gray-50'>
      <th
        scope='row'
        className='px-6 py-2 font-medium text-gray-900 whitespace-nowrap'
      >
        {user.name}
      </th>
      <td className='px-6 py-2'>{user.email}</td>
      <td className='px-6 py-2'>
        {user.is_admin ? (
          <div className='bg-green-100 rounded-full p-1 w-7 h-7 mx-auto'>
            <HiCheck size={20} className='text-green-600' />
          </div>
        ) : (
          <div className='bg-red-100 rounded-full p-1 w-7 h-7 mx-auto'>
            <HiX size={20} className='text-red-600' />
          </div>
        )}
      </td>
      <td className='px-6 py-2 text-right'>
        <div className='flex w-full items-center justify-between gap-2 mx-auto'>
          <Link
            href={`/admin/user/${user.slug}/edit`}
            className='font-medium text-blue-500 hover:text-blue-700 hover:shadow transition-all bg-blue-50 rounded-full p-2 hover:bg-blue-200'
            title={`Edit ${user.name}`}
          >
            <FaEdit size={20} />
          </Link>
          <button
            className='font-medium text-red-500 hover:text-red-700 hover:shadow transition-all bg-red-50 rounded-full p-2 hover:bg-red-200'
            title={`Delete ${user.name}`}
          >
            <FaTrashAlt size={20} />
          </button>
          <Link
            href={`/admin/users/${user.slug}`}
            className='font-medium text-amber-400 hover:text-amber-600 hover:shadow transition-all bg-amber-50 rounded-full p-2 hover:bg-amber-200'
            title={`Watch ${user.name}`}
          >
            <FaEye size={20} />
          </Link>
        </div>
      </td>
    </tr>
  );
}
