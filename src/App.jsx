import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Col, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { addProduct, deleteProduct, dplyProduct } from './sevices/allApi'




function App() {

  const [productDetails, setProductDetails] = useState({ ImageUrl: '', ProductName: '', Price: '', ProductDescription: '' })
  const [prducts, setProducts] = useState([])
  const [show, setShow] = useState(false);
  console.log(prducts)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(()=>{
    displayProduct()
  },[])

  const handleAddProduct = async () => {

    const { ImageUrl, ProductName, Price, ProductDescription } = productDetails

    if (ImageUrl && ProductName && Price && ProductDescription) {
      try {
        const result = await addProduct(productDetails)
        console.log(result.data)

        setProductDetails({ ImageUrl: '', ProductName: '', Price: '', ProductDescription: '' })
        handleClose()
        displayProduct()
      } catch (err) {
        console.log(err)
      }
    } else {
      alert('enter all input field')
    }
  }


  const displayProduct = async () => {
    try {
      const res = await dplyProduct()
      console.log('first')
      console.log(res);

      if (res.status >= 200 && res.status < 300) {
        setProducts(res.data)
      }
    } catch (err) {
      console.log(err)
    }

  }

  const handleRemove=async(proId)=>{
    try{
      const dlt= await deleteProduct(proId)
      displayProduct()
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>


      <div className='container d-flex bg-primary align-items-center justify-content-center p-3'>
        <h2 className='m-2 text-light'>Add Product</h2>
        <div className='bg-light text-dark rounded p-2'>
          <i onClick={handleShow} class="fa-solid fa-plus fa-2x"></i>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <FloatingLabel controlId="floatingInput1" label="ImagUrl" className="mb-3">
                <Form.Control onChange={(e) => setProductDetails({ ...productDetails, ImageUrl: e.target.value })} type="text" placeholder="ImgeUrl" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput2" label="ProductName" className="mb-3">
                <Form.Control onChange={(e) => setProductDetails({ ...productDetails, ProductName: e.target.value })} type="text" placeholder="ProductName" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput3" label="price" className="mb-3">
                <Form.Control onChange={(e) => setProductDetails({ ...productDetails, Price: e.target.value })} type="text" placeholder="price" />
              </FloatingLabel>

              <FloatingLabel controlId="floatingTextarea2" label="Produc Details">
                <Form.Control
                  onChange={(e) => setProductDetails({ ...productDetails, ProductDescription: e.target.value })}
                  as="textarea"
                  placeholder="details"
                  style={{ height: '100px' }}
                />
              </FloatingLabel>


            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddProduct}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>


      <div className='d-flex container border border-dark p-2 mt-3'>
        <Row>
        {prducts.length > 0 ? (
            prducts.map((pro, index) => (
              <Col key={pro.id || index}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={pro.ImageUrl} />
                  <Card.Body>
                    <Card.Title>{pro.ProductName}</Card.Title>
                    <Card.Title>{pro.Price}</Card.Title>
                    <Card.Text>{pro.ProductDescription}</Card.Text>
                    <Button variant="primary" onClick={()=>handleRemove(pro.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div className="text-danger">No products available</div>
          )}

        </Row>
      </div>
    </>
  )
}

export default App

// image ,name, description,rate