"use client"

import Link from "next/link"

export default function Materias() {
    return(
    <div>
        <Link href="/admin/materias">
            <button type="button">
                Materias
            </button>
        </Link>
    </div>
    )
}