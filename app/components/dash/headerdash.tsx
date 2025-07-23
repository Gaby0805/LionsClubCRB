'use client';

import { CircleUserRound } from "lucide-react";
import { useUser } from "../context/UserContext";
import Link from "next/link";

export default function HeaderDash() {
  const { nomeUser } = useUser();

  return (
    <div className="flex h-16 bg-white items-center justify-between px-4 sm:px-6 md:px-8">
      <p className="font-bold text-lg sm:text-xl md:text-2xl truncate max-w-[70%]">
        {nomeUser || "Carregando..."}
      </p>
      <div>
        <Link href="/dashboard/usuarios">
          <CircleUserRound color="black" size={28} className="sm:size-8 md:size-12" />
        </Link>
      </div>
    </div>
  );
}
