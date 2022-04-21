import Link from "next/link";
import Image from "next/image";
import logo from "../public/TECH_TREE.png";

const NavBar = () => {
    return (
        <nav className={"nav-container"}>
            <div className={"nav-item-container"}>
                <Link href={"/"}>
                    <Image
                        src={logo}
                        alt={"Travel Blog Logo"}
                        width={140}
                        height={140}
                    />
                </Link>
            </div>

            <div className={"nav-item-container"}>
                <p>Enjoy your trip</p>
            </div>
        </nav>
    )
}

export default NavBar