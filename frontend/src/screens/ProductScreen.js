import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Rating from "../component/Rating";
import Loader from "../component/Loader";
import Message from "../component/Message";

import "../index.css";
import { productDetails } from "../actions/productActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const singleProductDetail = useSelector((state) => state.singleProductDetail);
  const { loading, error, product } = singleProductDetail;
  useEffect(() => {
    dispatch(productDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn my-3 yellowbtn" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price:${product.price}</ListGroup.Item>
              <ListGroup.Item>Description:{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>qty:</Col>
                      <Col>
                        <div className="incdec">
                          <div>
                            <button
                              onClick={(e) =>
                                qty > 1 ? setQty(qty - 1) : setQty(1)
                              }
                            >
                              -
                            </button>
                          </div>
                          <div>{qty}</div>
                          <div>
                            <button
                              onClick={(e) =>
                                product.countInStock > qty
                                  ? setQty(qty + 1)
                                  : setQty(qty)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="yellowbtn"
                    variant="warning"
                    type="button"
                    disabled={product.countInStock === 0}
                    style={{ color: "black" }}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
