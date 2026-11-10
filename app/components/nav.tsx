import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <Link href="/">HOME</Link> | <Link href="/recipes">Recipes</Link>
        </nav>
    )
}