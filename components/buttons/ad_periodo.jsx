"use client"

import Link from "next/link"

export default function Periodos() {
    return(
    <div>
        <Link href="/admin/periodos">
            <button type="button">
                Periodos de calificacion
            </button>
        </Link>
    </div>
    )
}