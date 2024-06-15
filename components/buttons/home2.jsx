"use client"

import Link from "next/link"

export default function Home() {
    return(
    <div>
        <Link href="/teacher/home">
            <button type="button">
                Home
            </button>
        </Link>
    </div>
    )
}