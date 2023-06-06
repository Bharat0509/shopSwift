import React from 'react'
import { ReactNavbar } from 'overlay-navbar'

import { MdAccountCircle } from 'react-icons/md'
import { MdSearch } from 'react-icons/md'
import { MdAddShoppingCart } from 'react-icons/md'

const options = {
  burgerColorHover: '#eb4034',
  logo: 'https://dynamic.brandcrowd.com/asset/logodraft/75e4ce5b-67ce-4210-bdf8-0c2560d109da?v=4&outputFormat=png&s=4dwayvlc%2f35QgollVdU%2fAT72BEShJ6R3AZoHNShfb1Q%3d',
  logoWidth: '8vmax',
  navColor1: 'white',
  logoHoverSize: '10px',
  logoHoverColor: '#eb4034',
  link1Text: 'Home',
  link2Text: 'Products',
  link3Text: 'Contact',
  link4Text: 'About',
  link1Url: '/',
  link2Url: '/products',
  link3Url: '/contact',
  link4Url: '/about',
  link1Size: '1.3vmax',
  link1Color: 'rgba(35, 35, 35,0.8)',
  nav1justifyContent: 'flex-end',
  nav2justifyContent: 'flex-end',
  nav3justifyContent: 'flex-start',
  nav4justifyContent: 'flex-start',
  link1ColorHover: '#eb4034',
  link1Margin: '1vmax',
  profileIconUrl: '/login',
  profileIcon: true,
  profileIconColor: 'rgba(35, 35, 35,0.8)',
  ProfileIconElement: MdAccountCircle,
  searchIcon: true,
  searchIconColor: 'rgba(35, 35, 35,0.8)',
  SearchIconElement: MdSearch,
  cartIcon: true,
  cartIconColor: 'rgba(35, 35, 35,0.8)',
  CartIconElement: MdAddShoppingCart,
  profileIconColorHover: '#eb4034',
  searchIconColorHover: '#eb4034',
  cartIconColorHover: '#eb4034',
  cartIconMargin: '1vmax'

}

const Header = () => {
  return <ReactNavbar {...options} />
}

export default Header
