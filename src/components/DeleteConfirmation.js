import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'

const DeleteConfirmation = ({ isOpen, item, onCancel, onDelete }) => {
    const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState(false)

    if (!isOpen) return null

    const showDeleteAlert = () => setDeleteAlertIsOpen(true)
    const hideDeleteAlert = () => setDeleteAlertIsOpen(false)
    const styleDeleteAlert = deleteAlertIsOpen ? { display: 'grid' } : { display: 'none' }

    const handleDeleteAlert = () => {
        setTimeout(() => {
            hideDeleteAlert()
        }, 1000)
    }

    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 grid place-items-center bg-black/60">
            <div className="w-[60%] max-w-[360px] h-auto px-6 py-10 flex flex-col items-center rounded-md shadow-md bg-white">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-red-500 text-[60px]"/>
                <h1 className="mt-8 text-xl font-bold text-center">Are you sure?</h1>
                <p className="mt-2 mb-8 text-sm font-medium text-center">
                    {item} will be deleted permanently
                </p>
                <div className="w-full flex justify-between gap-4">
                    <button onClick={onCancel} className="w-[100%] h-[40px] items-center justify-center rounded bg-yellowgreen text-white text-base font-semibold">
                        Cancel
                    </button>
                    <button onClick={() => {
                        onDelete()
                        showDeleteAlert()
                        handleDeleteAlert()
                    }} className="w-[100%] h-[40px] items-center justify-center rounded bg-red-500 text-white text-base font-semibold">
                        Delete
                    </button>
                </div>
            </div>
            {
                deleteAlertIsOpen && (
                    <div style={styleDeleteAlert} className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 place-items-center bg-black/60">
                        <div className="w-[60%] max-w-[360px] h-auto px-6 py-10 flex flex-col items-center rounded-md shadow-md bg-white">
                            <h1 className="text-sm md:text-base font-medium text-center">{item} deleted successfully</h1>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DeleteConfirmation