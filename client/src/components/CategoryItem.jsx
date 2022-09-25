import React from 'react'
import styled from 'styled-components'


const Container = styled.div`
flex:1;
margin:3px;
height:70vh;
position:relative;`


const Image = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`
const Info = styled.div`
position:absolute;
top:0;  left:0;
width:100%; height:100%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`


const Title =styled.h1`
color: white;
margin-bottom: 20px;
`

const Button = styled.button`
border: none;
padding: 10px;
background-color: white;
font-weight: 600;
color: gray;
cursor: pointer;

`

const CategoryItem = ({item}) => {
    const {title,img} = item
  return (
    <Container>
        <Image src={img}/>
        <Info>
            <Title>{title}</Title>
            <Button>Shop Now</Button>
        </Info>
    </Container>
  )
}

export default CategoryItem