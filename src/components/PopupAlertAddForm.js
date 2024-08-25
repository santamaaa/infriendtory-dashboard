import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const PopupAlertAddForm = ({icon, content, btnVisibility, onClose}) => {
    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 grid place-items-center">
            <div className="w-[60%] max-w-[360px] h-auto px-6 py-10 flex flex-col items-center rounded-md shadow-md shadow-gray-200 bg-yellowgreen">
                <FontAwesomeIcon icon={icon} className="text-white text-[60px]" />
                <h1 className="my-8 text-white text-sm md:text-base font-medium text-center">{content}</h1>
                <button onClick={onClose} style={btnVisibility} className="w-[80px] h-[40px] items-center justify-center rounded bg-white text-yellowgreen text-base md:text-lg font-bold">OK</button>
            </div>
        </div>
    )
}

export default PopupAlertAddForm