/* eslint-disable no-unused-vars */
import { useState, } from 'react'
import axios from 'axios'
import ProdukTes from './ProdukPageTes'

function Home() {

  //state 
  const [Phone, setPhone] = useState('')
  const [IsPhoneError, setIsPhoneError] = useState(false)
  const [IsMsgPhoneError, setIsMsgPhoneError] = useState('')


  const validation = () => {
    let x = false
    if (!Phone) {
      setIsPhoneError(true)
      setIsMsgPhoneError('Nomor HP Kamu Wajib Diisi')
      x = false
    } else {
      setIsPhoneError(false)
      x = true
    }

    return x
  }

//   integrasi API Register
  const register = async () => {
    if (validation()) {
      let body = {
        phone: `${Phone}`,
        password: '123456',
        password_verify: '123456'
      }

      await axios.post(`http://api-uat.klabbelanja.id/api/v1/auth/register`, body).then(response => {
        console.log(`Ini response dari API Register: `, response?.data)
      }).catch(err => {
        console.error("Terjadi Kesalahan: ", err)
      })
    } else {
      console.log("Kamu Belum Isi Phone")
    }
  }



  return (
    <>
      <button style={{ backgroundColor: '#dcdcdc', color: 'black' }} onClick={() => register()}>Submit/POST</button> <br />
      <ProdukTes />
    </>
  )
}

export default Home