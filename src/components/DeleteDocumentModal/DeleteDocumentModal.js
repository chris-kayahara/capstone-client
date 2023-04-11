import axios from 'axios';
import close from '../../assets/icons/close.svg';
import './DeleteDocumentModal.scss';


const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

const DeleteDocumentModal = ({ closeModal, id, name }) => {

    const handleClick = () => {
        
        axios.delete(`${API_BASE_URL}/document/${id}`)
            .then((response) => {
                //success
                closeModal(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return ( 
        <div className="modal">
            <div className="modal__container">
            <div className="modal__container__title"> 
                <h1 className='modal__container__heading'>Delete {name} gallery?</h1>
                <img src={close} onClick={() => closeModal(false)} alt="" className='modal__container__close'/>
            </div>
    
            <div className="modal__container__body">
                <p className='modal__container__text'>Please confirm that you'd like to delete the {name} gallery from your list.
                    This action cannot be undone.
                </p>
            </div>
            <div className="modal__container__footer">

            
            <button className="modal__container__cancel-button" onClick={() => closeModal(false)}>
                <p className="modal__container__cancel-button__text" >Cancel</p>
            </button>
                
    
            <button className="modal__container__delete-button" onClick={handleClick}>
                <p className="modal__container__delete-button__text" >Delete</p>
            </button>
            </div>
            </div>
      </div>
     );
}
 
export default DeleteDocumentModal;