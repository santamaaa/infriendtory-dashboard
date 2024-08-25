import NavMenu from '../components/NavMenu.js'
import MenuTitle from '../components/MenuTitle.js'

const Purchase = () => {
    return (
        <>
            <div className="w-full flex">
                <div className="w-full fixed bottom-0 lg:w-1/5 lg:top-0 z-50">
                    <NavMenu />
                </div>
                <div className="w-full lg:w-4/5 lg:relative lg:left-[20%]">
                    <MenuTitle menu="PURCHASE" />
                    <div className="w-full relative top-[60px] md:top-[80px] lg:top-0">
                        <div className="w-[100vw] lg:w-full h-[calc(100vh-122px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-60px)] px-4 md:px-12 lg:px-8 lg:pt-4 overflow-x-auto">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Purchase