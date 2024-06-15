"use client"

import Link from "next/link"

export default function Button() {
    return(
    <div>
        <Link href="/teacher/materias">
            <button type="button">
                Materias
            </button>
        </Link>
    </div>
    )
}