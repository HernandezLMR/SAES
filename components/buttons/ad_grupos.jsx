"use client"

import Link from "next/link"

export default function Grupos() {
    return(
    <div>
        <Link href="/admin/grupos">
            <button type="button">
                Grupos
            </button>
        </Link>
    </div>
    )
}