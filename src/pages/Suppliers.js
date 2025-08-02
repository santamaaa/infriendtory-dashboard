import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import NavMenu from '../components/NavMenu.js'
import MenuTitle from '../components/MenuTitle.js'
import ModalAdd from '../components/ModalAdd.js'
import SuppliersMap from '../components/SuppliersMap.js'
import ModalEdit from '../components/ModalEdit.js'
import DeleteConfirmation from '../components/DeleteConfirmation.js'

const Suppliers = () => {
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
    const [generatedID, setGeneratedID] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState('')
    const [sortKey, setSortKey] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const generateID = () => {
        const prefix = 'SUP-'
        const today = new Date()
        const year = today.getFullYear()
        const month = String(today.getMonth() + 1).padStart(2, '0') // Bulan mulai dari 0
        const day = String(today.getDate()).padStart(2, '0')
        const randomNumber = String(Math.floor(1000 + Math.random() * 9000)).padStart(4, '0')
        const randomID = prefix + year + month + day + randomNumber
        setGeneratedID(randomID)
    }
    const showModalAdd = () => {
        setModalAddIsOpen(true)
        generateID()
    }
    const hideModalAdd = () => setModalAddIsOpen(false)
    const styleModalAdd = modalAddIsOpen ? { display: 'grid' } : { display: 'none' }
    const modalAddConfiguration = { 
        title: 'Add Supplier',
        fields: [
            { name: '_id', label: 'ID', type: 'text', value: generatedID, required: true, readonly: true },
            { name: 'supplier_name', label: 'Supplier Name', type: 'text', value: '', required: true, readonly: false },
            { name: 'address', label: 'Address', type: 'text', value: '', required: true, readonly: false },
            { name: 'description', label: 'Description', type: 'text', value: '', required: true, readonly: false },
            { name: 'email', label: 'Email', type: 'email', value: '', required: true, readonly: false },
            { name: 'phone_number', label: 'Phone Number', type: 'text', value: '', required: true, readonly: false }
        ],
        close: hideModalAdd,
        path: 'supplier/'
    }

    useEffect(() => {
        const fetchData = async () => {
            const apiURL = process.env.REACT_APP_API_URL
            const endpointSupplier = apiURL + 'supplier/'

            const token = localStorage.getItem('token')

            if (!token) {
                alert('No session, please log in.')
                window.location.href = '/'
                return
            }

            try {
                const response = await axios.get(endpointSupplier, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                })
                setData(response.data)
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    localStorage.removeItem('token')
                    alert('Session expired, please log in again.')
                    window.location.href = '/'
                } else {
                    console.error('Error fetching data:', error)
                }
            }
        }

        fetchData()
    }, [])

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortKey(key)
            setSortOrder('asc')
        }
    }
    const sortedSuppliers = [...data].sort((a, b) => {
        if (sortKey) {
            const aValue = a[sortKey].toString().toLowerCase()
            const bValue = b[sortKey].toString().toLowerCase()
            if (sortOrder === 'asc') {
                return aValue.localeCompare(bValue, undefined, { numeric: true })
            } else {
                return bValue.localeCompare(aValue, undefined, { numeric: true })
            }
        }
        return 0
    })
    const filteredSuppliers = sortedSuppliers.filter(item =>
        item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone_number.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const showModalEdit = () => {
        setModalEditIsOpen(true)
        console.log('ahsj')
    }
    const hideModalEdit = () => setModalEditIsOpen(false)
    const styleModalEdit = modalEditIsOpen ? { display: 'grid' } : { display: 'none' }
    const modalEditConfiguration = { 
        title: 'Edit Supplier',
        path: 'supplier/' + selectedItem
    }

    const showDeleteConfirmation = () => setDeleteConfirmIsOpen(true)
    const hideDeleteConfirmation = () => setDeleteConfirmIsOpen(false)
    const handleDelete = async () => {
        const apiURL = process.env.REACT_APP_API_URL
        const endpoint = apiURL + 'supplier/' + selectedItem
        const token = localStorage.getItem('token')

        try {
            await axios.delete(endpoint, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            setTimeout(() => {
                hideDeleteConfirmation()
            }, 1000)
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="w-full flex">
                <div className="w-full fixed bottom-0 lg:w-1/5 lg:top-0 z-50">
                    <NavMenu />
                </div>
                <div className="w-full lg:w-4/5 lg:relative lg:left-[20%]">
                    <MenuTitle menu="SUPPLIERS" />
                    <div className="w-full relative top-[60px] md:top-[80px] lg:top-0">
                        <div className="w-[100vw] lg:w-full lg:max-w-[100vw] h-[calc(100vh-122px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-60px)] px-4 md:px-12 lg:px-8 lg:pt-4 grid grid-cols-none grid-rows-[60%_40%] lg:grid-cols-2 lg:grid-rows-none gap-4 lg:gap-8">
                            <div className="w-full h-full overflow-x-auto">
                                <div className="w-full h-[40px] md:h-[48px] flex gap-3 md:gap-4">
                                    <button onClick={showModalAdd} className="w-[120px] lg:w-[142px] flex items-center justify-center gap-2 md:gap-4 rounded-md bg-yellowgreen text-white text-xs md:text-base font-semibold">
                                        <FontAwesomeIcon icon={faPlus} />
                                        <span>Add</span>
                                    </button>
                                    {
                                        modalAddIsOpen && (
                                        <div style={styleModalAdd} className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 place-items-center">
                                            <div onClick={hideModalAdd} className="w-full h-full absolute top-0 left-0 z-0 bg-black/60"></div>
                                            <ModalAdd close={modalAddConfiguration.close} title={modalAddConfiguration.title} fields={modalAddConfiguration.fields} path={modalAddConfiguration.path} />
                                        </div>
                                        )
                                    }
                                    <input value={searchQuery}  onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="Search Infriendtory . . ." className="w-full h-full px-2 md:px-3 lg:px-4 outline-none rounded-md bg-gray-100 text-xs md:text-sm font-medium md:tracking-widest" />
                                </div>
                                <div className="w-full h-[calc(100%-40px)] md:h-[calc(100%-48px)] py-3 md:py-4">
                                    <div className="w-full h-full overflow-y-scroll">
                                        <table className="w-[360vw] md:w-[160vw] lg:w-full lg:min-w-[100vw] divide-y divide-gray-200">
                                            <thead className="sticky top-0 z-20 bg-gray-100">
                                                <tr>
                                                    <th onClick={() => handleSort('_id')} className="w-[5%] px-6 py-4 sticky top-0 left-0 z-20 bg-gray-100 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">ID <br/> {sortKey === '_id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                    <th onClick={() => handleSort('supplier_name')} className="w-[10%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Supplier Name <br/> {sortKey === 'supplier_name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                    <th onClick={() => handleSort('description')} className="w-[20%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Description <br/> {sortKey === 'description' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                    <th onClick={() => handleSort('address')} className="w-[30%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Address <br/> {sortKey === 'address' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                    <th onClick={() => handleSort('email')} className="w-[10%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Email <br/> {sortKey === 'email' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                    <th onClick={() => handleSort('phone_number')} className="w-[30%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Phone Number <br/> {sortKey === 'phone_number' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                    <th className="w-[10%] px-6 py-4 sticky top-0 right-0 z-50 bg-gray-100 text-center text-sm font-medium text-gray-800 tracking-wider">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {
                                                    filteredSuppliers.map(item => (
                                                        <tr key={item._id} className="hover:bg-gray-50">
                                                            <td className="w-[5%] px-6 py-4 sticky top-0 left-0 z-0 bg-white whitespace-normal text-xs md:text-sm font-medium text-gray-800">{item._id}</td>
                                                            <td className="w-[15%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.supplier_name}</td>
                                                            <td className="w-[20%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.description}</td>
                                                            <td className="w-[30%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.address}</td>
                                                            <td className="w-[10%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.email}</td>
                                                            <td className="w-[30%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.phone_number}</td>
                                                            <td className="w-[10%] px-6 py-4 sticky top-0 right-0 z-0 bg-white whitespace-normal text-xs md:text-sm text-gray-800 text-center">
                                                                <button onClick={() => {
                                                                    setSelectedItem(item._id)
                                                                    showModalEdit()
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faPenToSquare} className="text-blue-400 text-xl" />
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedItem(item._id)
                                                                        showDeleteConfirmation()
                                                                    }}
                                                                >
                                                                    <FontAwesomeIcon icon={faTrash} className="ms-3 text-red-400 text-xl" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full h-full pb-8 lg:pb-4 z-0">
                                <SuppliersMap data={data} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* {
                    modalEditIsOpen && (
                        <div style={styleModalEdit} className="w-[100vw] h-[100vh] fixed top-0 left-0 z-50 place-items-center">
                            <div onClick={hideModalEdit} className="w-full h-full absolute top-0 left-0 z-0 bg-black/60"></div>
                            <ModalEdit path={modalEditConfiguration.path} title={modalEditConfiguration.title} />
                        </div>
                    )
                } */}
                <ModalEdit isOpen={modalEditIsOpen} />
                <DeleteConfirmation isOpen={deleteConfirmIsOpen} item={selectedItem} onCancel={hideDeleteConfirmation} onDelete={handleDelete} />
            </div>
        </>
    )
}

export default Suppliers