import React, { useState } from 'react'
import { Col, Row, Button, Modal, Form } from 'react-bootstrap'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import Axios from 'axios'

function AddAdsModal() {
  const [show, setShow] = useState(false)
  const handleClose = () => {
    setShow(false)
    setImgPre('')
  }
  const handleShow = () => setShow(true)
  const [imgPre, setImgPre] = useState('')
  const postData = new FormData()

  const handleSetForm = (e, key) => {
    if (key === 'file') {
      let imgPre
      const file = e.target.files[0]
      postData.append('file', file)
      // imgPre = URL.createObjectURL(file)
      // setImgPre(imgPre)
      const img = document.createElement('img')
      img.src = URL.createObjectURL(file)
      img.height = 60
      document.querySelector('.imgPre').appendChild(img)
    } else {
      const value = e.target.value
      // setMyData({ ...myData, [key]: value })
      postData.set(key, value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleClose()
    Axios.post(`http://localhost:5000/dashboard/addnewads`, postData).then(
      (response) => {
        console.log(response.data.url)
      }
    )
  }
  return (
    <>
      <Button className="btn-primary" onClick={handleShow}>
        <div className="addAds">新增廣告</div>
      </Button>
      <Modal className="ads-modal-wrapper" show={show} onHide={handleClose}>
        <Form name="form1" method="post" onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>新增首頁廣告</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <Row>
                  <Col xs={3}></Col>
                  <Col xs={6}>
                    <Form.Group>
                      <Form.Label className="w-100">
                        <Form.File
                          id="file"
                          label="file"
                          name="file"
                          className="d-none"
                          onChange={(e) => handleSetForm(e, 'file')}
                        ></Form.File>
                        <div className="upload-ads-img">
                          <AiOutlinePlusCircle size={60} color="#787878" />
                          <div className="imgPre"></div>
                        </div>
                      </Form.Label>
                    </Form.Group>
                  </Col>
                  <Col xs={3}></Col>
                </Row>
                <Form.Group controlId="forTitle">
                  <Form.Label>廣告名稱</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="發大財"
                    name="title"
                    onChange={(e) => handleSetForm(e, 'title')}
                  />
                  {/* <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text> */}
                </Form.Group>
                <Form.Group controlId="forBudget">
                  <Form.Label>投放預算</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="最少1000"
                    name="budget"
                    onChange={(e) => handleSetForm(e, 'budget')}
                  />
                </Form.Group>
                <Form.Group controlId="forBid">
                  <Form.Label>點擊出價</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="決定你在首頁出現順序"
                    name="bid"
                    onChange={(e) => handleSetForm(e, 'bid')}
                  />
                </Form.Group>
                <Form.Group controlId="forStartDate">
                  <Form.Label>起始時間</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder=""
                    name="startdate"
                    onChange={(e) => handleSetForm(e, 'start_date')}
                  />
                </Form.Group>
                <Form.Group controlId="forEndDate">
                  <Form.Label>結束時間</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder=""
                    name="enddate"
                    onChange={(e) => handleSetForm(e, 'end_date')}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              取消
            </Button>
            <Button variant="primary" type="submit">
              上傳廣告
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default AddAdsModal
