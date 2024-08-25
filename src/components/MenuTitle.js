const MenuTitle = ({menu}) => {
    return <h1 className="w-[100vw] h-[60px] md:h-[80px] lg:w-full lg:h-auto px-4 md:px-12 lg:px-8 lg:pt-6 fixed lg:static top-0 left-0 z-10 flex items-center justify-center lg:justify-start bg-white text-2xl md:text-3xl font-bold tracking-widest">
        {menu}
    </h1>
}

export default MenuTitle