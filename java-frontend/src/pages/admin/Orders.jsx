import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Cookies from 'universal-cookie'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import OrderStatusButton from '../../components/StatusButton/StatusButton';
import MapContainer from '../../components/Map/Map';


// update order status - write api for individually updating order status using order ui -> pop up on success

const cookies = new Cookies
const Orders = () => {
  const navigate = useNavigate()
  const [isMapVisible, setIsMapVisible] = useState(false)
  const [selectedMapOrder, setSelectedMapOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [dashboardData, setDashboardData] = useState({
    totalOrders: '',
    totalUsers: ''
  })

  const fetchData = async () => {
    fetch('http://localhost:8080/retrieveOrders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => { setData(data); setDashboardData({ totalOrders: data.length }) })
      .catch(error => console.error(error));
  }


  const handleOrderClick = () => {
    console.log("order click")
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleShowMap = (order) => {
    setIsMapVisible(true)
    setSelectedMapOrder(order)
  }

  console.log(selectedMapOrder)


  return (
    <Layout>
      <div>
        <h1 className='font-bold text-2xl mb-6'>All Orders</h1>
      </div>
      <div class="mb-6">
        <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* <div class="flex flex-col rounded-lg border border-gray-100 shadow px-4 py-8 text-center">
            <dt class="order-last text-lg font-medium text-gray-500">Total Sales</dt>

            <dd class="text-4xl font-extrabold text-blue-600 md:text-3xl">₹4.8m</dd>
          </div> */}

          <div class="flex flex-col rounded-lg border border-gray-100 shadow px-4 py-8 text-center">
            <dt class="order-last text-lg font-medium text-gray-500">Total Orders</dt>

            <dd class="text-4xl font-extrabold text-blue-600 md:text-3xl">{dashboardData.totalOrders}</dd>
          </div>
        </dl>
      </div>
      <button
        onClick={() => navigate('/create-order')}
        class="flex flex-end bg-white shadow-sm rounded-md border px-4 py-2 text-sm font-medium ml-auto mb-6 text-gray-700 hover:bg-gray-50 focus:relative"
      >
        Create Order
      </button>
      <table className="border drop-shadow-md rounded-lg shadow-sm sm:rounded-lg mb-4 w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-4 text-left">
              Product Name
            </th>
            {/* <th scope="col" className="py-3 px-4 text-center">
              Owner
            </th> */}
            <th scope="col" className="py-3 px-4 text-center">
              Qty.
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Type
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Pickup Address
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Drop Address
            </th>
            <th scope="col" className="py-3 px-4 text-center">
              Location
            </th>
            <th scope="col" className="py-3 px-4 text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading ? (
              <tr className="bg-white border-b hover:cursor-pointer hover:bg-gray-50">
                <td className="py-3 px-7 text-center text-sm" colSpan={9}>
                  loading...
                </td>
              </tr>
            ) : (
              data?.length !== 0 ? (
                data.map((order) => {
                  const { productName, quantity, pickupLatitude, pickupAddress, dropLocation, dropAddress, productType, orderStatus, owner, _id } = order
                  return (
                    <tr className="bg-white border-b hover:cursor-pointer hover:bg-gray-50" onClick={handleOrderClick}>
                      <td className="py-3 px-4 text-left">
                        {productName}
                      </td>
                      {/* <td className="py-3 px-4 text-center">
                        {owner?.fullName}
                      </td> */}
                      <td className="py-3 px-4 text-center">
                        {quantity}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {productType}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {pickupAddress}
                      </td>
                      <td className="py-3 px-4 text-center relative">
                        {dropAddress}
                      </td>
                      <td className='py-3 px-4 text-center relative'>
                        {
                          pickupLatitude && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} onClick={() => handleShowMap(order)} className={`w-5 h-5 mx-auto stroke-gray-400 hover:stroke-black hover:w-6 hover:h-6`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                          )
                        }
                      </td>
                      <td className="py-2 px-4 text-left" onClick={(e) => e.stopPropagation()}>
                        <OrderStatusButton order={order} orderStatus={orderStatus} _id={_id} fetchData={fetchData} />
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr className="bg-white border-b hover:cursor-pointer hover:bg-gray-50">
                  <td className="py-3 px-7 text-center text-sm" colSpan={9}>
                    No stocks found
                  </td>
                </tr>
              )
            )
          }
        </tbody>
      </table>
      {
        isMapVisible && (
          <MapContainer
            setIsMapVisible={setIsMapVisible}
            markers={[
              {
                latitude: selectedMapOrder?.pickupLatitude,
                longitude: selectedMapOrder?.pickupLongitude
              },
              {
                latitude: selectedMapOrder?.dropLatitude,
                longitude: selectedMapOrder?.dropLongitude
              },
            ]}

          />
        )
      }
    </Layout>
  )
}

export default Orders