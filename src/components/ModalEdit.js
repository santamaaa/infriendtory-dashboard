import { useState, useEffect } from "react"
import axios from "axios"

const ModalEdit = ({ isOpen, path, title }) => {
    const [dataItem, setDataItem] = useState('')
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)

    if (!isOpen) return null

    // useEffect(() => {
    //     const fetchDataItem = async () => {
    //         const apiURL = process.env.REACT_APP_API_URL
    //         const endpoint = apiURL + path
    //         const token = localStorage.getItem('token')
    
    //         try {
    //             const response = await axios.get(endpoint, {
    //                 headers: {
    //                     'Authorization': 'Bearer ' + token
    //                 }
    //             })
    //             setDataItem(response.data)
    //         } catch (error) {
    //             if (error.response && error.response.status === 401) {
    //                 localStorage.removeItem('token')
    //                 alert('Session expired, please log in again.')
    //                 window.location.href = '/'
    //             } else {
    //                 console.error('Error fetching data:', error)
    //             }
    //         }
    //     }

    //     fetchDataItem()
    // }, [path])

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target
    //     setDataItem((prevState) => ({
    //         ...prevState,
    //         [name]: value,
    //     }))
    // }

    const showModalEdit = () => setModalEditIsOpen(true)
    const hideModalEdit = () => setModalEditIsOpen(false)

    const dataItems = [
        { key: 'name', value: dataItem.supplier_name },
        { key: 'address', value: dataItem.address }
    ]

    return (
        <div className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 grid place-items-center bg-black/60">
            <div className="w-[60%] max-w-[360px] h-auto px-6 py-10 flex flex-col items-center rounded-md shadow-md bg-white">
            <h1 className="text-xl font-bold text-center">{title}</h1>
                {
                    dataItems.map((data) => (
                        <div key={data._id} className="w-full flex flex-col">
                            <label className="mt-3 text-sm font-medium">{data.key}</label>
                            <input value={data.value} className="px-2 h-[36px] mt-1 rounded-sm outline-none bg-gray-200 text-sm" />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default ModalEdit