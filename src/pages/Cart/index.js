import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import { FaTimes } from 'react-icons/fa'
import { connect } from 'react-redux'
import { replaceOrderContent } from '../../actions'
import './cart.scss'
import * as storage from './localStorage'

import CheckoutNav from './CheckoutNav'
import CartItem from './CartItem'

function Cart(props) {
  // console.log('props', props)
  const [cart, setCart] = useState({})
  const [skuId, setSkuId] = useState({})
  const [merchantCarts, setMerchantCarts] = useState([])
  const [sum, setSum] = useState(0)
  const [orderContent, setOrderContent] = useState()
  const [delivery, setDelivery] = useState('宅配到府')

  function getCart() {
    return storage.getCartItems()
  }

  function getSkuIdsInCart() {
    return storage.getCartItems().map((v) => v.skuid)
  }

  async function getMerchantCarts() {
    const url = `http://localhost:5000/products/bulk-get-product-skus`
    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        skuIds: getSkuIdsInCart(),
      }),
    })
    const response = await fetch(request)
    const merchantCartItems = await response.json()

    const cartItemsFromStorage = storage.getCartItems()

    merchantCartItems.map((cartItems) => {
      cartItems.allChecked = false
      cartItems.products.map((item) => {
        item.amount = cartItemsFromStorage.find(function (i) {
          return i.skuid === item.skuid
        }).amount
        item.isChecked = false
        return item
      })
      return cartItems
    })
    merchantCartItems[0].allChecked = true
    merchantCartItems[0].products.map((item) => {
      item.isChecked = true
      return item
    })
    setMerchantCarts(merchantCartItems)
  }

  function checkAll(merchantId, isChecked) {
    setMerchantCarts(
      merchantCarts.map((merchantCart) => {
        if (merchantCart.merchant_id === merchantId) {
          merchantCart.allChecked = isChecked
          const products = merchantCart.products
          console.log(products)
          merchantCart.products.map((item) => {
            item.isChecked = isChecked
            return item
          })
        }
        return merchantCart
      })
    )
  }

  function checkOne(skuId, isChecked) {
    setMerchantCarts(
      merchantCarts.map((merchantCart) => {
        merchantCart.allChecked = true
        merchantCart.products.map((item) => {
          if (item.skuid === skuId) {
            item.isChecked = isChecked
          }
          if (merchantCart.allChecked) {
            merchantCart.allChecked = item.isChecked
          }
          return item
        })
        return merchantCart
      })
    )
  }

  function calculateSum() {
    let sum = 0
    merchantCarts.forEach((merchantCart) => {
      merchantCart.products.map((item) => {
        if (item.isChecked) {
          const price = item.sale_price ? item.sale_price : item.price
          sum += price * item.amount
        }
      })
    })
    sum = sum > 2000 ? sum : sum + 60
    setSum(sum)
  }

  function changeOrderContent() {
    let orderContent = {
      sum: sum,
      delivery: delivery,
      products: [],
      merchantId: 0,
    }
    merchantCarts.forEach((merchantCart) => {
      merchantCart.products.map((item) => {
        if (item.isChecked) {
          orderContent.products.push(item)
          orderContent.merchantId = merchantCart.merchant_id
        }
      })
    })
    setOrderContent(orderContent)
  }

  useEffect(() => {
    getCart()
    getMerchantCarts()
  })

  useEffect(() => {
    calculateSum()
  }, [merchantCarts])

  useEffect(
    () => {
      changeOrderContent()
    },
    [sum],
    [delivery]
  )

  return (
    <div className="cart-page">
      <Container>
        <CheckoutNav />
        {merchantCarts &&
          merchantCarts.map((merchantCart, index) => {
            return (
              <div className="border rounded-top cart-item" key={index}>
                <Row className="cart-infobar rounded-top py-3 m-0">
                  <Col md={5}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={merchantCart.allChecked}
                        data-name="allChecked"
                        onChange={(e) =>
                          checkAll(merchantCart.merchant_id, e.target.checked)
                        }
                      />
                    </div>
                    <span className="product-titlebar ml-5">
                      {merchantCart.brand_name}
                    </span>
                  </Col>
                  <Col md={2} className="text-right pr-5">
                    單價
                  </Col>
                  <Col md={3} className="text-center">
                    數量
                  </Col>
                  <Col md={1} className="text-right p-0">
                    小計
                  </Col>
                  <Col md={1} className="text-right">
                    <FaTimes />
                  </Col>
                </Row>
                {merchantCart.products.map((product, index) => {
                  return (
                    <CartItem
                      key={index}
                      product={product}
                      merchantCarts={merchantCarts}
                      setMerchantCarts={setMerchantCarts}
                      cart={getCart()}
                      setCart={setCart}
                      checkOne={checkOne}
                    />
                  )
                })}
              </div>
            )
          })}
        <Row className="delivery-pay-info">
          <Col md={6}>
            <div className="border rounded-top cart-infobar p-3">配送方式</div>
            <div className="p-3 border border-top-0 item-title">
              <fieldset form="cartForm">
                <Form.Group as={Row} className="mb-0">
                  <Col>
                    <Form.Check
                      type="radio"
                      label="宅配到府"
                      name="delivery"
                      className="mb-3"
                      value="宅配到府"
                      checked={delivery === '宅配到府'}
                      onChange={(event) => {
                        setDelivery(event.target.value)
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="郵局配送"
                      name="delivery"
                      className="mb-3"
                      value="atm"
                      checked={delivery === '郵局配送'}
                      onChange={(event) => {
                        setDelivery(event.target.value)
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="7-11 取貨"
                      name="delivery"
                      value="atm"
                      checked={delivery === '7-11 取貨'}
                      onChange={(event) => {
                        setDelivery(event.target.value)
                      }}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </div>
          </Col>
          <Col md={6}>
            <div className="border rounded-top cart-infobar p-3">訂單金額</div>
            <div className="p-3 border border-top-0 item-title">
              <div className="d-flex justify-content-between">
                <div>
                  <p>商品總計</p>
                  <p>運費總計</p>
                  <p className="mb-0">
                    其他折抵{' '}
                    <span className="font-point">（使用Ｅ幣折抵）</span>{' '}
                  </p>
                </div>
                <div className="text-right">
                  <p>NT${sum}</p>
                  <p>NT${sum > 2000 ? 0 : 60}</p>
                  <p className="mb-0 font-point">- NT$0</p>
                </div>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <div>
                  <p>付款總計</p>
                </div>
                <div className="text-right">
                  <p className="font-point pay-total">NT${sum}</p>
                </div>
              </div>
              <Link to={`/order_creating`}>
                <button
                  className="btn btn-danger w-100 mt-3"
                  onClick={() => props.replaceOrderContent(orderContent)}
                >
                  前往結帳
                </button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (store) => {
  return { type: store.orderContent }
}

export default connect(mapStateToProps, {
  replaceOrderContent,
})(Cart)
