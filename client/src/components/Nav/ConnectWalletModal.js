import React from 'react'
import Modal from 'react-modal'
import CTAbutton from '../CTAbutton'
import { Link } from 'react-router-dom'
import FAB from '../FAB'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(112.85deg, #180444 0%, #34056D 100%)',
        borderRadius: '30px',
        textAlign: 'center',
        width: window.innerWidth <= 480 ? '80vw' : '570px',
        paddingLeft: '4rem',
        paddingRight: '4rem',
        paddingBottom: '2rem',
        paddingTop: "2rem",
        lineHeight: '31px',
        border: 'none',
    },
    overlay: {
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), linear-gradient(91.81deg, rgba(143, 135, 202, 0.04) 0%, rgba(143, 135, 202, 0.034) 100%)',
        backdropFilter: 'blur(20px)'
    }
}

Modal.setAppElement('#root');

const ConnectWalletModal = (props) => {

    return (
        <div>
            <Modal
                isOpen={props.isModalOpen}
                onRequestClose={() => props.setIsModalOpen(false)}
                style={customStyles}
                contentLabel="Wallet connect modal"
            >
                <div className='close' onClick={() => props.setIsModalOpen(false)}>
                    <FAB
                        height='3.125vw'
                        width='3.125vw'
                        src='/icons/close.svg'
                        alt='close'
                        outline={true}
                    />
                </div>
                <h3 className='fs-28'>Connect Your Wallet</h3>
                <p className='cadet-blue mt-34 mb-31'>
                    By connecting your wallet, you agree to our
                    <Link to={{ pathname: 'https://termly.io/resources/templates/terms-and-conditions-template/' }} target="_blank">
                        <span> Terms of Service</span><span> </span>
                    </Link>
                    and our
                    <Link to={{ pathname: 'https://termly.io/resources/templates/terms-and-conditions-template/' }} target="_blank">
                        <span> Privacy Policy</span><span> </span>
                    </Link>
                    .
                </p>
                <CTAbutton
                    alt='metamask'
                    background='linear-gradient(270.13deg, #FAC153 0.09%, #ED672C 99.89%)'
                    height='56px'
                    fill={true}
                    icon='/icons/metamask.svg'
                    outline={false}
                    text='Metamask'
                    onClick={() => {
                        props.connectMetamask()
                        props.setIsModalOpen(false)
                    }}
                    fontSize="0.938rem"
                />
                <div className='mt-2'/>
                {/* <CTAbutton
                    alt='trustwallet'
                    background='linear-gradient(270.13deg, #00c6ff 0.09%, #0072ff 99.89%)'
                    height='56px'
                    fill={true}
                    icon='/images/trustwallet.png'
                    outline={false}
                    text='TrustWallet'
                    onClick={() => {
                        props.connectTrustWallet()
                        props.setIsModalOpen(false)
                    }}
                /> */}
            </Modal>
        </div>
    );
}

export default ConnectWalletModal
