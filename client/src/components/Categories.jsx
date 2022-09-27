import React from 'react'
import styled from 'styled-components'
import { categories } from '../data'
import CategoryItem from './CategoryItem'
import {mobile} from '../responsive'


const Container =styled.div`
display: flex;
justify-content:space-between;
padding:20px;
${mobile({padding:'0px', flexDirection:'column',})}

`
const Categories = () => {
  return (
    <Container>{
        categories.map((item)=>(
            <CategoryItem item={item}/>
        )

        )
    }</Container>
  )
}

export default Categories