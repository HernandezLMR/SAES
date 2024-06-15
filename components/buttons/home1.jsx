"use client"

import Link from "next/link"

export default function Home() {
    return(
    <div>
        <Link href="/student/home">
            <button type="button">
                Home
            </button>
        </Link>
    </div>
    )
}