import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import NavMenu from '../components/NavMenu.js'
import MenuTitle from '../components/MenuTitle.js'
import ModalAdd from '../components/ModalAdd.js'
import DeleteConfirmation from '../components/DeleteConfirmation.js'

const Categories = () => {
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
    const [generatedID, setGeneratedID] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const [data, setData] = useState('')
    const [sortKey, setSortKey] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [deleteConfirmIsOpen, setDeleteConfirmIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const generateID = () => {
        const prefix = 'CAT-'
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
        title: 'Add Category',
        fields: [
            { name: '_id', label: 'ID', type: 'text', value: generatedID, required: true, readonly: true },
            { name: 'category', label: 'Category', type: 'text', value: '', required: true, readonly: false },
            { name: 'description', label: 'Description', type: 'text', value: '', required: true, readonly: false }
        ],
        close: hideModalAdd,
        path: 'item_category/'
    }

    useEffect(() => {
        const fetchData = async () => {
            const apiURL = process.env.REACT_APP_API_URL
            const endpointCategory = apiURL + 'item_category/'

            const token = localStorage.getItem('token')

            if (!token) {
                alert('No session, please log in.')
                window.location.href = '/'
                return
            }

            try {
                const response = await axios.get(endpointCategory, {
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
    const sortedCategories = [...data].sort((a, b) => {
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
    const filteredCategories = sortedCategories.filter(item =>
        item._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const showDeleteConfirmation = () => setDeleteConfirmIsOpen(true)
    const hideDeleteConfirmation = () => setDeleteConfirmIsOpen(false)
    const handleDelete = async () => {
        const apiURL = process.env.REACT_APP_API_URL
        const endpoint = apiURL + 'item_category/' + selectedItem
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
                    <MenuTitle menu="CATEGORIES" />
                    <div className="w-full relative top-[60px] md:top-[80px] lg:top-0">
                        <div className="w-[100vw] lg:w-full h-[calc(100vh-122px)] md:h-[calc(100vh-180px)] lg:h-[calc(100vh-60px)] px-4 md:px-12 lg:px-8 lg:pt-4 overflow-x-auto">
                            <div className="w-full h-[40px] md:h-[48px] flex gap-3 md:gap-4">
                                <button onClick={showModalAdd} className="w-[120px] flex items-center justify-center gap-2 md:gap-4 rounded-md bg-yellowgreen text-white text-xs md:text-base font-semibold">
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
                                    <table className="w-full divide-y divide-gray-200">
                                        <thead className="sticky top-0 z-20 bg-gray-100">
                                            <tr>
                                                <th onClick={() => handleSort('_id')} className="w-[15%] px-6 py-4 sticky top-0 left-0 z-50 bg-gray-100 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">ID <br/> {sortKey === '_id' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('category')} className="w-[30%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Category <br/> {sortKey === 'category' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th onClick={() => handleSort('description')} className="w-[40%] px-6 py-4 text-left text-xs md:text-sm font-medium text-gray-800 tracking-wider cursor-pointer">Item Name <br/> {sortKey === 'description' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}</th>
                                                <th className="w-[15%] px-6 py-4 sticky top-0 right-0 z-50 bg-gray-100 text-center text-sm font-medium text-gray-800 tracking-wider">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredCategories.map(item => (
                                                <tr key={item._id} className="hover:bg-gray-50">
                                                    <td className="w-[15%] px-6 py-4 sticky top-0 left-0 z-0 bg-white whitespace-normal text-xs md:text-sm font-medium text-gray-800">{item._id}</td>
                                                    <td className="w-[30%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.category}</td>
                                                    <td className="w-[40%] px-6 py-4 whitespace-normal text-xs md:text-sm text-gray-800">{item.description}</td>
                                                    <td className="w-[15%] px-6 py-4 sticky top-0 right-0 z-0 bg-white whitespace-normal text-xs md:text-sm text-gray-800 text-center">
                                                        <button>
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
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DeleteConfirmation isOpen={deleteConfirmIsOpen} item={selectedItem} onCancel={hideDeleteConfirmation} onDelete={handleDelete} />
            </div>
        </>
    )
}

export default Categories