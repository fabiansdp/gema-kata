import Image from "next/image";

const Navbar = ({width, pos}) => {
    return (
        <header className="bg-primary py-4">
            <div className="flex items-center justify-center px-2 container mx-auto">
                <div className="text-black items-center font-semibold text-xl">
                    <img src="/logo.png" alt="Gambar logo gemakata" width={width} height={999999}/>
                </div>
                <nav className="space-x-4">
                    {/*<a*/}
                    {/*    href="#"*/}
                    {/*    className="text-black hover:text-secondary transition duration-300"*/}
                    {/*>*/}
                    {/*    Home*/}
                    {/*</a>*/}
                    {/*<a*/}
                    {/*    href="#"*/}
                    {/*    className="text-black hover:text-secondary transition duration-300"*/}
                    {/*>*/}
                    {/*    About*/}
                    {/*</a>*/}
                    {/*<a*/}
                    {/*    href="#"*/}
                    {/*    className="text-black hover:text-secondary transition duration-300"*/}
                    {/*>*/}
                    {/*    Services*/}
                    {/*</a>*/}
                    {/*<a*/}
                    {/*    href="#"*/}
                    {/*    className="text-black hover:text-secondary transition duration-300"*/}
                    {/*>*/}
                    {/*    Contact*/}
                    {/*</a>*/}
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
