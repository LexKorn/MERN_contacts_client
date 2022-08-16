import { NavLink } from 'react-router-dom';

export const ContactsList = ({contacts, handler}) => {
    return (
        <>
            <div className='row'>
                <ul className="col s6 offset-s3 collection z-depth-4">
                    {contacts.map((contact) => (
                        <li className="collection-item contact" key={contact._id}>
                            <div className="contact_text">
                                <div><b>{contact.name}</b></div>
                                <div>{contact.phone}</div> 
                            </div>                           
                            <div className="contact_icons">
                                <NavLink to={`/post/${contact._id}`}>
                                    <i className="material-icons">mode_edit</i>
                                </NavLink>    
                                <i className="material-icons" 
                                    onClick={() => handler(contact._id)}>delete_forever
                                </i>
                            </div>
                        </li>
                    ))}
                </ul>
            </div> 
        </>
    )
};