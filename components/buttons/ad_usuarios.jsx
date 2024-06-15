"use client"

import Link from "next/link"

export default function Usuarios() {
    return(
    <div>
        <Link href="/admin/users">
            <button type="button">
                Usuarios
            </button>
        </Link>
    </div>
    )
}