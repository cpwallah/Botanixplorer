
import {useEffect} from "react";
import './Upper.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Upper = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, [])
  return (
    <div className='upper'> 
    <h1 className='nature' data-aos='fade-right' data-aos-duration='2000'> Nature's Healing <p>Secrets</p></h1>
    <h2 className='nature-descript' data-aos='fade-left' data-aos-duration='2000'> Unveilings ancient remedies to modern ailments. 
    Ayurvedic remedies Hub brings you a comprehensive platform that bridges the gap between you and natures bounty.
    </h2>
    </div>
  )
}

export default Upper
