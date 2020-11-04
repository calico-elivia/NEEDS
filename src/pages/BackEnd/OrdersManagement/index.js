import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { Col, Container, Pagination } from 'react-bootstrap'
import ToolsBar from './modules/ToolBar'
import BackendPagination from '../../../components/backend/BackendPagination'
import History from '../../../components/history'

const OrdersManagement = (props) => {
  // all launched soldout unlaunched, grid list
  const [type, setType] = useState('all')
  const [viewType, setViewType] = useState('list')

  // const merchantId = useSelector((state) => state.authentication.user.user.id)
  const [merchantId, setMerchantId] = useState(12)
  const [data, setData] = useState([])
  const [pageItems, setPageItems] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  //   const toPage = (e) => {
  //     setCurrentPage(e)
  //     History.push(`/customer-backend/productsmanagement/page=${e}`)
  //     window.scrollTo(0, 0)
  //   }

  //   const getData = (merchantId, type) => {
  //     //跟server拿資料
  //     Axios.get(
  //       `http://122.116.38.12:5050/bk-products-api/list?id=${merchantId}&filter=${type}&page=${currentPage}`
  //     )
  //       .then((res) => {
  //         const data = res.data.rows
  //         //送入資料
  //         setTotalPages(res.data.totalPages)
  //         setData(data)

  //         //處理頁碼
  //         const pageArr = []
  //         for (let i = 1; i <= res.data.totalPages; i++) {
  //           pageArr.push(
  //             <Pagination.Item
  //               key={i}
  //               active={i === currentPage}
  //               onClick={(e) => toPage(i)}
  //             >
  //               {i}
  //             </Pagination.Item>
  //           )
  //         }
  //         setPageItems(pageArr)
  //       })
  //       .catch((error) => {
  //         console.log(error.toString())
  //         return error.toString()
  //       })
  //   }

  //   //type跟currentPage改變觸發filter
  //   useEffect(() => {
  //     getData(merchantId, type)
  //   }, [currentPage, type])

  return (
    <>
      <div className="productsMng">
        <Col className="main offset-2" xs={10}>
          <Container fluid main>
            <ToolsBar
              type={type}
              setType={setType}
              viewType={viewType}
              setViewType={setViewType}
            />
            <BackendPagination
              pageItems={pageItems}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </Container>
        </Col>
      </div>
    </>
  )
}

export default OrdersManagement
