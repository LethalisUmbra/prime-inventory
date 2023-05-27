// React Icons
import { FaUsers } from "react-icons/fa";
import {
  GiAngelWings,
  GiBroadsword,
  GiDeliveryDrone,
  GiPistolGun,
  GiRayGun,
  GiSamuraiHelmet,
  GiWinchesterRifle,
} from "react-icons/gi";
// Context
import AdminItem from "@/components/admin/Item";
import AdminGrid from "@/components/admin/Grid";

export default function AdminDashboard() {
  return (
    <div className='container flex flex-col gap-5'>
      <h1 className='text-4xl font-semibold'>Dashboard</h1>
      <hr />
      {/* Main Grid */}
      <AdminGrid className={"font-medium text-2xl"}>
        {/* Users */}
        <AdminItem title={"Users"} href={"/admin/users"}>
          <FaUsers size={80} />
        </AdminItem>
        {/* Warframes */}
        <AdminItem title={"Warframes"}>
          <GiSamuraiHelmet size={75} />
        </AdminItem>
        {/* Weapons */}
        <AdminGrid className={"text-lg"}>
          {/* Melee */}
          <AdminItem title={"Melee"}>
            <GiBroadsword size={24} />
          </AdminItem>
          {/* Primaries */}
          <AdminItem title={"Primaries"}>
            <GiWinchesterRifle size={24} />
          </AdminItem>
          {/* Secondaries */}
          <AdminItem title={"Secondaries"}>
            <GiPistolGun size={24} />
          </AdminItem>
          {/* Archguns */}
          <AdminItem title={"Archguns"}>
            <GiRayGun size={24} />
          </AdminItem>
        </AdminGrid>
        {/* Others */}
        <AdminGrid className={"text-xl"}>
          <AdminItem title={"Archwings"}>
            <GiAngelWings size={38} />
          </AdminItem>
          <AdminItem title={"Companions"}>
            <GiDeliveryDrone size={30} />
          </AdminItem>
        </AdminGrid>
      </AdminGrid>
    </div>
  );
}
