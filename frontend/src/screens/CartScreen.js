import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

//to get query paramater (?qty=4)
import queryString from "query-string";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import "../index.css";
const CartScreen = () => {
  const { id } = useParams();

  const query = queryString.parse(window.location.search);
  const qty = Number(query.qty);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  //console.log(cartItems);
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>
            Your cart is empty<Link to="/">click here to start shopping</Link>
          </p>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/product/${item.product}`}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <div className="incdec">
                      <div>
                        <button
                          onClick={(e) =>
                            item.qty > 1
                              ? dispatch(addToCart(item.product, item.qty - 1))
                              : dispatch(addToCart(item.product, 1))
                          }
                        >
                          -
                        </button>
                      </div>
                      <div>{item.qty}</div>
                      <div>
                        <button
                          onClick={(e) =>
                            item.countInStock > item.qty
                              ? dispatch(addToCart(item.product, item.qty + 1))
                              : dispatch(addToCart(item.product, item.qty))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Total amount : $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="yellowbtn"
                variant="warning"
                disabled={cartItems.length === 0}
                style={{ color: "black" }}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
