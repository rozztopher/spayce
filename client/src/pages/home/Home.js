import React, {useContext, useEffect} from 'react'
import { UserContext } from '../../contexts/UserContext'
import Hero from './components/Hero'
import CTAGrid from './components/CTAGrid'
import Instructions from './components/Instructions'
import FAQ from './components/FAQ'
import StorePreview from './components/StorePreview'

const Home = () => {

    useEffect(() => {document.getElementById('app-container').style.width = null}, [])

    const { connectMetamask } = useContext(UserContext)

    return (
        <div className='home-container mt-100 mb-100'>
            <Hero />
            <CTAGrid connectMetamask={connectMetamask} />
            <Instructions connectMetamask={connectMetamask} />
            <StorePreview />
            <FAQ />
        </div>
    );
}

export default Home